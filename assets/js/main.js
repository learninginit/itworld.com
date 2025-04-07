// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    // Initialize tool search functionality
    initializeSearch();
});

// All tool categories data
const categories = [
    {
        name: 'Image World',
        icon: 'fas fa-image',
        tools: [
            { name: 'Image to PNG', url: '/tools/image-to-png.html' },
            { name: 'Image to JPG', url: '/tools/image-to-jpg.html' },
            { name: 'Image Resizer', url: '/tools/image-resizer.html' },
            { name: 'Image Compressor', url: '/tools/image-compressor.html' },
            { name: 'Image Cropper', url: '/tools/image-cropper.html' },
            { name: 'Convert Image to Base64', url: '/tools/image-to-base64.html' },
            { name: 'Convert WebP to PNG', url: '/tools/webp-to-png.html' },
            { name: 'GIF Maker', url: '/tools/gif-maker.html' },
            { name: 'QR Code Generator', url: '/tools/qr-code-generator.html' },
            { name: 'Screenshot to PDF', url: '/tools/screenshot-to-pdf.html' }
        ]
    },
    {
        name: 'PDF World',
        icon: 'fas fa-file-pdf',
        tools: [
            { name: 'Merge PDF', url: '/tools/merge-pdf.html' },
            { name: 'Split PDF', url: '/tools/split-pdf.html' },
            { name: 'Compress PDF', url: '/tools/compress-pdf.html' },
            { name: 'PDF to Word', url: '/tools/pdf-to-word.html' },
            { name: 'PDF to Excel', url: '/tools/pdf-to-excel.html' },
            { name: 'PDF to PowerPoint', url: '/tools/pdf-to-powerpoint.html' },
            { name: 'PDF to Image', url: '/tools/pdf-to-image.html' },
            { name: 'Edit PDF', url: '/tools/edit-pdf.html' },
            { name: 'Protect PDF', url: '/tools/protect-pdf.html' },
            { name: 'Sign PDF', url: '/tools/sign-pdf.html' }
        ]
    },
    {
        name: 'SEO World',
        icon: 'fas fa-search',
        tools: [
            { name: 'Meta Tag Generator', url: '/tools/meta-tag-generator.html' },
            { name: 'Keyword Density Checker', url: '/tools/keyword-density-checker.html' },
            { name: 'Sitemap Generator', url: '/tools/sitemap-generator.html' },
            { name: 'Robots.txt Generator', url: '/tools/robots-txt-generator.html' },
            { name: 'Google Index Checker', url: '/tools/google-index-checker.html' },
            { name: 'Domain Authority Checker', url: '/tools/domain-authority-checker.html' },
            { name: 'Backlink Checker', url: '/tools/backlink-checker.html' },
            { name: 'Page Speed Checker', url: '/tools/page-speed-checker.html' },
            { name: 'XML Sitemap Validator', url: '/tools/xml-sitemap-validator.html' },
            { name: 'Mobile-Friendly Test', url: '/tools/mobile-friendly-test.html' }
        ]
    },
    {
        name: 'Text Tools',
        icon: 'fas fa-font',
        tools: [
            { name: 'Word Counter', url: '/tools/word-counter.html' },
            { name: 'Character Counter', url: '/tools/character-counter.html' },
            { name: 'Case Converter', url: '/tools/case-converter.html' },
            { name: 'Plagiarism Checker', url: '/tools/plagiarism-checker.html' },
            { name: 'Grammar Checker', url: '/tools/grammar-checker.html' },
            { name: 'Text-to-Speech', url: '/tools/text-to-speech.html' },
            { name: 'Text Translator', url: '/tools/text-translator.html' },
            { name: 'URL Encoder & Decoder', url: '/tools/url-encoder-decoder.html' },
            { name: 'Fancy Text Generator', url: '/tools/fancy-text-generator.html' },
            { name: 'Random Password Generator', url: '/tools/password-generator.html' }
        ]
    },
    {
        name: 'Developer Tools',
        icon: 'fas fa-code',
        tools: [
            { name: 'JSON Formatter', url: '/tools/json-formatter.html' },
            { name: 'HTML to Markdown', url: '/tools/html-to-markdown.html' },
            { name: 'CSS Minifier', url: '/tools/css-minifier.html' },
            { name: 'JavaScript Minifier', url: '/tools/javascript-minifier.html' },
            { name: 'SQL Formatter', url: '/tools/sql-formatter.html' },
            { name: 'HTACCESS Redirect Generator', url: '/tools/htaccess-generator.html' },
            { name: 'Markdown to HTML', url: '/tools/markdown-to-html.html' },
            { name: 'Color Code Picker', url: '/tools/color-picker.html' },
            { name: 'Base64 Encoder & Decoder', url: '/tools/base64-encoder-decoder.html' },
            { name: 'IP Address Lookup', url: '/tools/ip-lookup.html' }
        ]
    },
    {
        name: 'Unit Converters',
        icon: 'fas fa-exchange-alt',
        tools: [
            { name: 'Length Converter', url: '/tools/length-converter.html' },
            { name: 'Weight Converter', url: '/tools/weight-converter.html' },
            { name: 'Speed Converter', url: '/tools/speed-converter.html' },
            { name: 'Temperature Converter', url: '/tools/temperature-converter.html' },
            { name: 'Volume Converter', url: '/tools/volume-converter.html' },
            { name: 'Data Storage Converter', url: '/tools/data-storage-converter.html' },
            { name: 'Energy Converter', url: '/tools/energy-converter.html' },
            { name: 'Pressure Converter', url: '/tools/pressure-converter.html' },
            { name: 'Fuel Efficiency Converter', url: '/tools/fuel-efficiency-converter.html' },
            { name: 'Angle Converter', url: '/tools/angle-converter.html' }
        ]
    }
];

