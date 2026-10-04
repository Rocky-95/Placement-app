import { Injectable } from '@angular/core';
import { AppNotification, Application, Company, Course, Enrollment, Student } from '../models/models';
import { COURSES } from '../data/courses.data';

export const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Data Science',
  'Electronics',
  'Mathematics',
];

export const SKILLS = [
  'Java', 'Python', 'SQL', 'DSA', 'JavaScript', 'React',
  'Communication', 'Aptitude', 'Problem Solving', 'ML', 'Statistics', 'C++',
];

const STORAGE_KEY = 'placeiq_store_v1';

interface Store {
  students: Student[];
  companies: Company[];
  notifications: AppNotification[];
  applications: Application[];
  enrollments: Enrollment[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private store: Store;

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.store = saved ? JSON.parse(saved) : this.seed();
    this.store.enrollments ??= [];
    this.persist();
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.store));
  }

  private seed(): Store {
    const days = (n: number) => new Date(Date.now() + n * 86400000).toISOString();
    return {
      students: [
        { id: 'S001', name: 'Mala M', email: 'student@tacw.edu', registerNo: '20524UCSC075', department: 'Computer Science', cgpa: 8.6, arrears: 0, skills: ['Java', 'Python', 'SQL', 'Problem Solving', 'Communication'], certifications: ['AWS Cloud Practitioner', 'NPTEL: Python for Data Science'], phone: '98410 22075', placed: false, color: '#7c3aed' },
        { id: 'S002', name: 'Karthika M', email: 'karthika@tacw.edu', registerNo: '23UCSC065', department: 'Computer Science', cgpa: 8.9, arrears: 0, skills: ['Java', 'DSA', 'SQL', 'JavaScript', 'React', 'Communication'], certifications: ['Google Data Analytics', 'AWS Cloud Practitioner', 'NPTEL: DSA'], phone: '98410 33065', placed: true, placedCompany: 'Zoho Corporation', placedRole: 'Software Developer', placedPackage: 6.5, color: '#db2777' },
        { id: 'S003', name: 'Asha K', email: 'asha@tacw.edu', registerNo: '20524UCSC002', department: 'Computer Science', cgpa: 8.2, arrears: 0, skills: ['Python', 'SQL', 'Communication', 'Aptitude'], certifications: ['NPTEL: Python'], phone: '98410 44002', placed: false, color: '#0891b2' },
        { id: 'S004', name: 'Divya S', email: 'divya@tacw.edu', registerNo: '20524UIT011', department: 'Information Technology', cgpa: 7.4, arrears: 1, skills: ['Java', 'Aptitude', 'SQL'], certifications: ['TCS iON Career Edge'], phone: '98410 55011', placed: false, color: '#ea580c' },
        { id: 'S005', name: 'Priya R', email: 'priya@tacw.edu', registerNo: '20524UEC023', department: 'Electronics', cgpa: 6.8, arrears: 2, skills: ['Communication', 'Aptitude'], certifications: [], phone: '98410 66023', placed: false, color: '#65a30d' },
        { id: 'S006', name: 'Sneha V', email: 'sneha@tacw.edu', registerNo: '20524UCSC090', department: 'Computer Science', cgpa: 9.1, arrears: 0, skills: ['Java', 'Python', 'DSA', 'React', 'JavaScript', 'SQL', 'Problem Solving'], certifications: ['AWS Solutions Architect', 'Azure Fundamentals', 'Google Data Analytics'], phone: '98410 77090', placed: true, placedCompany: 'Freshworks', placedRole: 'Product Engineer Trainee', placedPackage: 7.0, color: '#4f46e5' },
        { id: 'S007', name: 'Anitha T', email: 'anitha@tacw.edu', registerNo: '20524UMT014', department: 'Mathematics', cgpa: 6.2, arrears: 3, skills: ['Aptitude', 'Statistics'], certifications: [], phone: '98410 88014', placed: false, color: '#dc2626' },
        { id: 'S008', name: 'Revathi P', email: 'revathi@tacw.edu', registerNo: '20524UIT032', department: 'Information Technology', cgpa: 7.8, arrears: 0, skills: ['Python', 'SQL', 'Java', 'Communication'], certifications: ['Azure AI Fundamentals'], phone: '98410 99032', placed: true, placedCompany: 'Accenture', placedRole: 'Associate SW Engineer', placedPackage: 4.5, color: '#0d9488' },
        { id: 'S009', name: 'Deepika N', email: 'deepika@tacw.edu', registerNo: '20524UDS008', department: 'Data Science', cgpa: 8.4, arrears: 0, skills: ['Python', 'ML', 'SQL', 'Statistics'], certifications: ['Google Data Analytics'], phone: '98411 00008', placed: true, placedCompany: 'Cognizant', placedRole: 'GenC Analyst', placedPackage: 4.0, color: '#9333ea' },
        { id: 'S010', name: 'Keerthana J', email: 'keerthana@tacw.edu', registerNo: '20524UEC041', department: 'Electronics', cgpa: 5.9, arrears: 4, skills: ['Communication'], certifications: [], phone: '98411 11041', placed: false, color: '#b45309' },
      ],
      companies: [
        { id: 'C01', name: 'Zoho Corporation', role: 'Software Developer', ctc: 6.5, location: 'Chennai', domain: 'Product / SaaS', minCgpa: 7.5, departments: ['Computer Science', 'Information Technology'], requiredSkills: ['Java', 'SQL', 'Problem Solving'], maxArrears: 0, deadline: days(5), applyLink: 'https://careers.zohocorp.com', description: 'Zoho is hiring final-year students for its Chennai product teams. Role involves building scalable web applications for the Zoho suite.', openings: 12, color: '#d32f2f' },
        { id: 'C02', name: 'TCS', role: 'Ninja Developer', ctc: 3.6, location: 'Chennai', domain: 'IT Services', minCgpa: 6.0, departments: ['Computer Science', 'Information Technology', 'Data Science', 'Electronics', 'Mathematics'], requiredSkills: ['Aptitude', 'Communication'], maxArrears: 2, deadline: days(2), applyLink: 'https://nextstep.tcs.com', description: 'TCS Ninja hiring through the National Qualifier Test (NQT). Training provided at TCS learning centres.', openings: 60, color: '#5b21b6' },
        { id: 'C03', name: 'Infosys', role: 'Systems Engineer', ctc: 4.2, location: 'Bangalore', domain: 'IT Services', minCgpa: 6.5, departments: ['Computer Science', 'Information Technology', 'Electronics'], requiredSkills: ['Python', 'SQL'], maxArrears: 1, deadline: days(9), applyLink: 'https://www.infosys.com/careers', description: 'Systems Engineer role under the Infosys Power Programmer track. Mysuru training followed by project allocation.', openings: 40, color: '#007cc3' },
        { id: 'C04', name: 'Wipro', role: 'Project Engineer', ctc: 3.8, location: 'Hyderabad', domain: 'IT Services', minCgpa: 6.0, departments: ['Computer Science', 'Information Technology', 'Data Science', 'Electronics', 'Mathematics'], requiredSkills: ['Java', 'Communication'], maxArrears: 2, deadline: days(12), applyLink: 'https://careers.wipro.com', description: 'Wipro Elite hiring for project engineering roles across Java and full-stack tracks.', openings: 50, color: '#0e7490' },
        { id: 'C05', name: 'Cognizant', role: 'GenC Analyst', ctc: 4.0, location: 'Chennai', domain: 'IT Services', minCgpa: 6.5, departments: ['Computer Science', 'Information Technology', 'Electronics'], requiredSkills: ['SQL', 'Aptitude'], maxArrears: 2, deadline: days(7), applyLink: 'https://careers.cognizant.com', description: 'GenC hiring for analyst roles. Includes Cognizant academy training on cloud and data fundamentals.', openings: 45, color: '#1d4ed8' },
        { id: 'C06', name: 'Accenture', role: 'Associate Software Engineer', ctc: 4.5, location: 'Bangalore', domain: 'Consulting', minCgpa: 7.0, departments: ['Computer Science', 'Information Technology', 'Electronics'], requiredSkills: ['Java', 'Python', 'Communication'], maxArrears: 1, deadline: days(15), applyLink: 'https://www.accenture.com/in-en/careers', description: 'ASE role in the Advanced Technology Centers. Work on cloud, data and digital transformation projects.', openings: 30, color: '#7c3aed' },
        { id: 'C07', name: 'Freshworks', role: 'Product Engineer Trainee', ctc: 7.0, location: 'Chennai', domain: 'Product / SaaS', minCgpa: 8.0, departments: ['Computer Science', 'Information Technology'], requiredSkills: ['JavaScript', 'React', 'Problem Solving'], maxArrears: 0, deadline: days(4), applyLink: 'https://www.freshworks.com/company/careers', description: 'Product engineering trainee role working on Freshdesk and Freshservice front-end teams.', openings: 8, color: '#ea580c' },
        { id: 'C08', name: 'HCLTech', role: 'Graduate Engineer Trainee', ctc: 3.5, location: 'Madurai', domain: 'IT Services', minCgpa: 5.5, departments: ['Computer Science', 'Information Technology', 'Data Science', 'Electronics', 'Mathematics'], requiredSkills: ['Communication'], maxArrears: 3, deadline: days(20), applyLink: 'https://www.hcltech.com/careers', description: 'HCLTech graduate trainee program with deployment at the Madurai delivery centre.', openings: 80, color: '#059669' },
        { id: 'C09', name: 'Amazon', role: 'SDE Intern', ctc: 12.0, location: 'Bangalore', domain: 'Product / E-Commerce', minCgpa: 8.5, departments: ['Computer Science', 'Information Technology'], requiredSkills: ['DSA', 'Java', 'Problem Solving'], maxArrears: 0, deadline: days(6), applyLink: 'https://www.amazon.jobs', description: 'Six-month SDE internship with possible PPO. Strong focus on data structures, algorithms and leadership principles.', openings: 5, color: '#b45309' },
        { id: 'C10', name: 'Tech Mahindra', role: 'Associate Analyst', ctc: 3.2, location: 'Chennai', domain: 'IT Services', minCgpa: 5.5, departments: ['Computer Science', 'Information Technology', 'Data Science', 'Electronics', 'Mathematics'], requiredSkills: ['Aptitude'], maxArrears: 3, deadline: days(25), applyLink: 'https://www.techmahindra.com/careers', description: 'Associate analyst roles in telecom software and business process services units.', openings: 35, color: '#be123c' },
      ],
      notifications: [
        { id: 'N01', title: 'Zoho Campus Drive — Registrations Open', message: 'Zoho Corporation will visit campus next week. Eligible students (CGPA ≥ 7.5, CS/IT) must register before the deadline.', date: days(-0.2), type: 'drive', read: false },
        { id: 'N02', title: 'TCS Ninja — Deadline Tomorrow', message: 'Last day to submit applications for TCS Ninja (NQT). Carry hall ticket and ID proof for the test.', date: days(-0.5), type: 'deadline', read: false },
        { id: 'N03', title: 'Mock Aptitude Test on Friday', message: 'Placement cell is conducting a mock aptitude test in Lab 3 at 10 AM. Attendance is compulsory for final-year students.', date: days(-1), type: 'announcement', read: false },
        { id: 'N04', title: 'Freshworks Pre-Placement Talk', message: 'Freshworks engineering team will deliver a pre-placement talk in the auditorium at 2 PM tomorrow.', date: days(-2), type: 'drive', read: true },
        { id: 'N05', title: 'Resume Submission — Amazon SDE Intern', message: 'Students applying for the Amazon SDE internship must upload resumes to the placement portal by Friday.', date: days(-3), type: 'deadline', read: true },
      ],
      enrollments: [],
      applications: [
        { studentId: 'S001', companyId: 'C03', date: days(-1) },
        { studentId: 'S002', companyId: 'C01', date: days(-2) },
        { studentId: 'S006', companyId: 'C07', date: days(-2) },
        { studentId: 'S008', companyId: 'C06', date: days(-4) },
        { studentId: 'S009', companyId: 'C05', date: days(-5) },
        { studentId: 'S001', companyId: 'C02', date: days(-0.5) },
      ],
    };
  }

  // ---- Students ----
  get students(): Student[] { return this.store.students; }
  getStudent(id: string): Student | undefined { return this.store.students.find(s => s.id === id); }

  updateStudent(updated: Student) {
    const i = this.store.students.findIndex(s => s.id === updated.id);
    if (i >= 0) { this.store.students[i] = updated; this.persist(); }
  }

  // ---- Companies ----
  get companies(): Company[] { return this.store.companies; }
  getCompany(id: string): Company | undefined { return this.store.companies.find(c => c.id === id); }

  saveCompany(company: Company) {
    const i = this.store.companies.findIndex(c => c.id === company.id);
    if (i >= 0) this.store.companies[i] = company;
    else this.store.companies.unshift(company);
    this.persist();
  }

  deleteCompany(id: string) {
    this.store.companies = this.store.companies.filter(c => c.id !== id);
    this.store.applications = this.store.applications.filter(a => a.companyId !== id);
    this.persist();
  }

  // ---- Notifications ----
  get notifications(): AppNotification[] {
    return [...this.store.notifications].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }

  addNotification(n: Omit<AppNotification, 'id' | 'date' | 'read'>) {
    this.store.notifications.unshift({
      ...n,
      id: 'N' + Date.now(),
      date: new Date().toISOString(),
      read: false,
    });
    this.persist();
  }

  deleteNotification(id: string) {
    this.store.notifications = this.store.notifications.filter(n => n.id !== id);
    this.persist();
  }

  markAllRead() {
    this.store.notifications.forEach(n => (n.read = true));
    this.persist();
  }

  get unreadCount(): number { return this.store.notifications.filter(n => !n.read).length; }

  // ---- Applications ----
  get applications(): Application[] { return this.store.applications; }

  hasApplied(studentId: string, companyId: string): boolean {
    return this.store.applications.some(a => a.studentId === studentId && a.companyId === companyId);
  }

  apply(studentId: string, companyId: string) {
    if (!this.hasApplied(studentId, companyId)) {
      this.store.applications.push({ studentId, companyId, date: new Date().toISOString() });
      this.persist();
    }
  }

  applicantsFor(companyId: string): number {
    return this.store.applications.filter(a => a.companyId === companyId).length;
  }

  applicationsOf(studentId: string): Application[] {
    return this.store.applications.filter(a => a.studentId === studentId);
  }

  // ---- Courses & Enrollments ----
  get courses(): Course[] { return COURSES; }
  getCourse(id: string): Course | undefined { return COURSES.find(c => c.id === id); }

  courseLessons(c: Course): number {
    return c.modules.reduce((t, m) => t + m.lessons.length, 0);
  }

  courseMinutes(c: Course): number {
    return c.modules.reduce((t, m) => t + m.lessons.reduce((s, l) => s + l.minutes, 0), 0);
  }

  courseHours(c: Course): string {
    return (Math.round(this.courseMinutes(c) / 6) / 10).toFixed(1);
  }

  enrollmentOf(studentId: string, courseId: string): Enrollment | undefined {
    return this.store.enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
  }

  enroll(studentId: string, courseId: string) {
    if (!this.enrollmentOf(studentId, courseId)) {
      this.store.enrollments.push({ studentId, courseId, date: new Date().toISOString(), done: [] });
      this.persist();
    }
  }

  toggleLesson(studentId: string, courseId: string, lessonId: string) {
    const e = this.enrollmentOf(studentId, courseId);
    if (!e) return;
    const i = e.done.indexOf(lessonId);
    if (i >= 0) e.done.splice(i, 1);
    else e.done.push(lessonId);
    this.persist();
  }

  courseProgress(studentId: string, c: Course): { done: number; total: number; pct: number } {
    const total = this.courseLessons(c);
    const done = this.enrollmentOf(studentId, c.id)?.done.length ?? 0;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }
}
