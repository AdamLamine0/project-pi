import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../models/project';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() statusChange = new EventEmitter<{ task: Task; status: Task['status'] }>();

  readonly statusOptions: Task['status'][] = ['A_FAIRE', 'EN_COURS', 'FAIT', 'BLOQUE'];

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'A_FAIRE': 'secondary',
      'EN_COURS': 'info',
      'FAIT': 'success',
      'BLOQUE': 'danger'
    };
    return colors[status] || 'secondary';
  }

  getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
      'BASSE': 'info',
      'NORMALE': 'secondary',
      'HAUTE': 'warning',
      'CRITIQUE': 'danger'
    };
    return colors[priority] || 'secondary';
  }

  getRemainingDays(dueDate?: string): number {
    if (!dueDate) {
      return 0;
    }
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  isOverdue(dueDate?: string): boolean {
    if (!dueDate) {
      return false;
    }
    return new Date(dueDate) < new Date();
  }

  onStatusChange(task: Task, status: string): void {
    this.statusChange.emit({ task, status: status as Task['status'] });
  }
}
