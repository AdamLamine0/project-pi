import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { ProjectDocumentItem, ProjectItem } from '../../project.models';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  project: ProjectItem | null = null;
  loading = true;
  uploading = false;
  error = '';
  
  docType = 'REQUIREMENTS';
  docTitle = '';
  selectedFile: File | null = null;
  
  @ViewChild('fileInput') fileInput!: ElementRef;

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
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load project.';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      if (!this.docTitle) {
        this.docTitle = file.name.split('.')[0];
      }
    }
  }

  upload(): void {
    if (!this.project?.id || !this.selectedFile) return;
    
    this.uploading = true;
    this.projectService.uploadDocument(this.project.id, this.selectedFile, this.docType, this.docTitle, 'manager-1').subscribe({
      next: (updated) => {
        this.project = updated;
        this.uploading = false;
        this.selectedFile = null;
        this.docTitle = '';
        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: (err) => {
        this.error = 'Upload failed.';
        this.uploading = false;
      }
    });
  }

  deleteDoc(doc: ProjectDocumentItem): void {
    if (!this.project?.id) return;
    if (confirm('Delete this document?')) {
      this.projectService.deleteDocument(this.project.id, doc.id, 'manager-1').subscribe({
        next: (updated) => {
          this.project = updated;
        }
      });
    }
  }

  downloadDoc(doc: ProjectDocumentItem): void {
    if (!this.project?.id) return;
    this.projectService.downloadDocument(this.project.id, doc.id, 'manager-1').subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  goBack(): void {
    this.location.back();
  }

  getDocIcon(type: string): string {
    switch(type) {
      case 'REQUIREMENTS': return '📋';
      case 'ARCHITECTURE': return '🏗️';
      case 'BUSINESS_PLAN': return '💼';
      case 'FINANCIAL': return '💰';
      case 'DESIGN': return '🎨';
      default: return '📄';
    }
  }
}
