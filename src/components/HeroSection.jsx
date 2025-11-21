import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/Cris.jpeg',
      title: 'Geo',
      description: 'Descripción pendiente para Geo'
    },
    {
      id: 2,
      image: '/Geo.jpeg',
      title: 'Cris',
      description: 'Descripción pendiente para Cris'
    },
    {
      id: 3,
      image: '/Premios.jpeg',
      title: 'Premios',
      description: 'Descripción pendiente para Premios'
    }
  ];

  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section">
      <AnimatedBackground />
      <div className="Members-header">
        <h1>MEMBERS</h1>
        <p className="members-subtitle">Descubre nuestras mejores soluciones</p>
      </div>
      
      <div className="carousels-grid">
        {slides.map((slide, index) => (
          <div key={slide.id} className="single-carousel">
            <div className="product-card">
              <div className="card-image-container">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{slide.title}</h3>
                <p className="card-description">{slide.description}</p>
                <button className="card-button">
                  {index === 0 ? 'Descripcion detallada': index === 1 ? 'Descripcion Detallada' : 'Descripcion Detallada'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;