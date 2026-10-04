import { Injectable } from '@angular/core';
import { Company, EligibilityResult, PredictionFactor, PredictionResult, Student } from '../models/models';

/**
 * Mock AI engine. In production this calls the Python / scikit-learn
 * prediction API described in the project design. Here it runs a
 * deterministic weighted model in-app so the demo works offline.
 */
@Injectable({ providedIn: 'root' })
export class PredictionService {

  private readonly inDemandSkills = ['Java', 'Python', 'DSA', 'React', 'JavaScript', 'ML', 'Problem Solving', 'SQL'];

  predict(s: Student): PredictionResult {
    const factors: PredictionFactor[] = [];

    const cgpaScore = Math.round((s.cgpa / 10) * 40);
    factors.push({
      label: 'Academic Performance (CGPA)', icon: 'school',
      score: cgpaScore, max: 40,
      note: `CGPA ${s.cgpa.toFixed(1)} contributes ${cgpaScore}/40 pts`,
    });

    const inDemand = s.skills.filter(k => this.inDemandSkills.includes(k)).length;
    const skillScore = Math.min(20, Math.round((s.skills.length / 6) * 12 + inDemand * 2));
    factors.push({
      label: 'Skill Profile', icon: 'code-slash',
      score: skillScore, max: 20,
      note: `${s.skills.length} skills listed, ${inDemand} are high-demand`,
    });

    const arrearScore = s.arrears === 0 ? 15 : s.arrears <= 2 ? 7 : 2;
    factors.push({
      label: 'Arrear History', icon: 'alert-circle',
      score: arrearScore, max: 15,
      note: s.arrears === 0 ? 'No standing arrears' : `${s.arrears} standing arrear(s) reduce eligibility`,
    });

    const certScore = Math.min(10, s.certifications.length * 4);
    factors.push({
      label: 'Certifications', icon: 'ribbon',
      score: certScore, max: 10,
      note: `${s.certifications.length} certification(s) on record`,
    });

    const deptDemand: Record<string, number> = {
      'Computer Science': 10, 'Information Technology': 9, 'Data Science': 9,
      'Electronics': 7, 'Mathematics': 6,
    };
    const deptScore = deptDemand[s.department] ?? 6;
    factors.push({
      label: 'Department Demand', icon: 'business',
      score: deptScore, max: 10,
      note: `${s.department} has ${deptScore >= 9 ? 'very high' : deptScore >= 7 ? 'good' : 'moderate'} recruiter demand`,
    });

    const histScore = s.placed ? 5 : s.cgpa >= 7.5 ? 3 : 1;
    factors.push({
      label: 'Placement History', icon: 'trophy',
      score: histScore, max: 5,
      note: s.placed ? 'Already secured an offer' : 'Based on historical batch trends',
    });

    const score = factors.reduce((t, f) => t + f.score, 0);
    const label = score >= 75 ? 'High' : score >= 50 ? 'Moderate' : 'Low';

    const suggestions: string[] = [];
    if (s.cgpa < 7.5) suggestions.push(`Raise CGPA above 7.5 to unlock ${'product-company'} drives like Zoho and Freshworks.`);
    else if (s.cgpa < 8.5) suggestions.push('CGPA 8.5+ would make you eligible for top-tier drives like Amazon SDE.');
    if (s.arrears > 0) suggestions.push(`Clear ${s.arrears} standing arrear(s) — most product companies require zero arrears.`);
    if (inDemand < 3) suggestions.push('Add high-demand skills (DSA, React, ML, JavaScript) to strengthen your profile.');
    if (s.skills.length < 5) suggestions.push('List at least 5 skills — recruiters filter candidates on skill keywords.');
    if (s.certifications.length < 2) suggestions.push('Earn 1–2 certifications (AWS, Azure, NPTEL) to boost your score.');
    if (suggestions.length === 0) suggestions.push('Excellent profile — focus on interview preparation and aptitude practice.');

    return { score, label, factors, suggestions };
  }

  checkEligibility(s: Student, c: Company): EligibilityResult {
    const missingSkills = c.requiredSkills.filter(k => !s.skills.includes(k));
    const skillMatchPct = c.requiredSkills.length
      ? Math.round(((c.requiredSkills.length - missingSkills.length) / c.requiredSkills.length) * 100)
      : 100;

    const checks = [
      {
        label: 'CGPA Criteria',
        passed: s.cgpa >= c.minCgpa,
        detail: `Required ${c.minCgpa.toFixed(1)} — yours ${s.cgpa.toFixed(1)}`,
      },
      {
        label: 'Department',
        passed: c.departments.includes(s.department),
        detail: c.departments.includes(s.department)
          ? `${s.department} is eligible`
          : `Open to ${c.departments.join(', ')}`,
      },
      {
        label: 'Arrears',
        passed: s.arrears <= c.maxArrears,
        detail: `Max allowed ${c.maxArrears} — you have ${s.arrears}`,
      },
      {
        label: 'Required Skills',
        passed: missingSkills.length === 0,
        detail: missingSkills.length === 0
          ? 'All required skills matched'
          : `Missing: ${missingSkills.join(', ')}`,
      },
    ];

    return { eligible: checks.every(k => k.passed), checks, skillMatchPct, missingSkills };
  }

  daysLeft(deadline: string): number {
    return Math.ceil((+new Date(deadline) - Date.now()) / 86400000);
  }
}
