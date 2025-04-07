document.addEventListener('DOMContentLoaded', function() {
    // Get category name from URL
    const categoryName = window.location.pathname
        .split('/')
        .pop()
        .replace('.html', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

    // Update page title and description
    document.title = `${categoryName} - ITWorld.com`;
    document.getElementById('category-title').textContent = categoryName;

    // Find category in categories array
    const category = categories.find(c => 
        c.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (category) {
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.content = `Browse all ${categoryName} tools. Free online tools for developers, designers, and professionals.`;

        // Update category description
        const categoryDescription = document.getElementById('category-description');
        categoryDescription.textContent = getCategoryDescription(categoryName);

        // Add category-specific class to container
        const toolsContainer = document.getElementById('tools-container');
        toolsContainer.classList.add(getCategoryClass(categoryName));

        // Load tools
        loadTools(category.tools);
    } else {
        // Category not found
        document.getElementById('tools-container').innerHTML = `
            <div class="alert alert-warning text-center">
                Category not found. Please check the URL or go back to the <a href="/">homepage</a>.
            </div>
        `;
    }
});

// Get category class
function getCategoryClass(categoryName) {
    const classMap = {
        'PDF World': 'pdf-tools',
        'Image World': 'image-tools',
        'Text Tools': 'text-tools',
        'SEO World': 'seo-tools',
        'Developer Tools': 'dev-tools',
        'Unit Converters': 'unit-tools'
    };
    return classMap[categoryName] || 'general-tools';
}

// Get category description
function getCategoryDescription(categoryName) {
    const descriptions = {
        'Image World': 'Convert, resize, compress, and enhance your images with our collection of image tools. Perfect for designers, photographers, and content creators.',
        'PDF World': 'Handle all your PDF needs with our comprehensive set of PDF tools. Convert, merge, split, and edit PDF files with ease.',
        'SEO World': 'Optimize your website and improve search engine rankings with our SEO tools. Analyze, monitor, and enhance your online presence.',
        'Text Tools': 'Process and manipulate text with our text utility tools. Count words, check grammar, convert cases, and more.',
        'Developer Tools': 'Essential tools for developers. Format code, minify files, generate configurations, and more.',
        'Unit Converters': 'Convert between different units of measurement. Length, weight, temperature, and more.'
    };

    return descriptions[categoryName] || 'Browse our collection of tools in this category.';
}

// Get tool icon
function getToolIcon(toolName) {
    const iconMap = {
        // PDF Tools
        'PDF to Word': 'fa-file-word',
        'PDF to Excel': 'fa-file-excel',
        'PDF to PowerPoint': 'fa-file-powerpoint',
        'PDF to Image': 'fa-file-image',
        'Merge PDF': 'fa-object-group',
        'Split PDF': 'fa-cut',
        'Compress PDF': 'fa-compress',
        'Edit PDF': 'fa-edit',
        'Protect PDF': 'fa-lock',
        'Sign PDF': 'fa-signature',
        
        // Image Tools
        'Image to PNG': 'fa-image',
        'Image to JPG': 'fa-file-image',
        'Image Resizer': 'fa-expand',
        'Image Compressor': 'fa-compress-arrows-alt',
        'Image Cropper': 'fa-crop',
        'Convert Image to Base64': 'fa-code',
        'Convert WebP to PNG': 'fa-exchange-alt',
        'GIF Maker': 'fa-film',
        'QR Code Generator': 'fa-qrcode',
        'Screenshot to PDF': 'fa-camera',
        
        // Text Tools
        'Word Counter': 'fa-calculator',
        'Character Counter': 'fa-text-width',
        'Case Converter': 'fa-font',
        'Plagiarism Checker': 'fa-check-double',
        'Grammar Checker': 'fa-spell-check',
        'Text-to-Speech': 'fa-volume-up',
        'Text Translator': 'fa-language',
        'URL Encoder & Decoder': 'fa-link',
        'Fancy Text Generator': 'fa-magic',
        'Random Password Generator': 'fa-key'
    };
    
    return iconMap[toolName] || 'fa-tools';
}

// Load tools in the category
function loadTools(tools) {
    const container = document.getElementById('tools-container');
    if (!container) return;

    container.innerHTML = '';
    
    tools.forEach(tool => {
        const toolCard = document.createElement('a');
        toolCard.href = tool.url;
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <div class="tool-icon">
                <i class="fas ${getToolIcon(tool.name)}"></i>
            </div>
            <h3>${tool.name}</h3>
            <p>${getToolDescription(tool.name)}</p>
        `;
        container.appendChild(toolCard);
    });
}

// Get tool description
function getToolDescription(toolName) {
    const descriptions = {
        'Image to PNG': 'Convert any image format to PNG with high quality and transparency support.',
        'Image to JPG': 'Convert images to JPG format with customizable quality settings.',
        'Image Resizer': 'Resize your images to any dimension while maintaining aspect ratio.',
        'Image Compressor': 'Reduce image file size without significant quality loss.',
        'Image Cropper': 'Crop images to your desired dimensions and aspect ratio.',
        'Convert Image to Base64': 'Convert images to Base64 string for web development.',
        'Convert WebP to PNG': 'Convert WebP images to PNG format with ease.',
        'GIF Maker': 'Create animated GIFs from your images or videos.',
        'QR Code Generator': 'Generate QR codes for URLs, text, or contact information.',
        'Screenshot to PDF': 'Convert screenshots to PDF documents.',
        'Merge PDF': 'Combine multiple PDF files into a single document.',
        'Split PDF': 'Split PDF files into multiple documents.',
        'Compress PDF': 'Reduce PDF file size while maintaining quality.',
        'PDF to Word': 'Convert PDF documents to editable Word files.',
        'PDF to Excel': 'Extract tables from PDF to Excel spreadsheets.',
        'PDF to PowerPoint': 'Convert PDF presentations to PowerPoint format.',
        'PDF to Image': 'Convert PDF pages to image files.',
        'Edit PDF': 'Edit text, images, and pages in PDF documents.',
        'Protect PDF': 'Add password protection to your PDF files.',
        'Sign PDF': 'Add digital signatures to PDF documents.',
        'Meta Tag Generator': 'Generate optimized meta tags for your web pages.',
        'Keyword Density Checker': 'Analyze keyword density in your content.',
        'Sitemap Generator': 'Create XML sitemaps for your website.',
        'Robots.txt Generator': 'Generate robots.txt files for search engines.',
        'Google Index Checker': 'Check if your pages are indexed by Google.',
        'Domain Authority Checker': 'Check your website\'s domain authority score.',
        'Backlink Checker': 'Analyze backlinks to your website.',
        'Page Speed Checker': 'Test your website\'s loading speed.',
        'XML Sitemap Validator': 'Validate your XML sitemap files.',
        'Mobile-Friendly Test': 'Check if your website is mobile-friendly.',
        'Word Counter': 'Count words, characters, and sentences in your text.',
        'Character Counter': 'Count characters in your text with detailed statistics.',
        'Case Converter': 'Convert text between different cases (uppercase, lowercase, etc.).',
        'Plagiarism Checker': 'Check text for plagiarism and duplicate content.',
        'Grammar Checker': 'Check and correct grammar errors in your text.',
        'Text-to-Speech': 'Convert text to natural-sounding speech.',
        'Text Translator': 'Translate text between multiple languages.',
        'URL Encoder & Decoder': 'Encode and decode URLs and special characters.',
        'Fancy Text Generator': 'Generate stylish text with different fonts.',
        'Random Password Generator': 'Generate secure random passwords.',
        'JSON Formatter': 'Format and validate JSON data.',
        'HTML to Markdown': 'Convert HTML to Markdown format.',
        'CSS Minifier': 'Minify CSS code to reduce file size.',
        'JavaScript Minifier': 'Minify JavaScript code to reduce file size.',
        'SQL Formatter': 'Format SQL queries for better readability.',
        'HTACCESS Redirect Generator': 'Generate .htaccess redirect rules.',
        'Markdown to HTML': 'Convert Markdown to HTML format.',
        'Color Code Picker': 'Pick and convert between color formats.',
        'Base64 Encoder & Decoder': 'Encode and decode Base64 strings.',
        'IP Address Lookup': 'Look up information about IP addresses.',
        'Length Converter': 'Convert between different units of length.',
        'Weight Converter': 'Convert between different units of weight.',
        'Speed Converter': 'Convert between different units of speed.',
        'Temperature Converter': 'Convert between different temperature scales.',
        'Volume Converter': 'Convert between different units of volume.',
        'Data Storage Converter': 'Convert between different units of data storage.',
        'Energy Converter': 'Convert between different units of energy.',
        'Pressure Converter': 'Convert between different units of pressure.',
        'Fuel Efficiency Converter': 'Convert between different units of fuel efficiency.',
        'Angle Converter': 'Convert between different units of angle measurement.'
    };

    return descriptions[toolName] || 'Use this tool to perform your task efficiently.';
} 