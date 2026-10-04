import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  school, mail, lockClosed, eye, eyeOff, logIn, personCircle,
  shieldCheckmark, informationCircle, sparkles,
} from 'ionicons/icons';
import { AuthService, MOCK_CREDENTIALS } from '../services/auth.service';
import { UserRole } from '../models/models';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  role: UserRole = 'student';
  email = '';
  password = '';
  showPassword = false;
  loading = false;
  creds = MOCK_CREDENTIALS;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
  ) {
    addIcons({ school, mail, lockClosed, eye, eyeOff, logIn, personCircle, shieldCheckmark, informationCircle, sparkles });
  }

  fillDemo() {
    this.email = this.creds[this.role].email;
    this.password = this.creds[this.role].password;
  }

  async login() {
    if (!this.email.trim() || !this.password) {
      (await this.toast.create({ message: 'Enter email and password', duration: 1800, color: 'warning', position: 'bottom' })).present();
      return;
    }
    this.loading = true;
    setTimeout(async () => {
      this.loading = false;
      if (this.auth.login(this.role, this.email, this.password)) {
        this.router.navigateByUrl(this.role === 'admin' ? '/admin' : '/student', { replaceUrl: true });
      } else {
        (await this.toast.create({
          message: 'Invalid credentials — use the demo login shown below',
          duration: 2200, color: 'danger', position: 'bottom',
        })).present();
      }
    }, 500);
  }
}
