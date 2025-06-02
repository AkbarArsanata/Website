import { logError } from './utils.js';

// PDF.js Global Loader
let pdfjsLib = null;

// Certificate data (same as before)
const certificatesData = {
    "machine-learning-ai": [
        { name: "AI - Generative AI Masters 2025 NLP, Transformers & Gen AI", date: "Jan 2025", pdfUrl: "certificates/AI - Generative AI Masters 2025 NLP, Transformers & Gen AI.pdf" },
        { name: "AI Engineering Masterclass", date: "Feb 2025", pdfUrl: "certificates/AI Engineering Masterclass.pdf" },
        { name: "AI Foundations for Decision Makers From Zero to LLMs", date: "Mar 2025", pdfUrl: "certificates/AI Foundations for Decision Makers From Zero to LLMs.pdf" },
        { name: "Belajar Machine Learning untuk Pemula", date: "Apr 2024", pdfUrl: "certificates/Belajar Machine Learning untuk Pemula.pdf" },
        { name: "Belajar Pengembangan Machine Learning", date: "May 2024", pdfUrl: "certificates/Belajar Pengembangan Machine Learning.pdf" },
        { name: "Pengembangan Machine Learning", date: "Jun 2024", pdfUrl: "certificates/Pengembangan Machine Learning.pdf" },
        { name: "Machine Learning Terapan", date: "Jul 2024", pdfUrl: "certificates/Machine Learning Terapan.pdf" },
        { name: "Machine Learning With Python for Beginner", date: "Aug 2024", pdfUrl: "certificates/Machine Learning With Python for Beginner.pdf" },
        { name: "MATHEMATICS FOR MACHINE LEARNING", date: "Sep 2024", pdfUrl: "certificates/MATHEMATICS FOR MACHINE LEARNING.pdf" },
        { name: "Implementasi Decision Tree dengan CART", date: "Oct 2024", pdfUrl: "certificates/Implementasi Decision Tree dengan CART .pdf" },
        { name: "Implementasi Decision Tree dengan Random Forest", date: "Nov 2024", pdfUrl: "certificates/Implementasi Decision Tree dengan Random Forest.pdf" },
        { name: "Metrik Penting pada Algoritma CART", date: "Dec 2024", pdfUrl: "certificates/Metrik Penting pada Algoritma CART.pdf" },
        { name: "Metrik Penting pada Algoritma Random Forest", date: "Jan 2025", pdfUrl: "certificates/Metrik Penting pada Algoritma Random Forest .pdf" },
        { name: "Multiclass Classification dengan Algoritma Multinomial Naive Bayes dan kNearest Neighbors", date: "Feb 2025", pdfUrl: "certificates/Multiclass Classification dengan Algoritma Multinomial Naive Bayes dan kNearest Neighbors.pdf" }
    ],
    "data-engineering-databases": [
        { name: "Belajar Fundamental Pemrosesan Data", date: "Jan 2024", pdfUrl: "certificates/Belajar Fundamental Pemrosesan Data.pdf" },
        { name: "Data Manipulation with Pandas - Part 1", date: "Feb 2024", pdfUrl: "certificates/Data Manipulation with Pandas - Part 1 .pdf" },
        { name: "Data Manipulation with Pandas - Part 2", date: "Mar 2024", pdfUrl: "certificates/Data Manipulation with Pandas - Part 2 .pdf" },
        { name: "Data Wrangling Python", date: "Apr 2024", pdfUrl: "certificates/Data Wrangling Python.pdf" },
        { name: "Eksplorasi dan Analisis Data COVID-19 Indonesia using Python", date: "May 2024", pdfUrl: "certificates/Eksplorasi dan Analisis Data COVID-19 Indonesia using Python.pdf" },
        { name: "Exploratory Data Analysis with Python for Beginner", date: "Jun 2024", pdfUrl: "certificates/Exploratory Data Analysis with Python for Beginner.pdf" },
        { name: "Fundamental SQL", date: "Jul 2024", pdfUrl: "certificates/Fundamental SQL.pdf" },
        { name: "SQL.pdf", date: "Aug 2024", pdfUrl: "certificates/SQL.pdf" },
        { name: "Mengolah Data Teks Unstructured dengan REGEX pada Python", date: "Sep 2024", pdfUrl: "certificates/Mengolah Data Teks Unstructured dengan REGEX pada Python .pdf" },
        { name: "Basic Feature Discovering for Machine Learning", date: "Oct 2024", pdfUrl: "certificates/Basic Feature Discovering for Machine Learning.pdf" },
        { name: "Data Quality with Python for Beginner", date: "Nov 2024", pdfUrl: "certificates/Data Quality with Python for Beginner.pdf" }
    ],
    "data-visualization-analytics": [
        { name: "Belajar Dasar Visualisasi Data", date: "Jan 2024", pdfUrl: "certificates/Belajar Dasar Visualisasi Data.pdf" },
        { name: "Belajar Analisis Data dengan Python", date: "Feb 2024", pdfUrl: "certificates/Belajar Analisis Data dengan Python.pdf" },
        { name: "Fundamental Data Visualization with Python", date: "Mar 2024", pdfUrl: "certificates/Fundamental Data Visualization with Python.pdf" },
        { name: "Data Visualization using Plotnine", date: "Apr 2024", pdfUrl: "certificates/Data Visualization using Plotnine .pdf" },
        { name: "Data Visualization with Python Matplotlib for Beginner - Part 1", date: "May 2024", pdfUrl: "certificates/Data Visualization with Python Matplotlib for Beginner - Part 1 .pdf" },
        { name: "Data Visualization with Python Matplotlib for Beginner - Part 2", date: "Jun 2024", pdfUrl: "certificates/Data Visualization with Python Matplotlib for Beginner - Part 2.pdf" },
        { name: "Mengenal Visualisasi Data Statistik", date: "Jul 2024", pdfUrl: "certificates/Mengenal Visualisasi Data Statistik.pdf" },
        { name: "Visualisasi Data", date: "Aug 2024", pdfUrl: "certificates/Visualisasi Data.pdf" },
        { name: "Pengantar Storytelling dengan Visualisasi menggunakan Python", date: "Sep 2024", pdfUrl: "certificates/Pengantar Storytelling dengan Visualisasi menggunakan Python.pdf" }
    ],
    "mlops-cloud-deployment": [
        { name: "AI - RAG in Azure with OpenAI and ChatGPT LLM model", date: "Jan 2025", pdfUrl: "certificates/AI - RAG in Azure with OpenAI and ChatGPT LLM model.pdf" },
        { name: "Explore generative AI with Copilot in Bing - Microsoft Learn", date: "Feb 2025", pdfUrl: "certificates/Explore generative AI with Copilot in Bing - Microsoft Learn.pdf" },
        { name: "Fundamental generative AI - Microsoft Learn", date: "Mar 2025", pdfUrl: "certificates/Fundamental generative AI - Microsoft Learn.pdf" },
        { name: "Get started building with power BI - Microsoft Learn", date: "Apr 2025", pdfUrl: "certificates/Get started building with power BI - Microsoft Learn.pdf" },
        { name: "Cloud DevOps Engineer", date: "May 2024", pdfUrl: "certificates/Cloud DevOps Engineer.pdf" },
        { name: "Terraform Certified", date: "Jun 2024", pdfUrl: "certificates/Terraform%20Certified.pdf" },
        { name: "Docker & Kubernetes Certification", date: "Jul 2024", pdfUrl: "certificates/Docker%20&%20Kubernetes%20Certification.pdf" }
    ]
};

