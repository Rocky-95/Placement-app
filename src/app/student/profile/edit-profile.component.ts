import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { close, checkmark, add, removeCircle } from 'ionicons/icons';
import { Student } from '../../models/models';
import { DataService, DEPARTMENTS, SKILLS } from '../../services/data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EditProfileComponent {
  @Input() student!: Student;

  departments = DEPARTMENTS;
  allSkills = SKILLS;
  newCert = '';

  constructor(
    private modal: ModalController,
    private data: DataService,
    private toast: ToastController,
  ) {
    addIcons({ close, checkmark, add, removeCircle });
  }

  toggleSkill(sk: string) {
    const i = this.student.skills.indexOf(sk);
    if (i >= 0) this.student.skills.splice(i, 1);
    else this.student.skills.push(sk);
  }

  hasSkill(sk: string): boolean { return this.student.skills.includes(sk); }

  addCert() {
    const v = this.newCert.trim();
    if (v && !this.student.certifications.includes(v)) {
      this.student.certifications.push(v);
    }
    this.newCert = '';
  }

  removeCert(i: number) { this.student.certifications.splice(i, 1); }

  async save() {
    this.data.updateStudent(this.student);
    (await this.toast.create({
      message: 'Profile updated — AI score recalculated',
      duration: 2000, color: 'success', position: 'bottom',
    })).present();
    this.modal.dismiss({ saved: true });
  }

  close() { this.modal.dismiss({ saved: false }); }
}
