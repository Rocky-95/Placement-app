import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  notifications, megaphone, alarm, informationCircle, checkmarkDone,
  briefcase, time,
} from 'ionicons/icons';
import { DataService } from '../../services/data.service';
import { AppNotification } from '../../models/models';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class NotificationsPage {
  items: AppNotification[] = [];

  constructor(public data: DataService) {
    addIcons({ notifications, megaphone, alarm, informationCircle, checkmarkDone, briefcase, time });
  }

  ionViewWillEnter() {
    this.items = this.data.notifications;
  }

  markAll() {
    this.data.markAllRead();
    this.items = this.data.notifications;
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
