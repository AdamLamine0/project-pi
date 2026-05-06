import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, ProjectPriority } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() projectId!: number;
  @Input() task?: Task;

  taskForm!: FormGroup;
  submitting = false;

  statusOptions = ['A_FAIRE', 'EN_COURS', 'FAIT', 'BLOQUE'];
  priorityOptions: ProjectPriority[] = ['BASSE', 'NORMALE', 'HAUTE', 'CRITIQUE'];

  constructor(
    private fb: FormBuilder,
    private projectService: GestionProjetsService
  ) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: ['A_FAIRE', Validators.required],
      priority: ['NORMALE', Validators.required],
      assignedToId: ['', Validators.required],
      dueDate: ['', Validators.required]
    });

    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        priority: this.task.priority,
        assignedToId: this.task.assignedToId,
        dueDate: this.task.dueDate
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.submitting = true;
    const taskData: Task = {
      id: this.task?.id || 0,
      projectId: this.projectId,
      ...this.taskForm.value,
      createdAt: this.task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const isEditMode = !!this.task?.id;
    const operation = isEditMode
      ? this.projectService.updateTask(this.projectId, this.task!.id!, taskData)
      : this.projectService.createTask(this.projectId, taskData);

    operation.subscribe({
      next: () => {
        this.submitting = false;
        this.taskForm.reset();
        this.initializeForm();
      },
      error: (error) => {
        console.error('Error saving task:', error);
        this.submitting = false;
      }
    });
  }
}
