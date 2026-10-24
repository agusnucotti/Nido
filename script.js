// ===== FILTRO DE CATEGORÍAS =====

// 1. Buscamos todos los botones y todos los productos
const botones = document.querySelectorAll('.filtro');
const productos = document.querySelectorAll('.producto');

// 2. Esta función muestra solo los productos de la categoría elegida
function filtrar(categoria) {
  // Marcamos como "activo" el botón que coincide
  botones.forEach(function (boton) {
    boton.classList.toggle('activo', boton.dataset.filtro === categoria);
  });

  // Ocultamos los productos que no son de esa categoría
  productos.forEach(function (producto) {
    const esDeOtraCategoria = producto.dataset.categoria !== categoria;
    producto.classList.toggle('oculto', categoria !== 'todos' && esDeOtraCategoria);
  });
}

// 3. Cada botón filtra cuando le hacen clic
botones.forEach(function (boton) {
  boton.addEventListener('click', function () {
    filtrar(boton.dataset.filtro);
  });
});


// ===== FICHA DE PRODUCTO =====
// Al tocar un producto se abre una ventana con su foto, precio y descripción.

const ficha = document.querySelector('#ficha');

function abrirFicha(producto) {
  const imagen = producto.querySelector('img');
  ficha.querySelector('.ficha-imagen').src = imagen.src;
  ficha.querySelector('.ficha-imagen').alt = imagen.alt;
  ficha.querySelector('.ficha-categoria').textContent = producto.querySelector('.categoria').textContent;
  ficha.querySelector('.ficha-nombre').textContent = producto.querySelector('h4').textContent;
  ficha.querySelector('.ficha-precio').textContent = producto.querySelector('.precio').textContent;
  ficha.querySelector('.ficha-descripcion').textContent = producto.querySelector('.descripcion').textContent;
  ficha.showModal();
}

productos.forEach(function (producto) {
  producto.addEventListener('click', function () {
    abrirFicha(producto);
  });
  // Con teclado: Enter abre la ficha
  producto.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') abrirFicha(producto);
  });
});

ficha.querySelector('.ficha-cerrar').addEventListener('click', function () {
  ficha.close();
});

// Tocar afuera de la ficha (el fondo oscuro) también la cierra
ficha.addEventListener('click', function (evento) {
  if (evento.target === ficha) ficha.close();
});

// "Consultar" abre el Instagram en otra pestaña y cierra la ficha
ficha.querySelector('.ficha-consultar').addEventListener('click', function () {
  ficha.close();
});


// ===== SUSCRIPCIÓN (FOOTER) =====
// Por ahora los datos no se envían a ningún lado: solo se muestra el mensaje de gracias.

const newsletter = document.querySelector('.newsletter');

newsletter.addEventListener('submit', function (evento) {
  evento.preventDefault(); // evita que la página se recargue
  newsletter.reset();
  newsletter.querySelector('.newsletter-gracias').hidden = false;
});


// ===== MENÚ HAMBURGUESA (CELULAR) =====

const nav = document.querySelector('.nav');
const menuBoton = document.querySelector('.menu-boton');

function cerrarMenu() {
  nav.classList.remove('abierto');
  menuBoton.setAttribute('aria-expanded', 'false');
  menuBoton.setAttribute('aria-label', 'Abrir menú');
}

menuBoton.addEventListener('click', function () {
  const abierto = nav.classList.toggle('abierto');
  menuBoton.setAttribute('aria-expanded', abierto);
  menuBoton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});

// Cualquier link del menú cierra el panel en celular
document.querySelectorAll('.menu a').forEach(function (link) {
  link.addEventListener('click', cerrarMenu);
});


// ===== LINKS QUE FILTRAN EL CATÁLOGO =====
// Los links del submenú de Productos, los "Ver modelos" de la colección
// y el botón de la portada tienen data-ir con la categoría a mostrar.

document.querySelectorAll('[data-ir]').forEach(function (link) {
  link.addEventListener('click', function () {
    filtrar(link.dataset.ir);
    link.blur(); // en compu, cierra el desplegable después del clic
  });
});