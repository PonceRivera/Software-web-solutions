import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import useScrollAnimation from '../hooks/useScrollAnimation';
import Modal from './Modal';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const slides = [
    {
      id: 1,
      image: '/Cris.jpeg',
      title: 'Geovani',
      description: 'Geovani Alberto Rodriguez Soliz - Desarrollador Junior (1 año aprendiendo a programar. 1 experiencia laboral).',
      detailedInfo: {
        experience: '1 año de experiencia en desarrollo de software, enfocándose en tecnologías web modernas y robótica.',
        skills: [
          'JavaScript (React, Node.js, Angular)',
          'Java para robótica',
          'HTML5 y CSS3',
          'Git y control de versiones'
        ],
        // projects: [
        //   'Sistema de control para robot FRC 2025',
        //   'Aplicación web de gestión de inventarios',
        //   'Dashboard de monitoreo en tiempo real',
        //   'API RESTful para manejo de datos'
        // ],
        achievements: [
          'Participación en FRC 2025 - Semifinalista',
          'Lider suplente en el equipo de programación',
        ],
        //additionalInfo: 'Geovani es un desarrollador apasionado por la innovación tecnológica, especialmente en el área de robótica y desarrollo web. Su enfoque en el aprendizaje continuo y la resolución de problemas lo convierte en un valioso miembro del equipo.'
      }
    },
    {
      id: 2,
      image: '/Geo.jpeg',
      title: 'Cristohper',
      description: 'Cristohper Alejandro Ponce Rivera - Desarrollador Junior (4 años Aprendiendo a programar y 1 año de experiencia laboral).',
      detailedInfo: {
        experience: '4 años de formación autodidacta en programación y 1 año de experiencia laboral profesional en desarrollo de software.',
        skills: [
          'JavaScript (React, Angular, Node.js)',
          'Java y programación orientada a objetos',
          'Bases de datos (Firebase)',
          'DevOps y despliegue de aplicaciones',
          'Metodologías ágiles (Scrum)',
          'Programación de robots y sistemas'
        ],
        // projects: [
        //   'Plataforma e-commerce completa',
        //   'Sistema de gestión empresarial',
        //   'Aplicación móvil con React Native',
        //   'Bot de automatización con IA',
        //   'Sistema de control robótico avanzado'
        // ],
        achievements: [
          'Líder de Programacion en competencia FRC 2025',
          'Semifinalista FRC Torreon 2025 y 5to lugar en FRC Monterrey 2025',
          'Desarrollador principal en 3 proyectos comerciales'
        ],
        //additionalInfo: 'Cristopher es el líder técnico del equipo, con amplia experiencia en desarrollo full-stack y robótica. Su visión estratégica y habilidades de liderazgo han sido fundamentales para el éxito de múltiples proyectos. Combina conocimientos técnicos sólidos con una excelente capacidad de comunicación y trabajo en equipo.'
      }
    },
    {
      id: 3,
      image: '/Premios.jpeg',
      title: 'Premios',
      description: 'Premios y reconocimientos obtenidos por haber llegado a la semifinal de una competencia de FRC (First Robotics Competition) en el año 2025 en la ciudad de Torreón, Coahuila. Demostrando que nuestro software es desarrollado por un equipo talentoso y dedicado a nuestro robot'
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

  const openModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <section className="hero-section">
      <AnimatedBackground />
      <div 
        ref={headerRef}
        className={`members-header ${headerVisible ? 'animate-in' : 'animate-out'}`}
      >
        <h1>MEMBERS</h1>
        <p className="members-subtitle">Descubre nuestras mejores soluciones</p>
      </div>
      
      <div 
        ref={gridRef}
        className={`carousels-grid ${gridVisible ? 'animate-in' : 'animate-out'}`}
      >
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
                <button 
                  className="card-button"
                  onClick={() => openModal(slide)}
                >
                  {index === 0 ? 'Ver Detalles': index === 1 ? 'Ver Detalles' : 'Ver Más'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Modal 
        isOpen={modalOpen}
        onClose={closeModal}
        data={selectedMember}
      />
    </section>
  );
};

export default HeroSection;