import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  people, trophy, briefcase, school, logOut, trendingUp,
  statsChart, time, megaphone,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DataService, DEPARTMENTS } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class DashboardPage {
  deptStats: { dept: string; total: number; placed: number; pct: number }[] = [];
  topDrives: { name: string; color: string; applicants: number; days: number }[] = [];

  constructor(
    public auth: AuthService,
    public data: DataService,
    private pred: PredictionService,
    private router: Router,
  ) {
    addIcons({ people, trophy, briefcase, school, logOut, trendingUp, statsChart, time, megaphone });
  }

  ionViewWillEnter() {
    this.deptStats = DEPARTMENTS.map(d => {
      const students = this.data.students.filter(s => s.department === d);
      const placed = students.filter(s => s.placed).length;
      return {
        dept: d,
        total: students.length,
        placed,
        pct: students.length ? Math.round((placed / students.length) * 100) : 0,
      };
    }).filter(d => d.total > 0);

    this.topDrives = this.data.companies
      .map(c => ({ name: c.name, color: c.color, applicants: this.data.applicantsFor(c.id), days: this.pred.daysLeft(c.deadline) }))
      .sort((a, b) => b.applicants - a.applicants)
      .slice(0, 5);
  }

  get total(): number { return this.data.students.length; }
  get placed(): number { return this.data.students.filter(s => s.placed).length; }
  get placedPct(): number { return this.total ? Math.round((this.placed / this.total) * 100) : 0; }
  get activeDrives(): number { return this.data.companies.filter(c => this.pred.daysLeft(c.deadline) > 0).length; }
  get avgCgpa(): string {
    const s = this.data.students;
    return s.length ? (s.reduce((t, x) => t + x.cgpa, 0) / s.length).toFixed(1) : '0';
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
