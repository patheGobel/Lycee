document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const folders = document.querySelectorAll('.folder');
    const searchInput = document.getElementById('searchInput');
    const backButton = document.getElementById('backButton');
    const classesContainer = document.getElementById('classesContainer');
    const pdfLists = document.querySelectorAll('.pdf-list');

    // Gestion du clic sur les dossiers
    folders.forEach(folder => {
        folder.addEventListener('click', function () {
            const classType = this.getAttribute('data-class');
            const folderType = this.getAttribute('data-type');
            const pdfListId = `${classType}-${folderType}`;
            const pdfList = document.getElementById(pdfListId);

            if (pdfList) {
                // Masquer toutes les listes PDF
                pdfLists.forEach(list => {
                    list.classList.remove('active');
                });

                // Afficher la liste PDF demandée
                pdfList.classList.add('active');

                // Afficher le bouton retour
                backButton.classList.add('show');

                // Faire défiler jusqu'à la liste
                pdfList.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Gestion du bouton retour
    backButton.addEventListener('click', function () {
        // Masquer toutes les listes PDF
        pdfLists.forEach(list => {
            list.classList.remove('active');
        });

        // Masquer le bouton retour
        this.classList.remove('show');

        // Revenir en haut des classes
        classesContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Filtrage par type
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            folders.forEach(folder => {
                if (filter === 'all') {
                    folder.parentElement.parentElement.style.display = 'block';
                    folder.style.display = 'flex';
                } else {
                    const folderType = folder.getAttribute('data-type');
                    if (folderType === filter) {
                        folder.style.display = 'flex';
                        folder.parentElement.parentElement.style.display = 'block';
                    } else {
                        folder.style.display = 'none';

                        // Masquer la carte si aucun dossier n'est visible
                        const card = folder.parentElement.parentElement;
                        const visibleFolders = card.querySelectorAll('.folder[style="display: flex;"]');
                        if (visibleFolders.length === 0) {
                            card.style.display = 'none';
                        }
                    }
                }
            });
        });
    });

    // Recherche
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        document.querySelectorAll('.class-card').forEach(card => {
            const className = card.querySelector('h3').textContent.toLowerCase();
            const folders = card.querySelectorAll('.folder');
            let hasMatch = false;

            // Vérifier si le nom de la classe correspond
            if (className.includes(searchTerm)) {
                hasMatch = true;
            }

            // Vérifier si un dossier correspond
            folders.forEach(folder => {
                const folderName = folder.textContent.toLowerCase();
                if (folderName.includes(searchTerm)) {
                    hasMatch = true;
                    folder.style.backgroundColor = '#fff3cd'; // Mise en évidence
                } else {
                    folder.style.backgroundColor = '';
                }
            });

            // Afficher ou masquer la carte en fonction des résultats
            card.style.display = hasMatch ? 'block' : 'none';
        });
    });
});