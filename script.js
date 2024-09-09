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


function scrollProjects(direction) {
  // Elementos do carrossel
  const imageList = document.getElementsByClassName("image-list")[0]; // seleciona o elemento que contém todas as imagens
  const items = document.querySelectorAll(".image-item");             // Pega todas as imagens
  const totalItems = items.length; // TODO: totalItems precisa ser 4  // armazena o número total de itens.
  const containerWidth = document.querySelector(".image-list").getBoundingClientRect().width; //  Largura do contêiner de um item (assumindo que todos têm a mesma largura).
  //console.log('Largura do contêiner de um item', containerWidth);
  const itemWidth = items[0].getBoundingClientRect().width;           // Largura de um item
  //console.log('Largura de um item', itemWidth);

  // Calcula dinamicamente quantos itens cabem visíveis no contêiner
  const visibleItems = Math.floor(containerWidth / itemWidth);
  //console.log('quantos itens cabem visíveis no contêiner', visibleItems);

  // Controle de índice de rolagem
  let currentIndex = parseInt(imageList.getAttribute('data-current-index')) || 0; // Usando data attribute para persistir o estado

  // Atualiza o índice de acordo com a direção
  currentIndex += direction;
  console.log('índice de acordo com a direção', currentIndex);
  console.log('totalitens', totalItems);
  console.log('quantos itens cabem visíveis no contêiner', visibleItems);
  // Limita o índice para evitar rolar para fora dos limites
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > totalItems - visibleItems) {
    currentIndex = totalItems - visibleItems;
  }

  // Calcula o deslocamento e aplica a transformação
  const offset = -(itemWidth * currentIndex);
  imageList.style.transform = `translateX(${offset}px)`;

  // Atualiza o atributo data-current-index para manter o estado
  imageList.setAttribute('data-current-index', currentIndex);

  // Adiciona um listener para o redimensionamento da janela dentro da mesma função
  window.addEventListener('resize', function () {
    console.log('aaaaa');
    const newContainerWidth = document.querySelector(".image-list").getBoundingClientRect().width;
    const newVisibleItems = Math.floor(newContainerWidth / itemWidth);
    // console.log('novo tamanho do container', newContainerWidth);
    // console.log('novo tanto de itens visiveis', newVisibleItems);

    if (currentIndex > totalItems - newVisibleItems) {
      currentIndex = totalItems - newVisibleItems;
      if (currentIndex < 0) {
        currentIndex = 0;
      }
    }

    const newOffset = -(itemWidth * currentIndex);
    imageList.style.transform = `translateX(${newOffset}px)`;
  });
}

