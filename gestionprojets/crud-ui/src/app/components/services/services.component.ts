import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../project.service';
import { AdminServiceInstance } from '../../project.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: AdminServiceInstance[] = [];
  loading = true;
  error = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.projectService.getDiscoveredServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch services. Ensure Eureka Server is running.';
        this.loading = false;
      }
    });
  }

  refresh(): void {
    this.loading = true;
    this.loadServices();
  }
}
