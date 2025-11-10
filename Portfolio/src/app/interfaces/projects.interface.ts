/**
 * Represents a technology used in a project.
 *
 * Contains the technology name and path to its icon image.
 */
export interface ProjectTech {
  /**
   * Name of the technology (e.g., 'Angular', 'TypeScript', 'Firebase')
   */
  tech: string;

  /**
   * Relative path to the technology icon image
   */
  image: string;
}

/**
 * Represents a portfolio project with all its metadata.
 *
 * Used to display featured projects in the portfolio showcase section
 * with support for internationalization via nameKey and descriptionKey.
 */
export interface Projects {
  /**
   * Translation key for the project name.
   * Used for internationalization support (i18n).
   */
  nameKey: string;

  /**
   * Translation key or direct text for the project description.
   * Provides a brief overview of the project's purpose and features.
   */
  descriptionKey: string;

  /**
   * Array of technologies used in the project.
   * Each technology includes its name and icon path.
   */
  tech: ProjectTech[];

  /**
   * Relative path to the project preview/thumbnail image.
   * Displayed in the project grid and modal.
   */
  image: string;

  /**
   * Optional GitHub repository URL for the project.
   * When provided, a GitHub link button will be displayed.
   */
  github?: string;

  /**
   * Optional live demo URL for the project.
   * When provided, a "Live Test" link button will be displayed.
   */
  liveTest?: string;
}