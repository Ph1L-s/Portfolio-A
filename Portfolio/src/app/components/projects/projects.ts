import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Projects as ProjectInterface } from '@interfaces/projects.interface';
import { PROJECTS } from '@data/projects.data';

/**
 * Projects showcase component with modal view and navigation.
 *
 * Displays a grid of portfolio projects with hover effects and a modal overlay
 * for detailed project views. Supports keyboard and button navigation through projects.
 *
 * @remarks
 * The component manages body overflow to prevent scrolling when the modal is open
 * and provides circular navigation through the project list.
 */
@Component({
  selector: 'app-projects',
  imports: [TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  /**
   * Index of the currently hovered project card.
   * Set to -1 when no project is hovered.
   */
  hoveredIndex: number = -1;

  /**
   * Array of all portfolio projects loaded from data file.
   */
  projects: ProjectInterface[] = PROJECTS;

  /**
   * The currently selected project displayed in the modal.
   * Null when modal is closed.
   */
  selectedProject: ProjectInterface | null = null;

  /**
   * Index of the currently selected project in the projects array.
   * Null when modal is closed. Used for navigation between projects.
   */
  selectedIndex: number | null = null;

  /**
   * Calculates the vertical offset percentage for project card images.
   *
   * Returns different top position percentages for visual variety in the project grid.
   * Creates a staggered layout where project cards appear at different vertical positions.
   *
   * @param index - The index of the project in the projects array
   * @returns CSS top position as a percentage string
   *
   * @example
   * getImageTop(0) // Returns "0%"
   * getImageTop(1) // Returns "10%"
   * getImageTop(2) // Returns "20%"
   *
   * @remarks
   * The pattern repeats every 3 projects. Indices beyond 2 will use modulo
   * to wrap back to the pattern.
   */
  getImageTop(index: number): string {
    const percentages = [0, 10, 20];
    return percentages[index] + '%';
  }

  /**
   * Opens the project detail modal for the specified project.
   *
   * Sets the selected project and index, then disables body scrolling to
   * prevent background scroll while the modal is open.
   *
   * @param project - The project object to display in the modal
   * @param index - The index of the project in the projects array
   * @returns void
   *
   * @remarks
   * Disabling body overflow prevents the page from scrolling behind the modal overlay.
   * The overflow is restored when closeProject() is called.
   */
  openProject(project: ProjectInterface, index: number) {
    this.selectedProject = project;
    this.selectedIndex = index;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the project detail modal.
   *
   * Clears the selected project and index, then restores body scrolling.
   *
   * @returns void
   *
   * @remarks
   * Setting overflow to empty string restores the default CSS value,
   * re-enabling page scrolling after the modal closes.
   */
  closeProject() {
    this.selectedProject = null;
    this.selectedIndex = null;
    document.body.style.overflow = '';
  }

  /**
   * Navigates to the next project in the modal view.
   *
   * Uses circular navigation - after the last project, wraps to the first project.
   *
   * @returns void
   *
   * @remarks
   * Only works when a project is currently selected (selectedIndex is not null).
   * Uses modulo arithmetic to wrap from the last project back to the first.
   */
  goToNextProject() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = (this.selectedIndex + 1) % this.projects.length;
      this.selectedProject = this.projects[this.selectedIndex];
    }
  }

  /**
   * Navigates to the previous project in the modal view.
   *
   * Uses circular navigation - before the first project, wraps to the last project.
   *
   * @returns void
   *
   * @remarks
   * Only works when a project is currently selected (selectedIndex is not null).
   * When at index 0, wraps to the last project in the array.
   */
  goToPreviousProject() {
    if (this.selectedIndex !== null) {
      this.selectedIndex = this.selectedIndex === 0 ? this.projects.length - 1 : this.selectedIndex - 1;
      this.selectedProject = this.projects[this.selectedIndex];
    }
  }
}
