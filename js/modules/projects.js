export const projectsData = [
  {
    id: 1,
    title: "AI Financial Predictor",
    description: "Machine learning model predicting stock trends with 94% accuracy using LSTM networks.",
    longDescription: "This project involved collecting and processing large datasets of historical stock prices and financial news. I implemented an LSTM neural network with attention mechanisms to identify patterns in price movements. The system achieved a backtested accuracy of 94% in predicting 30-day price movements.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    projectUrl: "#",
    codeUrl: "#",
    tags: ["AI", "Python", "TensorFlow"],
    category: "machine-learning",
    date: "2023-11-15",
    stars: 142,
    forks: 38,
    featured: true,
    stats: {
      accuracy: "94%",
      latency: "200ms",
      dataset: "5TB"
    }
  },
  {
    id: 2,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard built with React and D3.js for complex data visualization.",
    longDescription: "Created a responsive dashboard that processes real-time data streams and presents them through interactive visualizations. Implemented custom D3.js charts with smooth transitions and tooltips. The system handles over 10,000 data points per second with optimized rendering performance.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    projectUrl: "#",
    codeUrl: "#",
    tags: ["React", "D3.js", "JavaScript"],
    category: "web-dev",
    date: "2023-08-22",
    stars: 89,
    forks: 24,
    featured: false,
    stats: {
      performance: "60FPS",
      dataPoints: "10K/sec",
      components: "45+"
    }
  },
  {
    id: 3,
    title: "Customer Segmentation Model",
    description: "Unsupervised learning model for customer segmentation using clustering algorithms.",
    longDescription: "Developed a customer segmentation system using K-means and hierarchical clustering algorithms. Processed over 1 million customer records to identify 7 distinct segments. The model improved marketing campaign targeting by 37% compared to previous methods.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    projectUrl: "#",
    codeUrl: "#",
    tags: ["Machine Learning", "Scikit-learn", "Pandas"],
    category: "data-science",
    date: "2023-05-10",
    stars: 76,
    forks: 19,
    featured: true,
    stats: {
      segments: "7",
      records: "1M+",
      improvement: "37%"
    }
  }
];

export function initProjects() {
  try {
    // DOM elements
    const projectGrid = document.getElementById('project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMore');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Initial variables
    let currentFilter = 'all';
    let visibleCount = 3;
    let isLoading = false;
    
    // Format date
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Render projects
    const renderProjects = () => {
      const filteredProjects = currentFilter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentFilter);
      
      const projectsToShow = filteredProjects.slice(0, visibleCount);
      
      projectGrid.innerHTML = projectsToShow.map(project => `
        <div class="project-card" data-id="${project.id}" data-category="${project.category}">
          <div class="project-media">
            <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
            ${project.featured ? `<span class="project-badge">Featured</span>` : ''}
          </div>
          <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="project-meta">
              <span class="project-date"><i class="far fa-calendar-alt"></i> ${formatDate(project.date)}</span>
              <div class="project-stats">
                <span class="project-stat"><i class="far fa-star"></i> ${project.stars}</span>
                <span class="project-stat"><i class="fas fa-code-branch"></i> ${project.forks}</span>
              </div>
            </div>
            
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="project-actions">
              <a href="${project.projectUrl}" class="project-link demo" target="_blank" rel="noopener">
                <i class="fas fa-external-link-alt"></i> Demo
              </a>
              <a href="${project.codeUrl}" class="project-link code" target="_blank" rel="noopener">
                <i class="fab fa-github"></i> Code
              </a>
            </div>
          </div>
        </div>
      `).join('');
      
      animateCards();
      updateLoadMoreButton();
    };
    
    const animateCards = () => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = 1;
          card.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    };
    
    const updateLoadMoreButton = () => {
      if (!loadMoreBtn) return;
      
      const filteredProjects = currentFilter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === currentFilter);
      
      const progress = (visibleCount / filteredProjects.length) * 113;
      const circle = document.querySelector('.circle-progress');
      if (circle) {
        circle.style.strokeDashoffset = 113 - progress;
      }
      
      loadMoreBtn.style.display = filteredProjects.length > visibleCount ? 'flex' : 'none';
    };
    
    const loadMoreProjects = () => {
      if (isLoading) return;
      
      isLoading = true;
      loadMoreBtn.classList.add('loading');
      
      setTimeout(() => {
        visibleCount += 3;
        renderProjects();
        isLoading = false;
        loadMoreBtn.classList.remove('loading');
      }, 800);
    };
    
    const showProjectModal = (projectId) => {
      const project = projectsData.find(p => p.id === projectId);
      if (!project) return;
      
      const modalBody = document.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div class="modal-header">
          <h3>${project.title}</h3>
          <div class="modal-meta">
            <span class="modal-date"><i class="far fa-calendar-alt"></i> ${formatDate(project.date)}</span>
            <div class="modal-stats">
              <span class="modal-stat"><i class="far fa-star"></i> ${project.stars} Stars</span>
              <span class="modal-stat"><i class="fas fa-code-branch"></i> ${project.forks} Forks</span>
            </div>
          </div>
        </div>
        
        <div class="modal-media">
          <img src="${project.imageUrl}" alt="${project.title}">
        </div>
        
        <div class="modal-details">
          <div class="modal-description">
            <h4>Project Overview</h4>
            <p>${project.longDescription}</p>
          </div>
          
          <div class="modal-tech">
            <h4>Technologies Used</h4>
            <div class="tech-stack">
              ${project.tags.map(tag => `
                <div class="tech-item">
                  <i class="${getTechIcon(tag)}"></i>
                  <span>${tag}</span>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="modal-stats-grid">
            ${project.stats ? Object.entries(project.stats).map(([key, value]) => `
              <div class="stat-item">
                <div class="stat-value">${value}</div>
                <div class="stat-label">${key.replace(/-/g, ' ')}</div>
              </div>
            `).join('') : ''}
          </div>
        </div>
        
        <div class="modal-actions">
          <a href="${project.projectUrl}" class="modal-btn demo" target="_blank" rel="noopener">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
          <a href="${project.codeUrl}" class="modal-btn code" target="_blank" rel="noopener">
            <i class="fab fa-github"></i> View Code
          </a>
        </div>
      `;
      
      projectModal.classList.add('active');
    };
    
    const getTechIcon = (tech) => {
      const icons = {
        'AI': 'fas fa-brain',
        'Python': 'fab fa-python',
        'TensorFlow': 'fas fa-robot',
        'React': 'fab fa-react',
        'D3.js': 'fas fa-chart-line',
        'JavaScript': 'fab fa-js',
        'Machine Learning': 'fas fa-brain',
        'Scikit-learn': 'fas fa-robot',
        'Pandas': 'fas fa-table'
      };
      return icons[tech] || 'fas fa-code';
    };
    
    // Event listeners
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        visibleCount = 3;
        renderProjects();
      });
    });
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
    
    projectGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) {
        const projectId = parseInt(card.dataset.id);
        showProjectModal(projectId);
      }
    });
    
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        projectModal.classList.remove('active');
      });
    }
    
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
      }
    });
    
    // Initial render
    setTimeout(() => {
      renderProjects();
    }, 500);
    
  } catch (error) {
    console.error('Error initializing projects showcase:', error);
  }
}