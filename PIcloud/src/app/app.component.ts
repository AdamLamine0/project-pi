import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ChatService } from './modules/community/messaging/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'PIcloud';

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.initRealTimeNotifications();
    }
  }

  private initRealTimeNotifications() {
    const userId = String(this.authService.getUserId());
    
    this.chatService.connect(userId, () => {
      this.chatService.subscribeToPrivate(userId, (message) => {
        // If message is from SYSTEM or contains quiz link, show notification
        if (message.senderId === 'SYSTEM' || message.content.includes('/quiz/')) {
          this.showNotification(message);
        }
      });
    });
  }

  private showNotification(message: any) {
    const snackBarRef = this.snackBar.open(
      `Nouveau message : ${message.content.substring(0, 50)}...`,
      'Voir',
      { duration: 10000, horizontalPosition: 'right', verticalPosition: 'top' }
    );

    snackBarRef.onAction().subscribe(() => {
      if (message.content.includes('/quiz/')) {
        const quizId = message.content.split('/').pop();
        this.router.navigate(['/community/marketplace/quiz', quizId]);
      } else {
        this.router.navigate(['/community/messaging/private', message.senderId]);
      }
    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
