import { Component, Input } from '@angular/core';
import { TeamMember } from '../../../../models/project';

@Component({
  selector: 'app-team-member-list',
  standalone: false,
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css']
})
export class TeamMemberListComponent {
  @Input() teamMembers: TeamMember[] = [];

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getAvatarColor(name: string): string {
    const colors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-secondary'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
