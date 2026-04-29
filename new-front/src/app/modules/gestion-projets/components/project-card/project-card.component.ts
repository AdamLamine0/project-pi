import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project, ProjectStatus } from '../../../../models/project';

@Component({
  selector: 'app-project-card',
  standalone: false,
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() view = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  getStatusColor(status: ProjectStatus): string {
    const colors: Record<ProjectStatus, string> = {
      'BROUILLON': 'secondary',
      'EN_COURS': 'info',
      'EN_ATTENTE': 'warning',
      'TERMINE': 'success',
      'ANNULE': 'danger'
    };
    return colors[status] || 'secondary';
  }

  getPriorityIcon(priority: string): string {
    const icons: Record<string, string> = {
      'BASSE': 'arrow-down',
      'NORMALE': 'dash',
      'HAUTE': 'arrow-up',
      'CRITIQUE': 'exclamation-circle'
    };
    return icons[priority] || 'dash';
  }

  onView(): void {
    this.view.emit(this.project.id);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.project.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.project.id);
  }
}
