import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  create, logOut, school, alertCircle, call, mail, idCard, ribbon,
  trophy, briefcase, codeSlash, calendar,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';
import { Application, Company, Student } from '../../models/models';
import { EditProfileComponent } from './edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class ProfilePage {
  student!: Student;
  score = 0;
  applied: { app: Application; company: Company }[] = [];

  constructor(
    private auth: AuthService,
    private data: DataService,
    private pred: PredictionService,
    private modal: ModalController,
    private router: Router,
  ) {
    addIcons({ create, logOut, school, alertCircle, call, mail, idCard, ribbon, trophy, briefcase, codeSlash, calendar });
  }

  ionViewWillEnter() {
    const s = this.data.getStudent(this.auth.user?.studentId ?? '');
    if (s) {
      this.student = s;
      this.score = this.pred.predict(s).score;
      this.applied = this.data.applicationsOf(s.id)
        .map(a => ({ app: a, company: this.data.getCompany(a.companyId)! }))
        .filter((x): x is { app: Application; company: Company } => !!x.company);
    }
  }

  initials(): string {
    return this.student?.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '';
  }

  appliedCount(): number {
    return this.applied.length;
  }

  trackByApp(_: number, x: { app: Application }) {
    return x.app.companyId;
  }

  async edit() {
    const m = await this.modal.create({
      component: EditProfileComponent,
      componentProps: { student: { ...this.student, skills: [...this.student.skills], certifications: [...this.student.certifications] } },
    });
    await m.present();
    const { data } = await m.onDidDismiss();
    if (data?.saved) this.ionViewWillEnter();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
