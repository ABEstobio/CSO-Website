document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const ctaButton = document.getElementById('cta-button');
    
    // Add click event listener
    ctaButton.addEventListener('click', function() {
        alert('Button clicked! This is JavaScript working.');
        
        // Change button text temporarily
        const originalText = ctaButton.textContent;
        ctaButton.textContent = 'Clicked!';
        
        // Reset after 1 second
        setTimeout(function() {
            ctaButton.textContent = originalText;
        }, 1000);
    });
    
    // You can add more JavaScript functionality here
    console.log('Website loaded successfully!');
});