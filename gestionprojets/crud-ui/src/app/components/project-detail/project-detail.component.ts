import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../project.service';
import { AiAnalysisResult, ProjectItem } from '../../project.models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectItem | null = null;
  aiScore: AiAnalysisResult | null = null;
  loading = true;
  analyzing = false;
  error = '';

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
    }
  }

  loadData(id: string): void {
    this.loading = true;
    this.projectService.getById(id).subscribe({
      next: (proj) => {
        this.project = proj;
        this.fetchScore(id);
      },
      error: () => {
        this.error = 'Failed to load project details.';
        this.loading = false;
      }
    });
  }

  fetchScore(id: string): void {
    this.projectService.getAiScore(id).subscribe({
      next: (score) => {
        this.aiScore = score;
        this.loading = false;
      },
      error: () => {
        // Just show project, AI score might be unavailable
        this.loading = false;
      }
    });
  }

  reanalyze(): void {
    if (!this.project?.id) return;
    this.analyzing = true;
    this.projectService.reanalyze(this.project.id, 'manager-1').subscribe({
      next: (updated) => {
        this.project = updated;
        this.fetchScore(updated.id!);
        this.analyzing = false;
      },
      error: (err) => {
        this.error = 'Re-analysis failed: ' + (err.error?.message || err.message);
        this.analyzing = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  getScoreColor(score?: number): string {
    if (score == null) return '#94a3b8';
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  getPlagiarismColor(status?: string): string {
    if (status === 'REJECTED') return '#ef4444';
    if (status === 'FLAGGED') return '#f59e0b';
    return '#10b981';
  }
}