// Trending tools data
const trendingTools = [
    { name: 'Image to PNG', url: '/tools/image-to-png.html', category: 'Image World' },
    { name: 'Word Counter', url: '/tools/word-counter.html', category: 'Text Tools' },
    { name: 'JSON Formatter', url: '/tools/json-formatter.html', category: 'Developer Tools' },
    { name: 'PDF to Word', url: '/tools/pdf-to-word.html', category: 'PDF World' },
    { name: 'Password Generator', url: '/tools/password-generator.html', category: 'Text Tools' },
    { name: 'Color Code Picker', url: '/tools/color-picker.html', category: 'Developer Tools' }
];

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('tool-search');
    const headerSearch = document.getElementById('header-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            searchTools(searchTerm);
        });
    }
    
    if (headerSearch) {
        headerSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            searchTools(searchTerm);
        });
    }
}

// Search tools function
function searchTools(searchTerm) {
    if (!searchTerm) {
        loadCategories();
        loadTrendingTools();
        return;
    }

    const allTools = categories.flatMap(category => 
        category.tools.map(tool => ({
            ...tool,
            category: category.name
        }))
    );

    const filteredTools = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(filteredTools);
}

// Display search results
function displaySearchResults(results) {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">No tools found matching your search.</p>
            </div>
        `;
        return;
    }

    // Group results by category
    const resultsByCategory = results.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = [];
        }
        acc[tool.category].push(tool);
        return acc;
    }, {});

    // Display results
    Object.entries(resultsByCategory).forEach(([category, tools]) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'col-md-4 mb-4';
        categoryCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="${categories.find(c => c.name === category).icon} me-2"></i>
                        ${category}
                    </h5>
                    <ul class="list-unstyled">
                        ${tools.map(tool => `
                            <li><a href="${tool.url}">${tool.name}</a></li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        container.appendChild(categoryCard);
    });
}

// Load categories into the homepage
function loadCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = '';
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'col-md-4 mb-4';
        categoryCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="${category.icon} me-2"></i>
                        ${category.name}
                    </h5>
                    <ul class="list-unstyled">
                        ${category.tools.slice(0, 3).map(tool => `
                            <li><a href="${tool.url}">${tool.name}</a></li>
                        `).join('')}
                    </ul>
                    <a href="/category/${category.name.toLowerCase().replace(' ', '-')}.html" class="btn btn-primary">View All</a>
                </div>
            </div>
        `;
        container.appendChild(categoryCard);
    });
}

// Load trending tools
function loadTrendingTools() {
    const container = document.getElementById('trending-tools-container');
    if (!container) return;

    container.innerHTML = '';
    trendingTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'col-md-4 mb-4';
        toolCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.category}</p>
                    <a href="${tool.url}" class="btn btn-primary">Use Tool</a>
                </div>
            </div>
        `;
        container.appendChild(toolCard);
    });
}

// Call the loading functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadTrendingTools();
}); 