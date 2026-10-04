import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  star, people, time, layers, search, book, playCircle,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Course, Student } from '../../models/models';
import { CourseDetailComponent } from '../course-detail/course-detail.component';

interface Row {
  course: Course;
  lessons: number;
  hours: string;
  enrolled: boolean;
  pct: number;
}

@Component({
  selector: 'app-courses',
  templateUrl: 'courses.page.html',
  styleUrls: ['courses.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CoursesPage {
  student?: Student;
  rows: Row[] = [];
  filtered: Row[] = [];
  query = '';
  category = 'all';
  categories: string[] = [];

  constructor(
    private auth: AuthService,
    public data: DataService,
    private modal: ModalController,
  ) {
    addIcons({ star, people, time, layers, search, book, playCircle });
  }

  ionViewWillEnter() {
    this.student = this.data.getStudent(this.auth.user?.studentId ?? '');
    this.categories = [...new Set(this.data.courses.map(c => c.category))];
    this.rows = this.data.courses.map(c => {
      const prog = this.student ? this.data.courseProgress(this.student.id, c) : { pct: 0 };
      return {
        course: c,
        lessons: this.data.courseLessons(c),
        hours: this.data.courseHours(c),
        enrolled: !!this.student && !!this.data.enrollmentOf(this.student.id, c.id),
        pct: prog.pct,
      };
    });
    this.applyFilter();
  }

  applyFilter() {
    const q = this.query.trim().toLowerCase();
    this.filtered = this.rows.filter(r => {
      if (this.category !== 'all' && r.course.category !== this.category) return false;
      if (!q) return true;
      return r.course.title.toLowerCase().includes(q)
        || r.course.category.toLowerCase().includes(q)
        || r.course.description.toLowerCase().includes(q);
    });
  }

  async openDetail(c: Course) {
    const m = await this.modal.create({
      component: CourseDetailComponent,
      componentProps: { course: c, student: this.student },
      breakpoints: [0, 0.92],
      initialBreakpoint: 0.92,
    });
    await m.present();
    await m.onDidDismiss();
    this.ionViewWillEnter();
  }
}
