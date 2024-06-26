document.addEventListener('DOMContentLoaded', function () {
    // Restaurar o link ativo da navbar do localStorage
    const currentActiveLinkId = localStorage.getItem('activeLink');
    if (currentActiveLinkId) {
        setActiveLink(currentActiveLinkId);
    } else {
        // Se não houver link ativo no localStorage, definir um padrão
        const defaultLinkId = 'link1'; // ID do link que você quer como padrão
        setActiveLink(defaultLinkId);
    }

    // Configurar as barras de progresso
    const progressContainers = document.querySelectorAll('.progress-container');
    progressContainers.forEach(container => {
        const percentage = container.getAttribute('data-percentage');
        const progressBar = container.querySelector('.progress-bar');
        progressBar.style.width = percentage + '%';
    });

    // Configurar a exibição das listas de projetos
    const projectLinks = document.querySelectorAll('.project-nav .nav-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkId = link.id;
            setActiveLink(linkId);
        });
    });

    // Configurar a navegação por ancoras na primeira barra de navegação
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const linkId = link.id;
            setActiveNavLink(linkId);
        });
    });
});

function setActiveLink(id) {
    // Remove a classe 'active' de todos os links da navbar de projetos
    document.querySelectorAll('.project-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Adiciona a classe 'active' ao link clicado
    document.getElementById(id).classList.add('active');

    // Salva o link ativo no localStorage
    localStorage.setItem('activeLink', id);

    // Mostrar a lista correspondente
    document.querySelectorAll('.project-list').forEach(list => {
        list.style.display = 'none';
    });

    const listToShow = document.getElementById(`list${id.charAt(id.length - 1)}`);
    if (listToShow) {
        listToShow.style.display = 'block';
    }
}

function setActiveNavLink(id) {
    // Remove a classe 'active' de todos os links da navbar principal
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Adiciona a classe 'active' ao link clicado
    document.getElementById(id).classList.add('active');
}
