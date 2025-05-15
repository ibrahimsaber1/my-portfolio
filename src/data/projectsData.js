export const projectsData = [
    {
      id: 'iti-airbnb',
      title: 'ITI-GP-AIRBNB',
      category: 'fullstack',
      description: 'A robust Django-based backend system for an Airbnb-like application with RESTful APIs for managing user accounts, property listings, reservations, real-time chats, and reviews.',
      image: '/images/projects/airbnb.jpg',
      technologies: [
        'Django',
        'Django REST Framework',
        'Django Channels',
        'PostgreSQL',
        'Cloudinary',
        'WebSockets',
        'Swagger'
      ],
      features: [
        'User Authentication and Registration',
        'Property Listings Management',
        'Real-time Chat Functionality',
        'Reviews and Ratings System',
        'Payment Integration',
        'Admin Dashboard'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/KhalidHamdi/ITI-GP-AIRBNB-BACKEND',
      date: '2024',
      team: true,
      teamSize: 5
    },
    {
      id: 'amazon-sales-analysis',
      title: 'Amazon Sales Analysis',
      category: 'dataScience',
      description: 'Comprehensive data analysis project featuring data cleaning, exploratory analysis, and interactive Streamlit dashboard for Amazon India sales data.',
      image: '/images/projects/amazon-sales.jpg',
      technologies: [
        'Python',
        'Pandas',
        'NumPy',
        'Plotly',
        'Streamlit',
        'BeautifulSoup'
      ],
      features: [
        'ETL operations on 120K+ records',
        'Real-time filtering',
        'Multi-page responsive dashboard',
        'Data visualization with Plotly',
        'Category and geographic analysis'
      ],
      liveUrl: 'https://amazon-sales-analysis-in-india.streamlit.app/',
      githubUrl: 'https://github.com/ibrahimsaber1/Amazon-Sales-Analysis',
      date: '2024',
      team: false
    },
    {
      id: 'good-reads',
      title: 'Good Reads - MERN Stack',
      category: 'fullstack',
      description: 'A bookstore website that allows users to find their favorite books, add them to their shelf, and mark them as read or to be read later.',
      image: '/images/projects/goodreads.jpg',
      technologies: [
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Tailwind CSS',
        'JWT Authentication'
      ],
      features: [
        'User Authentication',
        'Book Management',
        'Category Browsing',
        'Author Profiles',
        'Rating and Review System',
        'Admin CRUD Operations'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ahmedabougabal/mernStackMilestoneProject_ITI',
      date: '2024',
      team: true,
      teamSize: 4
    },
    {
      id: 'dbms-bash-script',
      title: 'DBMS Bash Script',
      category: 'python',
      description: 'A CLI-based Database Management System implemented using Bash scripting. Provides functionality to create, manage, and manipulate databases and tables.',
      image: '/images/projects/dbms-bash.jpg',
      technologies: [
        'Bash Script',
        'Linux',
        'Shell Programming'
      ],
      features: [
        'Create/Drop Databases',
        'Create/Drop Tables',
        'Insert/Select/Delete Operations',
        'Update Records',
        'Primary Key Constraints',
        'Data Type Validation'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/DBMS-BASH-SCRIPT-ITI',
      date: '2024',
      team: true,
      teamSize: 2
    },
    {
      id: 'book-management-flask',
      title: 'Book Management System',
      category: 'fullstack',
      description: 'Flask-based web application where users can manage book collections, with features like login, book management, image uploads, and an admin panel.',
      image: '/images/projects/book-management.jpg',
      technologies: [
        'Flask',
        'Python',
        'Flask-SQLAlchemy',
        'Werkzeug',
        'Bootstrap'
      ],
      features: [
        'User Authentication',
        'Book CRUD Operations',
        'Image Upload',
        'Admin Dashboard',
        'User Management',
        'Responsive Design'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/BOOKS-MANAGER-FLASK-MVT',
      date: '2024',
      team: false
    },
    {
      id: 'covid-data-analysis',
      title: 'COVID-19 Data Analysis',
      category: 'dataScience',
      description: 'SQL-based analysis of COVID-19 data, focusing on cases, deaths, infection rates, and vaccinations across various regions.',
      image: '/images/projects/covid-analysis.jpg',
      technologies: [
        'SQL',
        'MySQL',
        'Data Analysis',
        'CTEs',
        'Views'
      ],
      features: [
        'Death percentage analysis',
        'Infection rate calculations',
        'Vaccination vs Population',
        'Continental breakdowns',
        'Time-series analysis'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/COVID-19-Data-Analysis',
      date: '2024',
      team: false
    },
    {
      id: 'crm-system',
      title: 'CRM System',
      category: 'fullstack',
      description: 'Comprehensive CRM application built using Django with CRUD operations, user authentication, and API support.',
      image: '/images/projects/crm.jpg',
      technologies: [
        'Django',
        'Python',
        'MySQL',
        'Bootstrap',
        'Django REST Framework'
      ],
      features: [
        'User Authentication',
        'CRUD Operations',
        'Real-time Updates',
        'API Integration',
        'Responsive UI',
        'Customer Management'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/crm-system',
      date: '2023',
      team: false
    },
    {
      id: 'maya-mcp',
      title: 'Maya MCP',
      category: 'vfx',
      description: 'Model Context Protocol (MCP) server implementation for Autodesk Maya, enabling AI assistant clients to control Maya through natural language.',
      image: '/images/projects/maya-mcp.jpg',
      technologies: [
        'Python',
        'Maya API',
        'MCP Protocol',
        'JSON-RPC',
        'MEL Scripting'
      ],
      features: [
        'AI-controlled Maya operations',
        'Natural language processing',
        'Dynamic tool registration',
        'Object creation and manipulation',
        'Scene management',
        'Material assignment'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/MayaMCP',
      date: '2024',
      team: false
    },
    {
      id: 'smartwatch-tracker',
      title: 'Smartwatch Workout Tracker',
      category: 'python',
      description: 'Python simulation of how a smartwatch tracks and logs various workouts like running, swimming, and general activities.',
      image: '/images/projects/smartwatch.jpg',
      technologies: [
        'Python',
        'OOP',
        'Datetime',
        'GPS Calculations'
      ],
      features: [
        'Workout tracking',
        'Calorie calculations',
        'GPS route tracking',
        'Elevation tracking',
        'Swimming pace calculation',
        'OOP design patterns'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/Smartwatch-Tracker',
      date: '2024',
      team: false
    },
    {
      id: 'seattle-real-estate',
      title: 'Seattle Real Estate Analysis',
      category: 'dataScience',
      description: 'SQL scripts for cleaning and preprocessing Seattle real estate dataset with Tableau visualizations for market insights.',
      image: '/images/projects/seattle-real-estate.jpg',
      technologies: [
        'SQL',
        'Tableau',
        'Data Cleaning',
        'ETL',
        'Data Visualization'
      ],
      features: [
        'Data standardization',
        'Address parsing',
        'Duplicate removal',
        'Price analysis',
        'Geographic visualization',
        'Dashboard creation'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/Seattle-real-estate-analysis',
      date: '2024',
      team: false
    },
    {
      id: 'epsilon-power-bi',
      title: 'Power BI Sales Dashboard',
      category: 'dataScience',
      description: 'Interactive sales dashboard created using Power BI, providing insights across different regions, products, and years.',
      image: '/images/projects/power-bi.jpg',
      technologies: [
        'Power BI',
        'DAX',
        'Data Modeling',
        'Excel',
        'Data Visualization'
      ],
      features: [
        'Interactive filters',
        'Sales metrics',
        'Geographic analysis',
        'Time-series analysis',
        'Product performance',
        'Custom measures'
      ],
      liveUrl: null,
      githubUrl: 'https://github.com/ibrahimsaber1/Epsilon-Power-Bi-project',
      date: '2024',
      team: false
    }
  ];
  
  // Helper function to get projects by category
  export const getProjectsByCategory = (category) => {
    if (category === 'all') return projectsData;
    return projectsData.filter(project => project.category === category);
  };
  
  // Helper function to get a single project by ID
  export const getProjectById = (id) => {
    return projectsData.find(project => project.id === id);
  };
  
  // Helper function to get related projects
  export const getRelatedProjects = (currentProjectId, limit = 3) => {
    const currentProject = getProjectById(currentProjectId);
    if (!currentProject) return [];
    
    return projectsData
      .filter(project => 
        project.id !== currentProjectId && 
        project.category === currentProject.category
      )
      .slice(0, limit);
  };