let currentCategory = "machine-learning-ai";
let showAll = false;

// Load Font Awesome for icons
function loadFontAwesome() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
}

// Enhanced PDF.js loader with fallback
async function loadPDFJS() {
    if (window.pdfjsLib) {
        pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
        return;
    }

    try {
        // Try CDN first
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');
        pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    } catch (error) {
        console.warn('CDN failed, trying local fallback');
        try {
            // Fallback to local version
            await loadScript('/lib/pdf.min.js');
            pdfjsLib = window.pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/lib/pdf.worker.min.js';
        } catch (err) {
            logError('Failed to load PDF.js', err);
            throw err;
        }
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Render certificates with enhanced UI
async function renderCertificates(category) {
    try {
        const certificateGrid = document.getElementById('certificate-grid');
        const items = certificatesData[category];
        
        if (!items) {
            throw new Error(`No certificates found for category: ${category}`);
        }

        // Update counter
        document.getElementById('shown-count').textContent = showAll ? items.length : Math.min(8, items.length);
        document.getElementById('total-count').textContent = items.length;

        const limit = showAll ? items.length : 3;
        certificateGrid.innerHTML = "";
        
        for (let i = 0; i < Math.min(limit, items.length); i++) {
            const cert = items[i];
            const card = document.createElement("div");
            card.className = "certificate-card";
            card.innerHTML = `
                <div class="pdf-preview-container">
                    <canvas class="pdf-canvas" data-pdf-url="${cert.pdfUrl}"></canvas>
                    <div class="pdf-preview-overlay">
                        <i class="fas fa-expand"></i>
                    </div>
                </div>
                <div class="certificate-card-content">
                    <span class="certificate-badge">${categoryToLabel(category)}</span>
                    <h4>${cert.name}</h4>
                    <p>Issued: ${cert.date}</p>
                    <a href="#" class="view-pdf-btn" data-pdf-url="${cert.pdfUrl}" data-title="${cert.name}" data-date="${cert.date}">
                        <i class="fas fa-eye"></i> View Certificate
                    </a>
                </div>
            `;
            certificateGrid.appendChild(card);
        }

        await renderAllPDFPreviews();
        setupEventListeners();

        const viewBtn = document.getElementById("view-all-btn");
        if (viewBtn) {
            viewBtn.style.display = items.length > 8 ? "flex" : "none";
            viewBtn.innerHTML = showAll ? 
                '<span>Show Less</span><i class="fas fa-chevron-up"></i>' : 
                '<span>View All</span><i class="fas fa-chevron-down"></i>';
        }

        currentCategory = category;
    } catch (error) {
        logError(`Error rendering certificates for category ${category}`, error);
        const certificateGrid = document.getElementById('certificate-grid');
        if (certificateGrid) {
            certificateGrid.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load certificates. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Convert category ID to readable label
function categoryToLabel(category) {
    const labels = {
        "machine-learning-ai": "AI/ML",
        "data-engineering-databases": "Data Engineering",
        "data-visualization-analytics": "Data Analytics",
        "mlops-cloud-deployment": "MLOps & Cloud"
    };
    return labels[category] || category;
}

// Render PDF previews with loading states
async function renderAllPDFPreviews() {
    const canvases = document.querySelectorAll('.pdf-canvas');
    
    for (const canvas of canvases) {
        const pdfUrl = canvas.getAttribute('data-pdf-url');
        if (!pdfUrl) continue;
        
        // Show loading state
        canvas.parentElement.insertAdjacentHTML('beforeend', `
            <div class="pdf-loading">
                <div class="spinner"></div>
                <p>Loading preview...</p>
            </div>
        `);
        
        try {
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            
            const viewport = page.getViewport({ scale: 0.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const context = canvas.getContext('2d');
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Remove loading state
            const loadingElement = canvas.parentElement.querySelector('.pdf-loading');
            if (loadingElement) loadingElement.remove();
        } catch (err) {
            console.error(`Error loading PDF ${pdfUrl}:`, err);
            const loadingElement = canvas.parentElement.querySelector('.pdf-loading');
            if (loadingElement) {
                loadingElement.innerHTML = `
                    <i class="fas fa-file-pdf"></i>
                    <p>Preview unavailable</p>
                `;
            }
        }
    }
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // View PDF buttons
    document.querySelectorAll('.view-pdf-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pdfUrl = btn.getAttribute('data-pdf-url');
            const title = btn.getAttribute('data-title');
            const date = btn.getAttribute('data-date');
            
            openPDFModal(pdfUrl, title, date);
        });
    });
    
    // PDF preview click to open modal
    document.querySelectorAll('.pdf-preview-container').forEach(container => {
        container.addEventListener('click', () => {
            const pdfUrl = container.querySelector('.pdf-canvas')?.getAttribute('data-pdf-url');
            const card = container.closest('.certificate-card');
            const title = card?.querySelector('h4')?.textContent;
            const date = card?.querySelector('p')?.textContent;
            
            if (pdfUrl && title && date) {
                openPDFModal(pdfUrl, title, date);
            }
        });
    });
    
    // Close modal button
    document.querySelector('.close-modal')?.addEventListener('click', closePDFModal);
    
    // Close modal when clicking outside
    document.getElementById('pdf-modal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('pdf-modal')) {
            closePDFModal();
        }
    });
}

// PDF Modal functions
function openPDFModal(pdfUrl, title, date) {
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    const pdfTitle = document.getElementById('pdf-title');
    const pdfDate = document.getElementById('pdf-date');
    const downloadLink = document.getElementById('pdf-download');
    
    // Set modal content
    pdfTitle.textContent = title;
    pdfDate.textContent = date;
    downloadLink.setAttribute('href', pdfUrl);
    downloadLink.setAttribute('download', title + '.pdf');
    
    // Load PDF in iframe
    viewer.src = pdfUrl + '#view=fitH';
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset iframe source
    document.getElementById('pdf-viewer').src = '';
}

// Initialize certificates section
export async function initCertificates() {
    try {
        console.log('Initializing enhanced certificates system...');
        
        // Load required libraries
        loadFontAwesome();
        await loadPDFJS();
        
        // Render initial certificates
        await renderCertificates(currentCategory);

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                showAll = false;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderCertificates(btn.dataset.category);
            });
        });

        // View All toggle
        document.getElementById('view-all-btn')?.addEventListener('click', () => {
            showAll = !showAll;
            renderCertificates(currentCategory);
            
            // Scroll to show more certificates if "View All" was clicked
            if (showAll) {
                setTimeout(() => {
                    document.getElementById('certificates').scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        });
        
        console.log('Enhanced certificates system initialized successfully');
    } catch (error) {
        logError('Error initializing certificates system', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('certificates')) {
        initCertificates();
    }
});