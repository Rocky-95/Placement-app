import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { search, people, trophy, sparkles } from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';
import { Student } from '../../models/models';
import { StudentDetailComponent } from './student-detail.component';

interface Row {
  student: Student;
  score: number;
  eligible: number;
}

@Component({
  selector: 'app-admin-students',
  templateUrl: 'admin-students.page.html',
  styleUrls: ['admin-students.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminStudentsPage {
  rows: Row[] = [];
  filtered: Row[] = [];
  query = '';
  filter: 'all' | 'placed' | 'unplaced' = 'all';

  constructor(
    private data: DataService,
    private pred: PredictionService,
    private modal: ModalController,
  ) {
    addIcons({ search, people, trophy, sparkles });
  }

  ionViewWillEnter() {
    this.rows = this.data.students.map(s => ({
      student: s,
      score: this.pred.predict(s).score,
      eligible: this.data.companies.filter(c => this.pred.checkEligibility(s, c).eligible).length,
    })).sort((a, b) => b.score - a.score);
    this.applyFilter();
  }

  applyFilter() {
    const q = this.query.trim().toLowerCase();
    this.filtered = this.rows.filter(r => {
      if (this.filter === 'placed' && !r.student.placed) return false;
      if (this.filter === 'unplaced' && r.student.placed) return false;
      if (!q) return true;
      return r.student.name.toLowerCase().includes(q)
        || r.student.registerNo.toLowerCase().includes(q)
        || r.student.department.toLowerCase().includes(q);
    });
  }

  scoreColor(score: number): string {
    return score >= 75 ? 'success' : score >= 50 ? 'warning' : 'danger';
  }

  initials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  async openDetail(s: Student) {
    const m = await this.modal.create({
      component: StudentDetailComponent,
      componentProps: { student: s },
      breakpoints: [0, 0.85],
      initialBreakpoint: 0.85,
    });
    await m.present();
  }
}
