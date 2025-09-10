import { Component } from '@angular/core';
import { Projects as ProjectInterface } from '../../interfaces/projects.interface';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  hoveredIndex: number = -1;
  projects: ProjectInterface[] = PROJECTS;
  selectedProject: ProjectInterface | null = null;
  selectedIndex: number | null = null;

  getImageTop(index: number): string {
    const percentages = [0, 10, 20];
    return percentages[index] + '%';
  }

  openProject(project: ProjectInterface, index: number) {
    this.selectedProject = project;
    this.selectedIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeProject() {
    this.selectedProject = null;
    this.selectedIndex = null;
    document.body.style.overflow = '';
  }

  goToNextProject() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = (this.selectedIndex + 1) % this.projects.length;
      this.selectedProject = this.projects[this.selectedIndex];
    }
  }

  goToPreviousProject() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = this.selectedIndex === 0 ? this.projects.length - 1 : this.selectedIndex - 1;
      this.selectedProject = this.projects[this.selectedIndex];
    }
  }
}
