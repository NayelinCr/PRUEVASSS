/* 🎀 Script principal del Portafolio de Nayelin 🎀
   Funcionalidad: botón "Volver arriba" y efectos suaves de desplazamiento.
*/

document.addEventListener("DOMContentLoaded", () => {
  const btnArriba = document.getElementById("btnArriba");

  if (!btnArriba) return; // seguridad: evita errores si el botón no existe

  // 🔹 Mostrar el botón cuando el usuario baja más de 200px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnArriba.classList.add("mostrar");
    } else {
      btnArriba.classList.remove("mostrar");
    }
  });

  // 🔹 Al hacer clic, desplaza suavemente al inicio
  btnArriba.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

