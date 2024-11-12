document.addEventListener("DOMContentLoaded", function () {
  // Restaurar o link ativo da navbar do localStorage
  const currentActiveLinkId = localStorage.getItem("activeLink");
  if (currentActiveLinkId) {
    setActiveLink(currentActiveLinkId);                                             //Função para a segunda Navbar
  } else {
    // Se não houver link ativo no localStorage, definir um padrão
    const defaultLinkId = "link1"; // ID do link que você quer como padrão
    setActiveLink(defaultLinkId);
  }

  // Configurar as barras de progresso 
  const progressContainers = document.querySelectorAll(".progress-container");
  progressContainers.forEach((container) => {
    const percentage = container.getAttribute("data-percentage");
    const progressBar = container.querySelector(".progress-bar");
    progressBar.style.width = percentage + "%";
  });

  // Configurar a exibição das listas de projetos
  const projectLinks = document.querySelectorAll(".project-nav .nav-link");
  projectLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const linkId = link.id;
      setActiveLink(linkId);
    });
  });

  // Configurar a navegação por ancoras na primeira barra de navegação
  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveNavLink(link);
    });
  });
});


function setActiveLink(id) {
  // Remove a classe 'active' de todos os links da navbar de projetos
  document.querySelectorAll(".project-nav .nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Adiciona a classe 'active' ao link clicado
  document.getElementById(id).classList.add("active");

  // Salva o link ativo no localStorage
  localStorage.setItem("activeLink", id);

  // Mostrar a lista correspondente
  document.querySelectorAll(".project-list").forEach((list) => {
    list.style.display = "none";
  });

  const listToShow = document.getElementById(`list${id.charAt(id.length - 1)}`);
  if (listToShow) {
    listToShow.style.display = "block";
  }
}


function setActiveNavLink(element) {   
  // Remove a classe 'active' de todos os links da navbar principal
  document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Adiciona a classe 'active' ao link clicado
  element.classList.add("active");
}


function scrollProjects(imageList, direction) {
  // Agora 'imageList' é específico para o carrossel da lista visível

  const items = imageList.querySelectorAll(".image-item"); // Pega todas as imagens dessa lista
  const totalItems = items.length;
  const containerWidth = imageList.getBoundingClientRect().width; // Largura do contêiner
  const itemWidth = items[0].getBoundingClientRect().width;

  const visibleItems = Math.floor(containerWidth / itemWidth); // Quantos itens visíveis

  let currentIndex = parseInt(imageList.getAttribute('data-current-index')) || 0; // Índice do carrossel

  // Atualiza o índice conforme a direção (exemplo: para frente ou para trás)
  currentIndex += direction;

  // Limita o índice para não ultrapassar os limites
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > totalItems - visibleItems) {
    currentIndex = totalItems - visibleItems;
  }

  const offset = -(itemWidth * currentIndex);
  imageList.style.transform = `translateX(${offset}px)`;

  imageList.setAttribute('data-current-index', currentIndex);
  window.addEventListener('resize', function () {
    const newContainerWidth = imageList.getBoundingClientRect().width;
    const newVisibleItems = Math.floor(newContainerWidth / itemWidth);

    if (currentIndex > totalItems - newVisibleItems) {
      currentIndex = totalItems - newVisibleItems;
    }

    const newOffset = -(itemWidth * currentIndex);
    imageList.style.transform = `translateX(${newOffset}px)`;
  });
}
