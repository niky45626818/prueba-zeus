// === Menú hamburguesa ===
const topBar = document.querySelector('.top-bar');
const toggle = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('menu-close');
const menu = document.getElementById('menu');

function openMenu() {
  topBar.classList.add('menu-open');
  if (menu) menu.classList.add('open');
}

function closeMenu() {
  topBar.classList.remove('menu-open');
  if (menu) menu.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  if (toggle) toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (menu && !menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  if (menu) {
    menu.addEventListener('click', (e) => e.stopPropagation());
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const total = cards.length;
  let index = 1;
  let autoSlide;

  if (!track || cards.length === 0) return;

  const visibleCards = window.innerWidth <= 768 ? 1 : 3;

  function updateCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    cards.forEach(card => card.classList.remove('active'));

    const visibleCards = window.innerWidth <= 500 ? 1 :
                         window.innerWidth <= 768 ? 2 : 3;

    const centerIndex = index + Math.floor(visibleCards / 2);
    if (cards[centerIndex]) {
      cards[centerIndex].classList.add('active');
    }

    const cardWidth = track.offsetWidth / visibleCards;
    const offset = -index * cardWidth;
    track.style.transform = `translateX(${offset}px)`;

    const contador = document.getElementById('current-slide');
    if (contador) contador.textContent = index + 1;
  }

  function moverCarrusel(dir) {
    index = (index + dir + total) % total;
    updateCarousel();
    detenerAutoSlide();
  }

  function iniciarAutoSlide() {
    autoSlide = setInterval(() => moverCarrusel(1), 4000);
  }

  function detenerAutoSlide() {
    clearInterval(autoSlide);
  }

  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  if (leftArrow) leftArrow.addEventListener('click', () => moverCarrusel(-1));
  if (rightArrow) rightArrow.addEventListener('click', () => moverCarrusel(1));

  track.addEventListener('mouseenter', detenerAutoSlide);
  track.addEventListener('mouseleave', iniciarAutoSlide);

  updateCarousel();
  iniciarAutoSlide();
});

// ————————————————
// Scroll animations for planos & pisos
// ————————————————
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.plano-general .contenido-plano, .seccion-planta');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // añade la clase que dispara la animación
        el.classList.add('in-view');
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    // para cada sección, observa tanto imagen como texto
    const img = section.querySelector('img');
    const txt = section.querySelector('h2, .texto-plano, .descripcion-planta');
    if (img) scrollObserver.observe(img);
    if (txt) scrollObserver.observe(txt);
  });
});

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionamos todos los boxes
  const boxes = document.querySelectorAll(".apartment-box");

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      // Si ya estaba expandido, lo colapsamos; si no, expandimos este y colapsamos los demás
      const isExpanded = box.classList.contains("expanded");

      // Primero, colapsar todos
      boxes.forEach(b => b.classList.remove("expanded"));

      // Si NO estaba expandido, lo expandimos; si ya estaba, lo dejamos colapsado (ya lo quitamos arriba)
      if (!isExpanded) {
        box.classList.add("expanded");
      }
    });
  });
});




document.addEventListener("DOMContentLoaded", () => {
  if (typeof Glide !== "undefined") {
    const glide = new Glide("#glide-portada", {
      type: "carousel",
      autoplay: 5000,
      animationDuration: 800,
      startAt: 0 // 👈 asegura que arranque en la primera imagen
    });

    const portadaOverlay = document.getElementById("portada-overlay");
    const obraOverlay = document.getElementById("obra-overlay");

    // Estado inicial
    glide.on("mount.after", () => {
      portadaOverlay.classList.remove("hidden");
      obraOverlay.classList.remove("visible");
    });

    // Al cambiar de slide
    glide.on("run.after", () => {
      const currentIndex = glide.index;
      if (currentIndex === 0) {
        portadaOverlay.classList.remove("hidden");
        obraOverlay.classList.remove("visible");
      } else {
        portadaOverlay.classList.add("hidden");
        obraOverlay.classList.add("visible");
      }
    });

    glide.mount();
  }
});



