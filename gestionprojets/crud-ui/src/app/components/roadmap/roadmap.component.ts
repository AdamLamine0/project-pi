import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { CreateRoadmapStepPayload, ProjectItem, RoadmapStepItem } from '../../project.models';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {
  project: ProjectItem | null = null;
  loading = true;
  generating = false;
  error = '';
  
  newStep: CreateRoadmapStepPayload = { titre: '', description: '', ordre: 1, statut: 'PENDING' };
  showAddForm = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(id);
    }
  }

  loadProject(id: string): void {
    this.loading = true;
    this.projectService.getById(id).subscribe({
      next: (proj) => {
        this.project = proj;
        this.newStep.ordre = (this.project.roadmapSteps?.length || 0) + 1;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load project.';
        this.loading = false;
      }
    });
  }

  generateAiRoadmap(): void {
    if (!this.project?.id) return;
    if (!confirm('This will wipe existing steps and generate a new AI roadmap based on the project category and timeline. Proceed?')) return;
    
    this.generating = true;
    this.projectService.generateRoadmap(this.project.id, 'manager-1').subscribe({
      next: (updated) => {
        this.project = updated;
        this.newStep.ordre = (this.project.roadmapSteps?.length || 0) + 1;
        this.generating = false;
      },
      error: () => this.generating = false
    });
  }

  addStep(): void {
    if (!this.project?.id || !this.newStep.titre) return;
    
    this.projectService.addRoadmapStep(this.project.id, this.newStep, 'manager-1').subscribe({
      next: (updated) => {
        this.project = updated;
        this.showAddForm = false;
        this.newStep = { titre: '', description: '', ordre: (this.project.roadmapSteps?.length || 0) + 1, statut: 'PENDING' };
      }
    });
  }

  updateStatus(step: RoadmapStepItem, status: string): void {
    if (!this.project?.id || !step.id) return;
    this.projectService.updateRoadmapStepStatus(this.project.id, step.id, status, 'manager-1').subscribe({
      next: (updated) => {
        this.project = updated;
      }
    });
  }

  deleteStep(step: RoadmapStepItem): void {
    if (!this.project?.id || !step.id) return;
    if (confirm('Delete this step?')) {
      this.projectService.deleteRoadmapStep(this.project.id, step.id, 'manager-1').subscribe({
        next: (updated) => {
          this.project = updated;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
