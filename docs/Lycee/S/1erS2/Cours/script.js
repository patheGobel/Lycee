document.addEventListener('DOMContentLoaded', function () {
    const allToggles = document.querySelectorAll('.dropdown-toggle');
    const allContents = document.querySelectorAll('.dropdown-content');

    allToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const targetContent = this.nextElementSibling;
            const isCurrentlyActive = this.classList.contains('active');

            // Ferme tous les autres menus et désactive leurs boutons
            allContents.forEach(content => {
                if (content !== targetContent) {
                    content.classList.remove('show');
                }
            });

            allToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                }
            });

            // Ouvre ou ferme le menu cliqué
            if (isCurrentlyActive) {
                this.classList.remove('active');
                targetContent.classList.remove('show');
            } else {
                this.classList.add('active');
                targetContent.classList.add('show');
            }
        });
    });
});