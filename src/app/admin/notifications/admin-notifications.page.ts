import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  megaphone, send, trash, briefcase, alarm, time, informationCircle,
} from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { AppNotification } from '../../models/models';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: 'admin-notifications.page.html',
  styleUrls: ['admin-notifications.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminNotificationsPage {
  items: AppNotification[] = [];
  title = '';
  message = '';
  type: AppNotification['type'] = 'announcement';

  constructor(
    public data: DataService,
    private toast: ToastController,
    private alert: AlertController,
  ) {
    addIcons({ megaphone, send, trash, briefcase, alarm, time, informationCircle });
  }

  ionViewWillEnter() {
    this.items = this.data.notifications;
  }

  async publish() {
    if (!this.title.trim() || !this.message.trim()) {
      (await this.toast.create({ message: 'Enter a title and message', duration: 1600, color: 'warning', position: 'bottom' })).present();
      return;
    }
    this.data.addNotification({ title: this.title.trim(), message: this.message.trim(), type: this.type });
    this.title = this.message = '';
    this.type = 'announcement';
    this.items = this.data.notifications;
    (await this.toast.create({
      message: `Notification published to ${this.data.students.length} students`,
      duration: 2000, color: 'success', position: 'bottom',
    })).present();
  }

  async remove(n: AppNotification) {
    const a = await this.alert.create({
      header: 'Delete notification?',
      message: n.title,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => { this.data.deleteNotification(n.id); this.items = this.data.notifications; } },
      ],
    });
    await a.present();
  }

  icon(t: AppNotification['type']): string {
    return t === 'drive' ? 'briefcase' : t === 'deadline' ? 'alarm' : 'megaphone';
  }

  iconColor(t: AppNotification['type']): string {
    return t === 'drive' ? 'primary' : t === 'deadline' ? 'danger' : 'warning';
  }

  ago(iso: string): string {
    const s = Math.floor((Date.now() - +new Date(iso)) / 1000);
    if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }
}
