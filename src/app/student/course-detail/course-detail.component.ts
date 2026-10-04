import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import {
  close, star, people, time, layers, checkmarkCircle, checkmarkDone,
  ellipseOutline, playCircle, ribbon, sparkles,
} from 'ionicons/icons';
import { Course, CourseLesson, CourseModule, Student } from '../../models/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: 'course-detail.component.html',
  styleUrls: ['course-detail.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class CourseDetailComponent implements OnInit {
  @Input() course!: Course;
  @Input() student?: Student;

  enrolled = false;
  done = new Set<string>();

  constructor(
    private modal: ModalController,
    public data: DataService,
    private toast: ToastController,
  ) {
    addIcons({ close, star, people, time, layers, checkmarkCircle, checkmarkDone, ellipseOutline, playCircle, ribbon, sparkles });
  }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    const e = this.student ? this.data.enrollmentOf(this.student.id, this.course.id) : undefined;
    this.enrolled = !!e;
    this.done = new Set(e?.done ?? []);
  }

  lessonCount(): number { return this.data.courseLessons(this.course); }
  moduleMinutes(m: CourseModule): number { return m.lessons.reduce((t, l) => t + l.minutes, 0); }
  hours(): string { return this.data.courseHours(this.course); }

  progress(): number {
    if (!this.student) return 0;
    return this.data.courseProgress(this.student.id, this.course).pct;
  }

  isDone(l: CourseLesson): boolean { return this.done.has(l.id); }

  toggle(l: CourseLesson) {
    if (!this.student || !this.enrolled) return;
    this.data.toggleLesson(this.student.id, this.course.id, l.id);
    this.refresh();
  }

  async enroll() {
    if (!this.student) return;
    this.data.enroll(this.student.id, this.course.id);
    this.refresh();
    (await this.toast.create({
      message: `Enrolled in "${this.course.title}". Mark lessons complete as you finish them.`,
      duration: 2500, color: 'success', position: 'bottom',
    })).present();
  }

  dismiss() { this.modal.dismiss(); }
}
