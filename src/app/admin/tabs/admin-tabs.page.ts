import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { grid, briefcase, people, megaphone } from 'ionicons/icons';

@Component({
  selector: 'app-admin-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard">
          <ion-icon name="grid"></ion-icon>
          <ion-label>Dashboard</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="companies">
          <ion-icon name="briefcase"></ion-icon>
          <ion-label>Drives</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="students">
          <ion-icon name="people"></ion-icon>
          <ion-label>Students</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="notifications">
          <ion-icon name="megaphone"></ion-icon>
          <ion-label>Notify</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  imports: [IonicModule],
})
export class AdminTabsPage {
  constructor() {
    addIcons({ grid, briefcase, people, megaphone });
  }
}
