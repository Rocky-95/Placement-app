import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  sparkles, bulb, refresh, analytics, person, construct, cog,
  cloudDone, barChart, infinite, checkmarkCircle,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';
import { PredictionResult, Student } from '../../models/models';

@Component({
  selector: 'app-prediction',
  templateUrl: 'prediction.page.html',
  styleUrls: ['prediction.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class PredictionPage {
  student!: Student;
  result!: PredictionResult;
  analyzing = false;
  CIRC = 2 * Math.PI * 52;

  steps = [
    { icon: 'person', title: 'Data Collection', text: 'CGPA, department, skills, arrears & certifications are gathered from your profile.' },
    { icon: 'construct', title: 'Processing', text: 'Data is cleaned, normalized and converted into model-ready features.' },
    { icon: 'cog', title: 'ML Training', text: 'A scikit-learn model is trained on historical placement trends of past batches.' },
    { icon: 'cloud-done', title: 'Prediction API', text: 'Your profile is scored in real time to compute placement probability.' },
    { icon: 'bar-chart', title: 'Insights', text: 'Results show your score, strengths and areas needing improvement.' },
    { icon: 'infinite', title: 'Improvement', text: 'The model is retrained with fresh placement data to refine accuracy.' },
  ];

  constructor(
    private auth: AuthService,
    private data: DataService,
    private pred: PredictionService,
  ) {
    addIcons({ sparkles, bulb, refresh, analytics, person, construct, cog, cloudDone, barChart, infinite, checkmarkCircle });
  }

  ionViewWillEnter() {
    const s = this.data.getStudent(this.auth.user?.studentId ?? '');
    if (s) {
      this.student = s;
      this.result = this.pred.predict(s);
    }
  }

  reanalyze() {
    this.analyzing = true;
    setTimeout(() => {
      this.result = this.pred.predict(this.student);
      this.analyzing = false;
    }, 900);
  }

  color(): string {
    return this.result.score >= 75 ? '#10b981' : this.result.score >= 50 ? '#f59e0b' : '#ef4444';
  }

  chipColor(): string {
    return this.result.score >= 75 ? 'success' : this.result.score >= 50 ? 'warning' : 'danger';
  }

  factorColor(f: { score: number; max: number }): string {
    const p = f.score / f.max;
    return p >= 0.75 ? 'success' : p >= 0.45 ? 'warning' : 'danger';
  }
}
