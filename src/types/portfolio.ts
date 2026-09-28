export interface PortfolioData {
  meta: {
    author: string;
    domain: string;
    githubUrl: string;
    linkedinUrl: string;
    email: string;
    status: string;
    location: string;
    year: number;
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    ctaProjects: string;
    ctaGithub: string;
    systemStatus: string;
    terminal: {
      userHost: string;
      terminalInfo: string;
      whoami: string;
      focusItems: string[];
      uptimeFocus: string;
      currentStatus: string;
    };
  };
  sentinel: {
    title: string;
    node: string;
    renderEngine: string;
    interaction: string;
    fps: string;
    ticks: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
      bottomRight: string;
    };
    subsystemStatus: string;
    chassis: string;
    telemetry: string;
  };
  about: {
    sectionNumber: string;
    sectionTitle: string;
    fileTag: string;
    paragraphs: string[];
    corePrinciple: {
      label: string;
      title: string;
      description: string;
      location: string;
      status: string;
    };
    evolutionVector: Array<{
      id: string;
      title: string;
      detail: string;
      active: boolean;
    }>;
  };
  currentFocus: {
    sectionNumber: string;
    sectionTitle: string;
    badge: string;
    modules: Array<{
      id: string;
      title: string;
      status: string;
      statusType: 'tertiary' | 'secondary' | 'primary' | string;
      description: string;
      tags: string[];
    }>;
  };
  projects: {
    sectionNumber: string;
    sectionTitle: string;
    badge: string;
    featured: Array<{
      id: string;
      category: string;
      tag: string;
      title: string;
      description: string;
      tags: string[];
      repoUrl: string;
      type: 'cognitive-loop' | 'vector-graph' | 'pipeline' | string;
      diagram: any;
    }>;
    compact: Array<{
      id: string;
      category: string;
      tag: string;
      title: string;
      description: string;
      tags: string[];
      footerStatus: string;
      repoUrl: string;
    }>;
  };
  experience?: {
    sectionNumber: string;
    sectionTitle: string;
    tag: string;
    summary?: string;
    items: Array<{
      id: string;
      role: string;
      company: string;
      companyUrl?: string;
      location: string;
      type: string;
      period: string;
      status: string;
      description: string;
      achievements?: string[];
      technologies: string[];
    }>;
  };
  principles: {
    sectionNumber: string;
    sectionTitle: string;
    tag: string;
    headline: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      tag: string;
    }>;
  };
  stack: {
    sectionNumber: string;
    sectionTitle: string;
    tag: string;
    groups: Array<{
      name: string;
      icon: string;
      isWide: boolean;
      items: string[];
    }>;
  };
  research: {
    sectionNumber: string;
    sectionTitle: string;
    tag: string;
    specimenTag: string;
    specimenTitle: string;
    specimenStatus: string;
    hypotheses: Array<{
      num: string;
      question: string;
      answer: string;
    }>;
    schematic: {
      title: string;
      status: string;
      flow: string[];
    };
    disclaimer: string;
  };
  repositories: {
    sectionNumber: string;
    sectionTitle: string;
    tag: string;
    list: Array<{
      name: string;
      visibility: string;
      status: string;
      description: string;
      language: string;
      languageColor: string;
      updated: string;
      url: string;
    }>;
  };
  contact: {
    sectionNumber: string;
    sectionTitle: string;
    tag: string;
    heading: string;
    description: string;
    emailLabel: string;
    email: string;
    links: Array<{
      name: string;
      icon: string;
      url: string;
    }>;
  };
  footer: {
    copyright: string;
  };
}
