import { Projects } from '@interfaces/projects.interface';

/**
 * Featured portfolio projects data.
 *
 * Contains all projects to be displayed in the portfolio showcase section.
 * Each project includes name, description, technologies, images, and optional links.
 *
 * @remarks
 * This data is imported and used by the Projects component to render the project grid
 * and project detail modals. Projects are displayed in the order they appear in this array.
 */
export const PROJECTS: Projects[] = [
  {
    nameKey: 'Join',
    descriptionKey: 'projects.join.description',
    tech: [
      { tech: 'Angular', image: '/designs/images/languages/angular.svg' },
      { tech: 'TypeScript', image: '/designs/images/languages/type_script.svg' },
      { tech: 'HTML', image: '/designs/images/languages/html.svg' },
      { tech: 'CSS', image: '/designs/images/languages/stylesheet.svg' },
      { tech: 'Firebase', image: '/designs/images/languages/firebase.svg' }
    ],
    image: '/designs/images/featured_projects/join.svg',
    github: 'https://github.com/Ph1L-s/Join-Project',
    liveTest: 'https://phils-web.site/join/index.html'
  },
  {
    nameKey: 'El Pollo Loco',
    descriptionKey: 'projects.polloLoco.description',
    tech: [
      { tech: 'HTML', image: '/designs/images/languages/html.svg' },
      { tech: 'CSS', image: '/designs/images/languages/stylesheet.svg' },
      { tech: 'JavaScript', image: '/designs/images/languages/java_script.svg' }
    ],
    image: '/designs/images/featured_projects/pollo.svg',
    github: 'https://github.com/Ph1L-s/Pollo-Loco',
    liveTest: 'https://phils-web.site/epl/index.html'
  },
  {
    nameKey: 'DA Bubble',
    descriptionKey: 'projects.daBubble.description',
    tech: [
      { tech: 'Angular', image: '/designs/images/languages/angular.svg' },
      { tech: 'Firebase', image: '/designs/images/languages/firebase.svg' },
      { tech: 'TypeScript', image: '/designs/images/languages/type_script.svg' }
    ],
    image: '/designs/images/featured_projects/da_bubble.svg',
    github: 'https://github.com/Ph1L-s',
    liveTest: 'https://phils-web.site/dabubble/'
  }
];