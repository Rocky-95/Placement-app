import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, ModalController, ToastController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  add, create, trash, cash, location, time, people, briefcase,
} from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { PredictionService } from '../../services/prediction.service';
import { Company } from '../../models/models';
import { CompanyFormComponent } from './company-form.component';

@Component({
  selector: 'app-admin-companies',
  templateUrl: 'admin-companies.page.html',
  styleUrls: ['admin-companies.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class AdminCompaniesPage {
  companies: Company[] = [];

  constructor(
    public data: DataService,
    private pred: PredictionService,
    private modal: ModalController,
    private alert: AlertController,
    private toast: ToastController,
  ) {
    addIcons({ add, create, trash, cash, location, time, people, briefcase });
  }

  ionViewWillEnter() {
    this.companies = [...this.data.companies]
      .sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
  }

  days(d: string) { return this.pred.daysLeft(d); }
  applicants(id: string) { return this.data.applicantsFor(id); }

  async openForm(company?: Company) {
    const m = await this.modal.create({ component: CompanyFormComponent, componentProps: { company } });
    await m.present();
    const { data } = await m.onDidDismiss();
    if (data?.saved) {
      this.ionViewWillEnter();
      (await this.toast.create({
        message: company ? 'Drive updated' : 'New drive published — students have been notified',
        duration: 2000, color: 'success', position: 'bottom',
      })).present();
    }
  }

  async confirmDelete(c: Company) {
    const a = await this.alert.create({
      header: 'Delete drive?',
      message: `Remove ${c.name} and its ${this.applicants(c.id)} application(s)?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete', role: 'destructive',
          handler: async () => {
            this.data.deleteCompany(c.id);
            this.ionViewWillEnter();
            (await this.toast.create({ message: 'Drive deleted', duration: 1600, color: 'medium', position: 'bottom' })).present();
          },
        },
      ],
    });
    await a.present();
  }
}
