import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project.service';
import { CreateProjectPayload, UpdateProjectPayload } from '../../project.models';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  isEdit = false;
  projectId: string | null = null;
  loading = false;
  submitting = false;
  error = '';
  
  // Create state
  createForm: CreateProjectPayload = this.defaultForm();
  memberIdsInput = '';

  // AI Validation specific
  plagiarismError = '';
  validationErrors: string[] = [];

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectId = id;
      this.loadProject(id);
    }
  }

  loadProject(id: string): void {
    this.loading = true;
    this.projectService.getById(id).subscribe({
      next: (data) => {
        this.createForm = {
          titre: data.titre,
          description: data.description,
          dateDebut: data.dateDebut,
          dateFin: data.dateFin,
          budget: data.budget,
          managerId: data.managerId,
          memberIds: data.memberIds || [],
          priorite: data.priorite || 'MEDIUM',
          categorie: data.categorie || 'General'
        };
        this.memberIdsInput = (data.memberIds || []).join(', ');
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load project.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    this.error = '';
    this.plagiarismError = '';
    this.validationErrors = [];
    this.createForm.memberIds = this.parseMembers(this.memberIdsInput);

    if (!this.createForm.titre || !this.createForm.description || !this.createForm.dateDebut || !this.createForm.dateFin || !this.createForm.managerId) {
      this.error = 'Please fill out all required fields marked with *.';
      return;
    }
    if (this.createForm.dateFin < this.createForm.dateDebut) {
      this.error = 'End date cannot be before start date.';
      return;
    }

    this.submitting = true;

    if (this.isEdit && this.projectId) {
      const payload: UpdateProjectPayload = {
        titre: this.createForm.titre,
        description: this.createForm.description,
        dateDebut: this.createForm.dateDebut,
        dateFin: this.createForm.dateFin,
        budget: this.createForm.budget,
        memberIds: this.createForm.memberIds,
        priorite: this.createForm.priorite,
        categorie: this.createForm.categorie
      };
      
      this.projectService.update(this.projectId, payload, this.createForm.managerId).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/projects', this.projectId]);
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.projectService.create(this.createForm).subscribe({
        next: (created) => {
          this.submitting = false;
          this.router.navigate(['/projects', created.id]);
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  handleError(err: any): void {
    this.submitting = false;
    const msg = err.error?.message || err.message || 'Unknown error occurred.';
    
    if (msg.includes('Plagiarism detected')) {
      this.plagiarismError = msg;
    } else if (msg.includes('AI Validation failed')) {
      this.validationErrors = msg.replace('AI Validation failed:', '').split(';').map((s: string) => s.trim());
    } else {
      this.error = msg;
    }
  }

  goBack(): void {
    this.location.back();
  }

  private parseMembers(val: string): string[] {
    return val.split(',').map(x => x.trim()).filter(Boolean);
  }

  private defaultForm(): CreateProjectPayload {
    return {
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      budget: 1000,
      managerId: 'manager-1',
      memberIds: [],
      priorite: 'MEDIUM',
      categorie: 'General'
    };
  }
}
