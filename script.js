document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    const welcomeText = document.getElementById('welcome-text');
    const mainContent = document.getElementById('main-content');
    const initialText = "Welcome.";
    const secondText = "To Prysmis.";

    const startAnimation = () => {
        // Step 1: "Welcome." fades in and grows
        setTimeout(() => {
            welcomeText.classList.add('animate-in');
        }, 100);

        // Step 2: "Welcome." fades out and is replaced by "To Prysmis."
        setTimeout(() => {
            welcomeText.classList.remove('animate-in');
            welcomeText.classList.add('fade-out');
        }, 2100);

        // Step 3: Change text content and reset animation for "To Prysmis."
        setTimeout(() => {
            welcomeText.textContent = secondText;
            welcomeText.classList.remove('fade-out');
            welcomeText.classList.remove('text-animation');
            // This forces a reflow/repaint, essential for re-triggering the transition
            void welcomeText.offsetWidth; 
            welcomeText.classList.add('text-animation');
            welcomeText.classList.add('animate-in');
        }, 3200);

        // Step 4: "To Prysmis." fades out
        setTimeout(() => {
            welcomeText.classList.remove('animate-in');
            welcomeText.classList.add('fade-out');
        }, 5300);

        // Step 5: Overlay fades away like "dust spreading apart"
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
        }, 6400);

        // Step 6: Hide overlay and display main content smoothly
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
        }, 7400);
    };

    startAnimation();
});
