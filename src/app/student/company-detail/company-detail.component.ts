import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  close, cash, location, time, people, checkmarkCircle, closeCircle,
  openOutline, briefcase, business, checkmarkDone,
} from 'ionicons/icons';
import { Company, EligibilityResult, Student } from '../../models/models';
import { PredictionService } from '../../services/prediction.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: 'company-detail.component.html',
  styleUrls: ['company-detail.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CompanyDetailComponent {
  @Input() company!: Company;
  @Input() student!: Student;

  elig!: EligibilityResult;
  applied = false;

  constructor(
    private modal: ModalController,
    private pred: PredictionService,
    private data: DataService,
    private toast: ToastController,
  ) {
    addIcons({ close, cash, location, time, people, checkmarkCircle, closeCircle, openOutline, briefcase, business, checkmarkDone });
  }

  ngOnInit() {
    this.elig = this.pred.checkEligibility(this.student, this.company);
    this.applied = this.data.hasApplied(this.student.id, this.company.id);
  }

  days() { return this.pred.daysLeft(this.company.deadline); }

  async apply() {
    this.data.apply(this.student.id, this.company.id);
    this.applied = true;
    (await this.toast.create({
      message: `Application recorded for ${this.company.name}. The placement cell will verify and forward it.`,
      duration: 2500, color: 'success', position: 'bottom',
    })).present();
  }

  dismiss() { this.modal.dismiss(); }
}
