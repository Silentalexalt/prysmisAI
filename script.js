function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('show');
    }, 70);
});
