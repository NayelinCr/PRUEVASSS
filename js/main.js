/* 🎀 Estilo principal del portafolio de Nayelin (versión mejorada) 🎀 */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  scroll-behavior: smooth;
}

/* ===== Fondo general ===== */
body {
  background: linear-gradient(135deg, #3d2b57, #4e2d70, #6541a1);
  color: #f0eaff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== HERO PRINCIPAL ===== */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  background: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1350&q=80')
    center/cover no-repeat fixed;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(54, 23, 93, 0.6);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  padding: 0 20px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
}

h2 {
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 20px;
  color: #e6d3ff;
}

p {
  font-size: 1.1rem;
  font-weight: 300;
  margin-bottom: 25px;
  color: #d9c6ff;
}

/* ===== BOTONES ===== */
.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  background: linear-gradient(135deg, #8c5ef2, #a178ff);
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(140, 94, 242, 0.3);
}

.btn:hover {
  background: linear-gradient(135deg, #a178ff, #b48aff);
  transform: scale(1.08);
  box-shadow: 0 0 18px rgba(176, 143, 255, 0.6);
}

/* ===== MENÚ DE UNIDADES ===== */
.menu {
  text-align: center;
  padding: 60px 20px 100px;
  background: linear-gradient(180deg, #4a3274, #3d2b57);
  flex: 1;
}

.menu h2 {
  color: #bba8ff;
  margin-bottom: 25px;
  font-size: 2rem;
}

.menu ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  margin-bottom: 60px;
}

.menu a {
  background: #5d3d8a;
  color: #e8dbff;
  padding: 12px 22px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.2);
}

.menu a:hover {
  background: #7c5bb3;
  transform: scale(1.08);
}

/* ===== FOOTER ===== */
footer {
  text-align: center;
  padding: 20px;
  font-size: 0.9rem;
  background: #34224c;
  color: #cbb8ff;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* ===== BOTÓN VOLVER ARRIBA ===== */
#btnArriba {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 100;
  background: linear-gradient(135deg, #6c3fd8, #8a62ff);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 14px 17px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

#btnArriba:hover {
  transform: scale(1.15);
  background: linear-gradient(135deg, #8a62ff, #6c3fd8);
}

#btnArriba.mostrar {
  opacity: 1;
  pointer-events: auto;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  h1 {
    font-size: 2.2rem;
  }
  .btn {
    padding: 10px 18px;
  }
}

