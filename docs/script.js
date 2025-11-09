// Script JavaScript pour améliorer l'interaction
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    // Amélioration de l'accessibilité au clavier
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');

        // Ouverture/fermeture au clic
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const isOpen = content.style.opacity === '1';

            // Fermer tous les autres dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    otherContent.style.opacity = '0';
                    otherContent.style.visibility = 'hidden';
                    otherContent.style.transform = 'translateY(-10px)';
                }
            });

            // Ouvrir/fermer le dropdown actuel
            if (!isOpen) {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.transform = 'translateY(0)';
            } else {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.transform = 'translateY(-10px)';
            }
        });
    });

    // Fermer les dropdowns en cliquant à l'extérieur
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.transform = 'translateY(-10px)';
            });
        }
    });

    // Navigation au clavier
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.transform = 'translateY(-10px)';
            });
        }
    });
});