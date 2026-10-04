import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { home, briefcase, book, sparkles, notifications, person, chatbubbleEllipses } from 'ionicons/icons';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-student-tabs',
  template: `
    <ion-tabs>
      @if (!onChat) {
        <ion-fab vertical="bottom" horizontal="end">
          <ion-fab-button routerLink="/student/chat" aria-label="Chat with placement assistant">
            <ion-icon name="chatbubble-ellipses"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      }
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="companies">
          <ion-icon name="briefcase"></ion-icon>
          <ion-label>Drives</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="courses">
          <ion-icon name="book"></ion-icon>
          <ion-label>Courses</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="prediction">
          <ion-icon name="sparkles"></ion-icon>
          <ion-label>AI Score</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="notifications">
          <ion-icon name="notifications"></ion-icon>
          <ion-label>Alerts</ion-label>
          @if (unread > 0) {
            <ion-badge color="danger">{{ unread }}</ion-badge>
          }
        </ion-tab-button>
        <ion-tab-button tab="profile">
          <ion-icon name="person"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class StudentTabsPage {
  constructor(public data: DataService, private router: Router) {
    addIcons({ home, briefcase, book, sparkles, notifications, person, chatbubbleEllipses });
  }

  get unread(): number { return this.data.unreadCount; }
  get onChat(): boolean { return this.router.url.includes('/student/chat'); }
}
