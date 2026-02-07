import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/imageHelper';
import './PromoCarousel.css';

function PromoCarousel({ productos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagenesPromo, setImagenesPromo] = useState([]);

  useEffect(() => {
    // Imágenes promocionales fijas
    const imagenes = [
      {
        url: 'https://tse1.mm.bing.net/th/id/OIP.w5hHtdr3_T8Lw_8DQyNtCwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
        productoNombre: 'Promoción 1'
      },
      {
        url: 'https://www.guatemala.com/fotos/201705/Promociones-por-el-Dia-Internacional-de-la-Hamburguesa-en-Guatemala.png',
        productoNombre: 'Promoción 2'
      }
    ];
    
    // Agregar la tercera imagen de los productos (si existe)
    productos.forEach(producto => {
      if (producto.imagenes && producto.imagenes.length > 0) {
        producto.imagenes.forEach(img => {
          if (imagenes.length < 3) {
            imagenes.push({
              url: getImageUrl(img.url),
              productoNombre: producto.nombre
            });
          }
        });
      }
    });
    
    setImagenesPromo(imagenes);
  }, [productos]);

  useEffect(() => {
    if (imagenesPromo.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === imagenesPromo.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [imagenesPromo.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imagenesPromo.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imagenesPromo.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (imagenesPromo.length === 0) {
    return null;
  }

  return (
    <div className="promo-carousel">
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={goToPrevious} aria-label="Anterior">
          ‹
        </button>
        
        <div className="carousel-slides">
          {imagenesPromo.map((imagen, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img 
                src={imagen.url} 
                alt={`Promoción ${imagen.productoNombre}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x400?text=Promoción';
                }}
              />
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={goToNext} aria-label="Siguiente">
          ›
        </button>
      </div>

      <div className="carousel-indicators">
        {imagenesPromo.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoCarousel;

