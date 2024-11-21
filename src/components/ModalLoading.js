import React from 'react';

const ModalLoading = () => (
    <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body text-center">
                    <span className="sr-only">Gerando relatório...</span>
                <div className="spinner-border text-primary" role="status"></div>
                <p>Por favor, aguarde. O relatório está sendo gerado.</p>
                </div>
            </div>
        </div>
  </div>
);

export default ModalLoading;
