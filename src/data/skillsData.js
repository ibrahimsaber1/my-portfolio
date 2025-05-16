export const skillsData = {
  languages: [
    { name: 'Python', level: 90, icon: 'FaPython' },
    { name: 'JavaScript', level: 85, icon: 'FaJs' },
    { name: 'TypeScript', level: 75, icon: 'SiTypescript' },
    { name: 'HTML/CSS', level: 90, icon: 'FaHtml5' },
    { name: 'Bash', level: 70, icon: 'SiGnubash' },
    { name: 'SQL', level: 80, icon: 'SiMysql' }
  ],
  frontend: [
    { name: 'React.js', level: 85, icon: 'FaReact' },
    { name: 'Bootstrap', level: 85, icon: 'FaBootstrap' },
    { name: 'Tailwind CSS', level: 80, icon: 'SiTailwindcss' },
    { name: 'Material-UI', level: 75, icon: 'SiMui' },
    { name: 'HTML5', level: 90, icon: 'FaHtml5' },
    { name: 'CSS3', level: 90, icon: 'FaCss3Alt' }
  ],
  backend: [
    { name: 'Django', level: 90, icon: 'SiDjango' },
    { name: 'Flask', level: 85, icon: 'SiFlask' },
    { name: 'FastAPI', level: 80, icon: 'SiFastapi' },
    { name: 'Node.js', level: 80, icon: 'FaNodeJs' },
    { name: 'Express.js', level: 75, icon: 'SiExpress' },
    { name: 'Odoo', level: 70, icon: 'SiOdoo' }
  ],
  databases: [
    { name: 'PostgreSQL', level: 85, icon: 'SiPostgresql' },
    { name: 'MySQL', level: 85, icon: 'SiMysql' },
    { name: 'MongoDB', level: 80, icon: 'SiMongodb' },
    { name: 'SQLite', level: 75, icon: 'SiSqlite' },
    { name: 'Redis', level: 70, icon: 'SiRedis' }
  ],
  dataScience: [
    { name: 'Pandas', level: 85, icon: 'SiPandas' },
    { name: 'NumPy', level: 80, icon: 'SiNumpy' },
    { name: 'Matplotlib', level: 75, icon: 'SiPython' },
    { name: 'Seaborn', level: 75, icon: 'SiPython' },
    { name: 'Scikit-learn', level: 70, icon: 'SiScikit' },
    { name: 'Jupyter', level: 85, icon: 'SiJupyter' }
  ],
  dataAnalysis: [
    { name: 'Excel', level: 85, icon: 'SiMicrosoftexcel' },
    { name: 'Power BI', level: 80, icon: 'SiPowerbi' },
    { name: 'Power Query', level: 75, icon: 'SiMicrosoftoffice' },
    { name: 'Tableau', level: 80, icon: 'SiTableau' },
    { name: 'Looker', level: 70, icon: 'SiLooker' },
    { name: 'SQL Analytics', level: 85, icon: 'SiMysql' }
  ],
  tools: [
    { name: 'Git', level: 90, icon: 'FaGit' },
    { name: 'Docker', level: 75, icon: 'FaDocker' },
    { name: 'Linux', level: 85, icon: 'FaLinux' },
    { name: 'AWS', level: 70, icon: 'FaAws' },
    { name: 'VS Code', level: 90, icon: 'SiVisualstudiocode' },
    { name: 'Jupyter', level: 85, icon: 'SiJupyter' }
  ],
  vfx: [
    { name: 'OpenTimelineIO', level: 85, icon: 'SiOpenminded' },
    { name: 'OpenColorIO', level: 80, icon: 'SiOpensource' },
    { name: 'OpenPype', level: 85, icon: 'SiOpenpype' },
    { name: 'PySide2/PyQt', level: 85, icon: 'SiQt' },
    { name: 'Kitsu', level: 80, icon: 'SiKitsu' },
    { name: 'Maya/Houdini APIs', level: 75, icon: 'SiAutodesk' }
  ]
};

// Additional skills metadata
export const skillsMetadata = {
  categories: {
    languages: {
      title: 'Programming Languages',
      description: 'Core programming languages I work with daily'
    },
    frontend: {
      title: 'Frontend Development',
      description: 'Modern web technologies for building user interfaces'
    },
    backend: {
      title: 'Backend Development',
      description: 'Server-side frameworks and technologies'
    },
    databases: {
      title: 'Databases',
      description: 'SQL and NoSQL database systems'
    },
    dataScience: {
      title: 'Data Science',
      description: 'Libraries and tools for data science and machine learning'
    },
    dataAnalysis: {
      title: 'Data Analysis',
      description: 'Tools and technologies for data analytics and visualization'
    },
    tools: {
      title: 'Tools & DevOps',
      description: 'Development tools and deployment technologies'
    },
    vfx: {
      title: 'VFX & Pipeline',
      description: 'APIs and tools for VFX pipeline development'
    }
  }
};

// Helper function to get skills by category
export const getSkillsByCategory = (category) => {
  return skillsData[category] || [];
};

// Helper function to get all skills flattened
export const getAllSkills = () => {
  return Object.values(skillsData).flat();
};

// Helper function to get top skills
export const getTopSkills = (limit = 6) => {
  const allSkills = getAllSkills();
  return allSkills.sort((a, b) => b.level - a.level).slice(0, limit);
};