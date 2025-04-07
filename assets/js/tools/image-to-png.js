document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn');
    const previewArea = document.getElementById('preview-area');
    const originalPreview = document.getElementById('original-preview');
    const pngPreview = document.getElementById('png-preview');

    let currentFile = null;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropArea.classList.add('border-primary');
    }

    function unhighlight(e) {
        dropArea.classList.remove('border-primary');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            currentFile = files[0];
            if (currentFile.type.startsWith('image/')) {
                displayPreview(currentFile);
                convertBtn.disabled = false;
            } else {
                alert('Please select an image file.');
            }
        }
    }

    function displayPreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            originalPreview.src = e.target.result;
            previewArea.classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }

    convertBtn.addEventListener('click', function() {
        if (currentFile) {
            convertToPNG(currentFile);
        }
    });

    function convertToPNG(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                
                // Draw the image
                ctx.drawImage(img, 0, 0);
                
                // Apply background removal if selected
                if (document.getElementById('remove-background').checked) {
                    // This is a placeholder for background removal logic
                    // In a real implementation, you would use a more sophisticated algorithm
                    console.log('Background removal would be implemented here');
                }
                
                // Convert to PNG
                const pngDataUrl = canvas.toDataURL('image/png');
                pngPreview.src = pngDataUrl;
                downloadBtn.disabled = false;
                
                // Store the PNG data URL for download
                downloadBtn.onclick = function() {
                    const link = document.createElement('a');
                    link.download = file.name.replace(/\.[^/.]+$/, '') + '.png';
                    link.href = pngDataUrl;
                    link.click();
                };
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}); 