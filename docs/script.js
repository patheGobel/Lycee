document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const folders = document.querySelectorAll('.folder');
    const backButton = document.getElementById('backButton');
    const classesContainer = document.getElementById('classesContainer');
    const pdfLists = document.querySelectorAll('.pdf-list');
    const subFolders = document.querySelectorAll('.sub-folder');

    // Gestion du clic sur les dossiers principaux (Cours, TD)
    folders.forEach(folder => {
        if (!folder.classList.contains('folder-evaluation')) {
            folder.addEventListener('click', function (e) {
                e.stopPropagation();
                closeAllPdfLists();

                const classType = this.getAttribute('data-class');
                const folderType = this.getAttribute('data-type');
                const pdfListId = `${classType}-${folderType}`;
                const pdfList = document.getElementById(pdfListId);

                if (pdfList) {
                    pdfList.classList.add('active');
                    backButton.classList.add('show');
                    pdfList.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });

    // Gestion du clic sur les sous-dossiers d'évaluation
    subFolders.forEach(subFolder => {
        subFolder.addEventListener('click', function (e) {
            e.stopPropagation();
            closeAllPdfLists();

            const classCard = this.closest('.class-card');
            const classType = classCard.querySelector('.folder-evaluation').getAttribute('data-class');
            const subfolderType = this.getAttribute('data-subfolder');
            const pdfListId = `${classType}-evaluation`;
            const pdfList = document.getElementById(pdfListId);

            if (pdfList) {
                pdfList.classList.add('active');
                backButton.classList.add('show');

                // Faire défiler jusqu'au sous-dossier spécifique
                const targetSubfolder = pdfList.querySelector(`[data-subfolder="${subfolderType}"]`);
                if (targetSubfolder) {
                    targetSubfolder.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    pdfList.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Fonction pour fermer toutes les listes PDF
    function closeAllPdfLists() {
        pdfLists.forEach(list => {
            list.classList.remove('active');
        });
    }

    // Gestion du bouton retour
    backButton.addEventListener('click', function () {
        closeAllPdfLists();
        this.classList.remove('show');
        classesContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Filtrage par type
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
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
});