import { useState, useEffect, useRef } from "react";
import banner1 from "./assets/bannerlanding1.png";
import banner2 from "./assets/2banner.png";
import banner3 from "./assets/3banner.png";
import carne from "./assets/Carne.jpg";
import pasta from "./assets/Pasta.jpg";
import postre from "./assets/Postre.jpg";
import "./App.css";

function App() {

  // NAV
  const [showNav, setShowNav] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowNav(current < lastScroll.current || current < 100);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // HERO
  const banners = [banner1, banner2, banner3];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // MOMENTOS (no cambio tu lógica, solo fix de carga)
  const images = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // MENU
  const [categoria, setCategoria] = useState("todos");

  const menu = [
    { tipo: "pasta", nombre: "Pasta artesanal", desc: "Ravioles con manteca de salvia", precio: "$8.500" },
    { tipo: "carne", nombre: "Carnes al fuego", desc: "Ojo de bife con papas rústicas", precio: "$12.000" },
    { tipo: "postre", nombre: "Postres caseros", desc: "Cheesecake con frutos rojos", precio: "$4.500" }
  ];

  const filtrado =
    categoria === "todos"
      ? menu
      : menu.filter((item) => item.tipo === categoria);

  const fondoPorCategoria = { pasta, carne, postre };

  return (
    <div className="bg-[#0a0d0c] text-white font-serif">

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition ${showNav ? "translate-y-0" : "-translate-y-full"} bg-black/40 backdrop-blur-md`}>
        <div className="max-w-6xl mx-auto flex justify-between px-6 py-3">
          <span className="text-[#b8965b] tracking-widest">Valonia</span>
          <div className="space-x-6 text-sm">
            <a href="#inicio">Inicio</a>
            <a href="#menu">Menú</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">

        {banners.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              i === heroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1.5px]" />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10">
          <h1 className="text-7xl mb-4 glow">Valonia</h1>
          <p className="text-xl mb-6 text-gray-300">
            Cocina europea en un entorno cálido y natural
          </p>
          <a href="https://wa.me/5491138175256" className="btn-premium">
            Reservar mesa
          </a>
        </div>
      </section>

      {/* ESENCIA (no tocado) */}
      <section className="py-24 px-6 flex justify-center">
        <div className="max-w-3xl text-center glass-card">
          <h2 className="section-title">Nuestra esencia</h2>
          <p className="text-gray-300">
            En Valonia combinamos ingredientes frescos con técnicas tradicionales europeas.
          </p>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="relative py-20 text-center overflow-hidden">

        <div
          key={categoria}
          className="absolute inset-0 animate-zoomSlow"
          style={{
            backgroundImage:
              categoria === "todos"
                ? "none"
                : `url(${fondoPorCategoria[categoria]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.55)"
          }}
        />

        <div className="absolute inset-0 bg-black/40" />

        <h2 className="section-title relative z-10">Menú</h2>

        <div className="flex justify-center gap-4 mb-10 relative z-10">
          {["todos", "pasta", "carne", "postre"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className="btn-filter"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {filtrado.map((item, i) => (
            <div key={i} className="menu-card premium-card hover:scale-105 transition">
              <h3>{item.nombre}</h3>
              <p>{item.desc}</p>
              <span>{item.precio}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MOMENTOS (como lo tenías, solo fix carga) */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="section-title">Momentos Valonia</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <img src={images[index]} className="gallery-img" />
          <img src={images[(index + 1) % images.length]} className="gallery-img" />
        </div>
      </section>

      {/* CONTACTO (sin iconos, limpio) */}
      <section id="contacto" className="py-28 text-center">

        <h2 className="section-title">Contacto</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">

          <div className="glass-card">
            <h3>Ubicación</h3>
            <p>Av. Siempre Viva 742</p>
            <a href="https://www.google.com/maps" target="_blank">
              Ver en Google Maps
            </a>
          </div>

          <div className="glass-card">
            <h3>Horarios</h3>
            <p>Lunes a Domingo</p>
            <p>12:00 - 00:00</p>
          </div>

          <div className="glass-card">
            <h3>Reservas</h3>
            <a href="https://wa.me/5491138175256">
              WhatsApp
            </a>
          </div>

        </div>

      </section>

      {/* FOOTER (CORRECTO COMO PEDISTE) */}
      <footer className="bg-black border-t border-[#b8965b]/20 py-12">

        <div className="max-w-6xl mx-auto px-2 flex justify-between items-center">

          {/* IZQUIERDA */}
          <div className="text-gray-400 text-sm">
            <p>Direccion:</p>
            <p>Av. San Martín 742</p>
            <p>Telefono:</p>
            <p>+54 11 3817 5256</p>
          </div>

          {/* CENTRO */}
          <div className="text-center">
            <h3 className="text-[#b8965b] glow text-xl">⚜️Valonia</h3>

            <p className="text-gray-500 text-sm mt-1">
              © Valonia - Todos los derechos reservados
            </p>

            <div className="text-[#b8965b] text-sm tracking-widest glow mt-2">
              {"</CodeMoon🌙>"}
            </div>
          </div>

          <div></div>

        </div>

      </footer>

    </div>
  );
}

export default App;