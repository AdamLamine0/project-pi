import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  template: `
    <div class="quiz-container animate-fade-in-up" *ngIf="quiz">
      <div class="quiz-card glass-panel">
        <div class="quiz-header">
          <h1>Quiz Technique</h1>
          <p>Veuillez répondre à ces questions pour valider votre candidature.</p>
        </div>

        <div *ngIf="!completed" class="quiz-content">
          <div *ngFor="let question of quiz.questions; let i = index" class="question-block">
            <h3>Question {{ i + 1 }}: {{ question.questionText }}</h3>
            <mat-radio-group [(ngModel)]="answers[i]" class="options-group">
              <mat-radio-button *ngFor="let option of question.options; let j = index" [value]="j">
                {{ option }}
              </mat-radio-button>
            </mat-radio-group>
          </div>

          <div class="quiz-actions">
            <button mat-raised-button color="primary" (click)="submitQuiz()" [disabled]="!isAllAnswered()">
              Soumettre le quiz
            </button>
          </div>
        </div>

        <div *ngIf="completed" class="result-content">
          <div class="score-display">
            <h2>Résultat: {{ quiz.score | number:'1.0-1' }}%</h2>
            <div class="score-bar-container">
              <div class="score-bar" [style.width.%]="quiz.score" [class]="quiz.score >= 70 ? 'high' : (quiz.score >= 40 ? 'medium' : 'low')"></div>
            </div>
            <p *ngIf="quiz.score >= 70">Excellent travail ! Votre score a été transmis au recruteur.</p>
            <p *ngIf="quiz.score < 70 && quiz.score >= 40">Bon effort. Votre score a été transmis au recruteur.</p>
            <p *ngIf="quiz.score < 40">Vous pouvez faire mieux. Votre score a été transmis au recruteur.</p>
          </div>

          <div class="review-section">
            <h3>Révision des questions</h3>
            <div *ngFor="let question of quiz.questions; let i = index" class="review-block">
              <p class="review-question"><strong>{{ i + 1 }}. {{ question.questionText }}</strong></p>
              <p class="review-answer" [class.correct]="question.candidateAnswerIndex === question.correctAnswerIndex" [class.incorrect]="question.candidateAnswerIndex !== question.correctAnswerIndex">
                Votre réponse : {{ question.options[question.candidateAnswerIndex] }}
              </p>
              <p *ngIf="question.candidateAnswerIndex !== question.correctAnswerIndex" class="correct-answer">
                Réponse correcte : {{ question.options[question.correctAnswerIndex] }}
              </p>
              <p class="explanation"><em>Note : {{ question.explanation }}</em></p>
            </div>
          </div>

          <div class="quiz-actions">
            <button mat-raised-button color="accent" routerLink="/community/marketplace/my-applications">
              Retour à mes candidatures
            </button>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="loading-state">
      <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
      <p>Chargement du quiz...</p>
    </div>
  `,
  styles: [`
    .quiz-container { max-width: 800px; margin: 40px auto; padding: 0 16px; }
    .quiz-card { background: white; border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .quiz-header { text-align: center; margin-bottom: 40px; }
    .quiz-header h1 { font-size: 28px; font-weight: 800; color: var(--co-secondary); margin-bottom: 8px; }
    .quiz-header p { color: var(--co-text-muted); }

    .question-block { margin-bottom: 32px; padding: 24px; background: var(--co-background); border-radius: 16px; }
    .question-block h3 { font-size: 18px; font-weight: 600; margin-bottom: 20px; color: var(--co-secondary); }
    .options-group { display: flex; flex-direction: column; gap: 12px; }

    .quiz-actions { display: flex; justify-content: center; margin-top: 40px; }
    .quiz-actions button { padding: 8px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; }

    .score-display { text-align: center; margin-bottom: 40px; padding: 32px; background: var(--co-background); border-radius: 24px; }
    .score-display h2 { font-size: 32px; font-weight: 800; color: var(--co-secondary); margin-bottom: 16px; }
    .score-bar-container { height: 12px; background: rgba(0,0,0,0.05); border-radius: 6px; overflow: hidden; margin-bottom: 16px; }
    .score-bar { height: 100%; transition: width 1s ease-out; }
    .score-bar.high { background: var(--co-success); }
    .score-bar.medium { background: var(--co-warning); }
    .score-bar.low { background: var(--co-danger); }

    .review-section { margin-top: 40px; }
    .review-section h3 { font-size: 20px; font-weight: 700; margin-bottom: 24px; }
    .review-block { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--co-background); }
    .review-question { margin-bottom: 8px; font-size: 16px; }
    .review-answer { font-weight: 600; margin-bottom: 4px; }
    .review-answer.correct { color: var(--co-success); }
    .review-answer.incorrect { color: var(--co-danger); }
    .correct-answer { color: var(--co-success); font-weight: 600; margin-bottom: 4px; }
    .explanation { color: var(--co-text-muted); font-size: 14px; }

    .loading-state { text-align: center; padding: 100px; color: var(--co-text-muted); }
  `]
})
export class QuizComponent implements OnInit {
  quiz: any;
  answers: number[] = [];
  loading = false;
  completed = false;
  quizId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketplaceService: MarketplaceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId') || '';
    this.loadQuiz();
  }

  loadQuiz() {
    this.loading = true;
    this.marketplaceService.getQuiz(this.quizId).subscribe({
      next: (quiz) => {
        this.quiz = quiz;
        this.completed = quiz.completed;
        this.answers = new Array(quiz.questions.length).fill(null);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement du quiz', 'Fermer', { duration: 3000 });
      }
    });
  }

  isAllAnswered(): boolean {
    return this.answers.every(a => a !== null);
  }

  submitQuiz() {
    if (!this.isAllAnswered()) return;

    this.loading = true;
    this.marketplaceService.submitQuiz(this.quizId, this.answers).subscribe({
      next: (result) => {
        this.quiz = result;
        this.completed = true;
        this.loading = false;
        this.snackBar.open('Quiz soumis avec succès !', 'Fermer', { duration: 3000 });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors de la soumission du quiz', 'Fermer', { duration: 3000 });
      }
    });
  }
}
