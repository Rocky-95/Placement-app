import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { close, checkmark, briefcase } from 'ionicons/icons';
import { Company } from '../../models/models';
import { DataService, DEPARTMENTS, SKILLS } from '../../services/data.service';

const PALETTE = ['#d32f2f', '#5b21b6', '#007cc3', '#0e7490', '#1d4ed8', '#7c3aed', '#ea580c', '#059669', '#b45309', '#be123c'];

@Component({
  selector: 'app-company-form',
  templateUrl: 'company-form.component.html',
  styleUrls: ['company-form.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CompanyFormComponent implements OnInit {
  @Input() company?: Company;

  form!: Company;
  departments = DEPARTMENTS;
  allSkills = SKILLS;
  palette = PALETTE;
  deadlineDate = '';

  constructor(private modal: ModalController, private data: DataService) {
    addIcons({ close, checkmark, briefcase });
  }

  ngOnInit() {
    this.form = this.company
      ? { ...this.company, departments: [...this.company.departments], requiredSkills: [...this.company.requiredSkills] }
      : {
          id: 'C' + Date.now(), name: '', role: '', ctc: 4.0, location: '',
          domain: 'IT Services', minCgpa: 6.0, departments: [], requiredSkills: [],
          maxArrears: 0, deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
          applyLink: '', description: '', openings: 20, color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        };
    this.deadlineDate = this.form.deadline.slice(0, 10);
  }

  toggle(list: string[], v: string) {
    const i = list.indexOf(v);
    if (i >= 0) list.splice(i, 1);
    else list.push(v);
  }

  has(list: string[], v: string): boolean { return list.includes(v); }

  valid(): boolean {
    return !!(this.form.name.trim() && this.form.role.trim() && this.form.location.trim());
  }

  save() {
    this.form.deadline = new Date(this.deadlineDate + 'T23:59:00').toISOString();
    this.data.saveCompany(this.form);
    if (!this.company) {
      this.data.addNotification({
        title: `New Drive — ${this.form.name}`,
        message: `${this.form.name} is hiring ${this.form.role} (₹${this.form.ctc} LPA). Check eligibility and apply before ${new Date(this.form.deadline).toLocaleDateString()}.`,
        type: 'drive',
      });
    }
    this.modal.dismiss({ saved: true });
  }

  close() { this.modal.dismiss({ saved: false }); }
}
