import { Projects } from '../interfaces/projects.interface';

export const PROJECTS: Projects[] = [
  {
    nameKey: 'Join',
    descriptionKey: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
    tech: [
      { tech: 'Angular', image: 'designs/images/languages/angular.svg' },
      { tech: 'TypeScript', image: 'designs/images/languages/type_script.svg' },
      { tech: 'HTML', image: 'designs/images/languages/html.svg' },
      { tech: 'CSS', image: 'designs/images/languages/css.svg' },
      { tech: 'Firebase', image: 'designs/images/languages/firebase.svg' }
    ],
    image: 'designs/images/featured_projects/join.svg',
    github: 'https://github.com/Ph1L-s',
    liveTest: 'https://join-demo.com'
  },
  {
    nameKey: 'El Pollo Loco',
    descriptionKey: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
    tech: [
      { tech: 'HTML', image: 'designs/images/languages/html.svg' },
      { tech: 'CSS', image: 'designs/images/languages/css.svg' },
      { tech: 'JavaScript', image: 'designs/images/languages/java_script.svg' }
    ],
    image: 'designs/images/featured_projects/pollo.svg',
    github: 'https://github.com/Ph1L-s',
    liveTest: 'https://pollo-loco-demo.com'
  },
  {
    nameKey: 'DA Bubble',
    descriptionKey: 'Slack-inspired chat application with real-time messaging, channels, and direct messages. Built with Angular and Firebase.',
    tech: [
      { tech: 'Angular', image: 'designs/images/languages/angular.svg' },
      { tech: 'Firebase', image: 'designs/images/languages/firebase.svg' },
      { tech: 'TypeScript', image: 'designs/images/languages/type_script.svg' }
    ],
    image: 'designs/images/featured_projects/da_bubble.svg',
    github: 'https://github.com/Ph1L-s',
    liveTest: 'https://da-bubble-demo.com'
  }
];