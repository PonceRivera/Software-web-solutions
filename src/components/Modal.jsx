import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <img 
            src={data.image} 
            alt={data.title}
            className="modal-image"
          />
          <h2 className="modal-title">{data.title}</h2>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h3>Información General</h3>
            <p>{data.description}</p>
          </div>
          
          {data.detailedInfo && (
            <div className="modal-section">
              <h3>Información Detallada</h3>
              <div className="detailed-info">
                {data.detailedInfo.experience && (
                  <div className="info-item">
                    <strong>Experiencia:</strong>
                    <p>{data.detailedInfo.experience}</p>
                  </div>
                )}
                
                {data.detailedInfo.skills && (
                  <div className="info-item">
                    <strong>Habilidades:</strong>
                    <ul>
                      {data.detailedInfo.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.detailedInfo.projects && (
                  <div className="info-item">
                    <strong>Proyectos Destacados:</strong>
                    <ul>
                      {data.detailedInfo.projects.map((project, index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.detailedInfo.achievements && (
                  <div className="info-item">
                    <strong>Logros:</strong>
                    <ul>
                      {data.detailedInfo.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {data.detailedInfo.additionalInfo && (
                  <div className="info-item">
                    <strong>Información Adicional:</strong>
                    <p>{data.detailedInfo.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;