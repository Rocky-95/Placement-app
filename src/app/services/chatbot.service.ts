import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { PredictionService } from './prediction.service';
import { Student } from '../models/models';
import { ChatQA, DEFAULT_SUGGESTIONS, DynamicIntent, FALLBACK_ANSWER, QA_ENTRIES } from '../data/chat.data';

export interface BotReply {
  text: string;
  suggestions: string[];
}

/**
 * Offline "AI" assistant. Matches the student's question against a
 * keyword table; several entries are dynamic and build their answer
 * from live app data (drives, deadlines, prediction score, …).
 */
@Injectable({ providedIn: 'root' })
export class ChatbotService {
  constructor(
    private data: DataService,
    private auth: AuthService,
    private pred: PredictionService,
  ) {}

  get welcomeMessage(): string {
    const name = this.auth.user?.name?.split(' ')[0] ?? 'there';
    return `Hi ${name}! I'm your placement assistant. Ask me about drives you're eligible for, deadlines, interview prep — or pick a question below.`;
  }

  get defaultSuggestions(): string[] { return DEFAULT_SUGGESTIONS; }

  reply(input: string): BotReply {
    const q = ' ' + input.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
    const tokens = new Set(q.trim().split(' '));

    let best: ChatQA | null = null;
    let bestScore = 0;
    for (const e of QA_ENTRIES) {
      const score = e.keywords.reduce((s, k) => {
        const hit = k.includes(' ') ? q.includes(' ' + k + ' ') || q.includes(k) : tokens.has(k);
        return s + (hit ? k.split(' ').length : 0);
      }, 0);
      if (score > bestScore) { bestScore = score; best = e; }
    }

    if (!best) {
      return { text: FALLBACK_ANSWER, suggestions: DEFAULT_SUGGESTIONS };
    }

    const text = best.dynamic ? this.dynamicAnswer(best.dynamic) : best.answer!;
    return { text, suggestions: best.suggestions ?? DEFAULT_SUGGESTIONS };
  }

  private student(): Student | undefined {
    return this.data.getStudent(this.auth.user?.studentId ?? '');
  }

  private dynamicAnswer(intent: DynamicIntent): string {
    const s = this.student();
    if (!s) return 'I need a student session to answer that — please log in again.';

    switch (intent) {
      case 'eligible': {
        const list = this.data.companies
          .filter(c => this.pred.checkEligibility(s, c).eligible && this.pred.daysLeft(c.deadline) > 0)
          .sort((a, b) => this.pred.daysLeft(a.deadline) - this.pred.daysLeft(b.deadline));
        if (!list.length) {
          return 'You\'re not eligible for any open drive right now. Check the AI Score tab — it lists the fastest ways to unlock more drives (CGPA, arrears, skills).';
        }
        return `You're eligible for ${list.length} open drive${list.length > 1 ? 's' : ''}:\n\n`
          + list.slice(0, 5).map(c =>
            `• ${c.name} — ${c.role} · ₹${c.ctc} LPA · ${this.pred.daysLeft(c.deadline)}d left`).join('\n')
          + '\n\nOpen the Drives tab to view details and apply.';
      }

      case 'deadlines': {
        const open = this.data.companies
          .filter(c => this.pred.daysLeft(c.deadline) > 0)
          .sort((a, b) => this.pred.daysLeft(a.deadline) - this.pred.daysLeft(b.deadline))
          .slice(0, 5);
        if (!open.length) return 'All current drives have closed. New ones are announced as notifications.';
        return 'Nearest application deadlines:\n\n'
          + open.map(c => `• ${c.name} (${c.role}) — ${this.pred.daysLeft(c.deadline)}d left, closes ${
            new Date(c.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`).join('\n');
      }

      case 'score': {
        const r = this.pred.predict(s);
        return `Your AI readiness score is ${r.score}% (${r.label}).\n\nTop factors:\n`
          + r.factors.slice(0, 3).map(f => `• ${f.label}: ${f.score}/${f.max}`).join('\n')
          + `\n\nSuggestion: ${r.suggestions[0]}`;
      }

      case 'applications': {
        const apps = this.data.applicationsOf(s.id);
        if (!apps.length) return 'You haven\'t applied to any drives yet. Ask me which companies you\'re eligible for and I\'ll list them.';
        return `You've applied to ${apps.length} drive${apps.length > 1 ? 's' : ''}:\n\n`
          + apps.map(a => {
            const c = this.data.getCompany(a.companyId);
            return `• ${c?.name ?? a.companyId} — ${c?.role ?? ''} (${new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`;
          }).join('\n')
          + '\n\nThe placement cell will verify and forward these.';
      }

      case 'alerts': {
        const unread = this.data.notifications.filter(n => !n.read);
        if (!unread.length) return 'No unread alerts right now — you\'re all caught up.';
        return `You have ${unread.length} unread alert${unread.length > 1 ? 's' : ''}:\n\n`
          + unread.slice(0, 4).map(n => `• ${n.title}`).join('\n')
          + '\n\nCheck the Alerts tab for full details.';
      }

      case 'courses': {
        return `${this.data.courses.length} courses are available in the Courses tab:\n\n`
          + this.data.courses.map(c => `• ${c.title} (${c.category})`).join('\n')
          + '\n\nTell me a topic — like "aptitude" or "DSA" — and I\'ll point you to the right one.';
      }

      case 'profile': {
        return `Here's your profile:\n\n• ${s.name} (${s.registerNo})\n• ${s.department} · CGPA ${s.cgpa.toFixed(1)}\n• Standing arrears: ${s.arrears}\n• Skills: ${s.skills.join(', ')}\n• Certifications: ${s.certifications.length ? s.certifications.join(', ') : 'none yet'}\n• Status: ${s.placed ? `Placed at ${s.placedCompany}` : 'Not placed yet'}`;
      }
    }
  }
}
