import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  briefcase, checkmarkCircle, calendar, notifications, sparkles,
  trendingUp, chevronForward, time, location, cash, logOut, person,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';
import { Company, PredictionResult, Student } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage {
  student?: Student;
  prediction!: PredictionResult;
  eligibleCompanies: Company[] = [];
  upcoming: Company[] = [];

  constructor(
    public auth: AuthService,
    public data: DataService,
    private pred: PredictionService,
    private router: Router,
  ) {
    addIcons({ briefcase, checkmarkCircle, calendar, notifications, sparkles, trendingUp, chevronForward, time, location, cash, logOut, person });
  }

  ionViewWillEnter() {
    const s = this.data.getStudent(this.auth.user?.studentId ?? '');
    if (!s) return;
    this.student = s;
    this.prediction = this.pred.predict(s);
    this.eligibleCompanies = this.data.companies
      .filter(c => this.pred.checkEligibility(s, c).eligible)
      .sort((a, b) => this.pred.daysLeft(a.deadline) - this.pred.daysLeft(b.deadline));
    this.upcoming = [...this.data.companies]
      .sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline))
      .slice(0, 4);
  }

  daysLeft(d: string) { return this.pred.daysLeft(d); }

  initials(): string {
    return this.student?.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '';
  }

  scoreColor(): string {
    return this.prediction.score >= 75 ? 'success' : this.prediction.score >= 50 ? 'warning' : 'danger';
  }

  async logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
