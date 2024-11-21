import React from 'react';

const ModalSuccess = ({ onClose, downloadUrl }) => {
  const handleDownload = () => {
    if (downloadUrl) {
      console.log(`Tentando abrir o link: ${downloadUrl}`);
      window.open(downloadUrl, '_blank');
    } else {
      console.error('Download URL está vazio ou indefinido.');
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Relatório Gerado</h5>
          </div>
          <div className="modal-body">
            <p>O relatório foi gerado com sucesso. Você pode baixá-lo clicando no botão abaixo.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleDownload} // Chama a função handleDownload
            >
              Baixar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
