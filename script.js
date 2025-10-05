function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hero = document.getElementById('hero');
        hero.classList.add('animate');
    }, 100); 
});
