import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { chatbubbleEllipses, send, sparkles } from 'ionicons/icons';
import { ChatbotService } from '../../services/chatbot.service';

interface Msg {
  from: 'me' | 'bot';
  text: string;
  time: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  messages: Msg[] = [];
  suggestions: string[] = [];
  draft = '';
  typing = false;

  constructor(private bot: ChatbotService) {
    addIcons({ chatbubbleEllipses, send, sparkles });
  }

  ngOnInit() {
    setTimeout(() => {
      this.messages.push({ from: 'bot', text: this.bot.welcomeMessage, time: Date.now() });
      this.suggestions = this.bot.defaultSuggestions;
      this.scroll();
    }, 500);
  }

  send(text?: string) {
    const q = (text ?? this.draft).trim();
    if (!q || this.typing) return;

    this.messages.push({ from: 'me', text: q, time: Date.now() });
    this.draft = '';
    this.suggestions = [];
    this.typing = true;
    this.scroll();

    const reply = this.bot.reply(q);
    const delay = 700 + Math.min(reply.text.length * 6, 1600);
    setTimeout(() => {
      this.typing = false;
      this.messages.push({ from: 'bot', text: reply.text, time: Date.now() });
      this.suggestions = reply.suggestions;
      this.scroll();
    }, delay);
  }

  trackByTime(_: number, m: Msg) { return m.time; }

  private scroll() {
    setTimeout(() => this.content?.scrollToBottom(300), 50);
  }
}
