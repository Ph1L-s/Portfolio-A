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
    descriptionKey: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
    tech: [
      { tech: 'Angular', image: '/designs/Images/languages/angular.svg' },
      { tech: 'TypeScript', image: '/designs/Images/languages/type_script.svg' },
      { tech: 'HTML', image: '/designs/Images/languages/html.svg' },
      { tech: 'CSS', image: '/designs/Images/languages/stylesheet.svg' },
      { tech: 'Firebase', image: '/designs/Images/languages/firebase.svg' }
    ],
    image: '/designs/Images/featured_projects/join.svg',
    github: 'https://github.com/Ph1L-s/Join-Project',
    liveTest: 'https://www.04-25-aw-join-1.developerakademie.net/angular-projects/join/login'
  },
  {
    nameKey: 'El Pollo Loco',
    descriptionKey: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
    tech: [
      { tech: 'HTML', image: '/designs/Images/languages/html.svg' },
      { tech: 'CSS', image: '/designs/Images/languages/stylesheet.svg' },
      { tech: 'JavaScript', image: '/designs/Images/languages/java_script.svg' }
    ],
    image: '/designs/Images/featured_projects/pollo.svg',
    github: 'https://github.com/Ph1L-s/Pollo-Loco',
    liveTest: 'https://phillip-schulze.developerakademie.net/module%2012/EPL/index.html'
  },
  {
    nameKey: 'DA Bubble',
    descriptionKey: 'Slack-inspired chat application with real-time messaging, channels, and direct messages. Built with Angular and Firebase.',
    tech: [
      { tech: 'Angular', image: '/designs/Images/languages/angular.svg' },
      { tech: 'Firebase', image: '/designs/Images/languages/firebase.svg' },
      { tech: 'TypeScript', image: '/designs/Images/languages/type_script.svg' }
    ],
    image: '/designs/Images/featured_projects/da_bubble.svg',
    github: 'https://github.com/Ph1L-s',
    liveTest: 'https://da-bubble-demo.com'
  }
];