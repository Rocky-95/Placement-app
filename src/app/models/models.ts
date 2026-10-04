export type UserRole = 'student' | 'admin';

export interface Student {
  id: string;
  name: string;
  email: string;
  registerNo: string;
  department: string;
  cgpa: number;
  arrears: number;
  skills: string[];
  certifications: string[];
  phone: string;
  placed: boolean;
  placedCompany?: string;
  placedRole?: string;
  placedPackage?: number;
  color: string;
}

export interface Company {
  id: string;
  name: string;
  role: string;
  ctc: number;
  location: string;
  domain: string;
  minCgpa: number;
  departments: string[];
  requiredSkills: string[];
  maxArrears: number;
  deadline: string;
  applyLink: string;
  description: string;
  openings: number;
  color: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'drive' | 'deadline' | 'announcement';
  read: boolean;
}

export interface Application {
  studentId: string;
  companyId: string;
  date: string;
}

export interface EligibilityCheck {
  label: string;
  passed: boolean;
  detail: string;
}

export interface EligibilityResult {
  eligible: boolean;
  checks: EligibilityCheck[];
  skillMatchPct: number;
  missingSkills: string[];
}

export interface PredictionFactor {
  label: string;
  icon: string;
  score: number;
  max: number;
  note: string;
}

export interface PredictionResult {
  score: number;
  label: 'High' | 'Moderate' | 'Low';
  factors: PredictionFactor[];
  suggestions: string[];
}

export interface CourseLesson {
  id: string;
  title: string;
  minutes: number;
  points: string[];
}

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  outcomes: string[];
  icon: string;
  color: string;
  rating: number;
  learners: number;
  modules: CourseModule[];
}

export interface Enrollment {
  studentId: string;
  courseId: string;
  date: string;
  done: string[];
}

export interface SessionUser {
  role: UserRole;
  email: string;
  name: string;
  studentId?: string;
}
