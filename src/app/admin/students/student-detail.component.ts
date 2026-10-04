import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  close, school, alertCircle, mail, call, idCard, ribbon,
  trophy, sparkles, codeSlash, briefcase,
} from 'ionicons/icons';
import { PredictionResult, Student } from '../../models/models';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: 'student-detail.component.html',
  styleUrls: ['student-detail.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class StudentDetailComponent implements OnInit {
  @Input() student!: Student;
  result!: PredictionResult;
  eligibleCount = 0;
  appliedCompanies: { name: string; role: string; color: string; date: string }[] = [];

  constructor(
    private modal: ModalController,
    private data: DataService,
    private pred: PredictionService,
  ) {
    addIcons({ close, school, alertCircle, mail, call, idCard, ribbon, trophy, sparkles, codeSlash, briefcase });
  }

  ngOnInit() {
    this.result = this.pred.predict(this.student);
    this.eligibleCount = this.data.companies.filter(c => this.pred.checkEligibility(this.student, c).eligible).length;
    this.appliedCompanies = this.data.applicationsOf(this.student.id)
      .map(a => {
        const c = this.data.getCompany(a.companyId);
        return c ? { name: c.name, role: c.role, color: c.color, date: a.date } : null;
      })
      .filter((x): x is NonNullable<typeof x> => !!x);
  }

  initials(): string {
    return this.student.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  scoreColor(): string {
    return this.result.score >= 75 ? 'success' : this.result.score >= 50 ? 'warning' : 'danger';
  }

  close() { this.modal.dismiss(); }
}
