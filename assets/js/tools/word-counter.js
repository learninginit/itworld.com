document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const sentenceCount = document.getElementById('sentence-count');
    const paragraphCount = document.getElementById('paragraph-count');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    // Update statistics when text changes
    textInput.addEventListener('input', updateStatistics);

    // Clear text button
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        updateStatistics();
    });

    // Copy results button
    copyBtn.addEventListener('click', function() {
        const stats = getStatistics();
        const textToCopy = `Word Counter Results:
Words: ${stats.words}
Characters: ${stats.characters}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showToast('Results copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                showToast('Failed to copy results', 'error');
            });
    });

    // Update all statistics
    function updateStatistics() {
        const stats = getStatistics();
        wordCount.textContent = stats.words;
        charCount.textContent = stats.characters;
        sentenceCount.textContent = stats.sentences;
        paragraphCount.textContent = stats.paragraphs;
    }

    // Get all statistics
    function getStatistics() {
        const text = textInput.value;
        return {
            words: countWords(text),
            characters: countCharacters(text),
            sentences: countSentences(text),
            paragraphs: countParagraphs(text)
        };
    }

    // Count words
    function countWords(text) {
        if (!text.trim()) return 0;
        return text.trim().split(/\s+/).length;
    }

    // Count characters
    function countCharacters(text) {
        return text.length;
    }

    // Count sentences
    function countSentences(text) {
        if (!text.trim()) return 0;
        // Split by common sentence terminators and filter out empty strings
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    }

    // Count paragraphs
    function countParagraphs(text) {
        if (!text.trim()) return 0;
        // Split by newlines and filter out empty paragraphs
        return text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0).length;
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', function() {
            document.body.removeChild(toast);
        });
    }
}); 