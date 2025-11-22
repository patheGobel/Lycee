// Script pour le bouton expérimental
document.getElementById('btn').addEventListener('click', function () {
    // Animation simple
    this.textContent = 'Bravo !';
    this.style.background = 'linear-gradient(135deg, var(--math-purple), var(--math-red))';

    // Réinitialiser après 1.5 secondes
    setTimeout(() => {
        this.textContent = 'Appuie sur moi';
        this.style.background = 'linear-gradient(135deg, var(--math-blue), var(--math-purple))';
    }, 1500);
});
//Script pour le bouton de retour
document.getElementById('btn').addEventListener('click', function () {
    window.history.back();
});