import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  briefcase, cash, location, time, checkmarkCircle, closeCircle,
  search, filter, funnel,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';
import { Company, Student } from '../../models/models';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';

interface Row {
  company: Company;
  eligible: boolean;
  skillPct: number;
  days: number;
  applied: boolean;
}

@Component({
  selector: 'app-companies',
  templateUrl: 'companies.page.html',
  styleUrls: ['companies.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CompaniesPage {
  student!: Student;
  rows: Row[] = [];
  filtered: Row[] = [];
  query = '';
  filter: 'all' | 'eligible' | 'closed' = 'all';

  constructor(
    private auth: AuthService,
    private data: DataService,
    private pred: PredictionService,
    private modal: ModalController,
    private route: ActivatedRoute,
  ) {
    addIcons({ briefcase, cash, location, time, checkmarkCircle, closeCircle, search, filter, funnel });
  }

  ionViewWillEnter() {
    const s = this.data.getStudent(this.auth.user?.studentId ?? '');
    if (!s) return;
    this.student = s;
    this.rows = this.data.companies.map(c => {
      const e = this.pred.checkEligibility(s, c);
      return {
        company: c,
        eligible: e.eligible,
        skillPct: e.skillMatchPct,
        days: this.pred.daysLeft(c.deadline),
        applied: this.data.hasApplied(s.id, c.id),
      };
    }).sort((a, b) => a.days - b.days);
    this.applyFilter();

    const open = this.route.snapshot.queryParamMap.get('open');
    if (open) {
      const c = this.data.getCompany(open);
      if (c) this.openDetail(c);
    }
  }

  applyFilter() {
    const q = this.query.trim().toLowerCase();
    this.filtered = this.rows.filter(r => {
      if (this.filter === 'eligible' && !r.eligible) return false;
      if (this.filter === 'closed' && r.days > 0) return false;
      if (!q) return true;
      return r.company.name.toLowerCase().includes(q)
        || r.company.role.toLowerCase().includes(q)
        || r.company.domain.toLowerCase().includes(q)
        || r.company.location.toLowerCase().includes(q);
    });
  }

  async openDetail(c: Company) {
    const m = await this.modal.create({
      component: CompanyDetailComponent,
      componentProps: { company: c, student: this.student },
      breakpoints: [0, 0.92],
      initialBreakpoint: 0.92,
    });
    await m.present();
    await m.onDidDismiss();
    this.ionViewWillEnter();
  }

  eligibleCount(): number { return this.rows.filter(r => r.eligible).length; }
}
