import { Injectable } from '@angular/core';
import { SessionUser, UserRole } from '../models/models';

const SESSION_KEY = 'placeiq_session';

// Mock credentials for the demo build
export const MOCK_CREDENTIALS: Record<UserRole, { email: string; password: string; name: string; studentId?: string }> = {
  student: { email: 'student@tacw.edu', password: 'student123', name: 'Mala M', studentId: 'S001' },
  admin: { email: 'admin@tacw.edu', password: 'admin123', name: 'Placement Officer' },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private session: SessionUser | null = null;

  constructor() {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) this.session = JSON.parse(saved);
  }

  login(role: UserRole, email: string, password: string): boolean {
    const cred = MOCK_CREDENTIALS[role];
    if (email.trim().toLowerCase() === cred.email && password === cred.password) {
      this.session = { role, email: cred.email, name: cred.name, studentId: cred.studentId };
      localStorage.setItem(SESSION_KEY, JSON.stringify(this.session));
      return true;
    }
    return false;
  }

  logout() {
    this.session = null;
    localStorage.removeItem(SESSION_KEY);
  }

  get user(): SessionUser | null { return this.session; }
  get role(): UserRole | null { return this.session?.role ?? null; }
  isLoggedIn(): boolean { return !!this.session; }
}
