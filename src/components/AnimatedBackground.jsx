import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configurar el canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Partículas flotantes
    const particles = [];
    const numParticles = 50;
    
    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#667eea' : '#764ba2'
      });
    }

    // Ondas de fondo
    let waveOffset = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo base con gradiente
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.3, '#16213e');
      gradient.addColorStop(0.7, '#0f3460');
      gradient.addColorStop(1, '#533483');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Ondas animadas
      ctx.save();
      ctx.globalAlpha = 0.1;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? '#667eea' : '#764ba2';
        ctx.lineWidth = 2;
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.3 + 
                   Math.sin((x + waveOffset + i * 100) * 0.01) * 50 +
                   Math.sin((x + waveOffset * 1.5 + i * 150) * 0.005) * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      ctx.restore();
      
      // Partículas animadas
      particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Conexiones entre partículas cercanas
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      // Formas geométricas flotantes
      ctx.save();
      ctx.globalAlpha = 0.05;
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width * 0.2) + (i * canvas.width * 0.2);
        const y = canvas.height * 0.5 + Math.sin(time + i) * 100;
        const size = 50 + Math.sin(time * 0.5 + i) * 20;
        
        ctx.fillStyle = i % 2 === 0 ? '#667eea' : '#764ba2';
        ctx.fillRect(x - size/2, y - size/2, size, size);
        
        // Círculos
        ctx.beginPath();
        ctx.arc(x, y + 150, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
      
      waveOffset += 2;
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="animated-background-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <div className="static-background-overlay" />
    </>
  );
};

export default AnimatedBackground;