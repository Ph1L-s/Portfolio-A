export interface ProjectTech {
  tech: string;
  image: string;
}

export interface Projects {
  nameKey: string;
  descriptionKey: string;
  tech: ProjectTech[];
  image: string;
  github?: string;
  liveTest?: string;
}