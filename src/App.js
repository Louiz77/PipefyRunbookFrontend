import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ReportForm from './components/ReportForm';
import ModalLoading from './components/ModalLoading';
import ModalSuccess from './components/ModalSuccess';
import HomePage from './components/HomePage';
import Conta from './auth/Conta';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = (formElement) => {
    setIsGenerating(true);

    const fetchOptions = {
      method: 'POST',
      body: new FormData(formElement),
    };

    fetch('http://localhost:8530/relatorios/gerar', fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'Relatório em processamento') {
          const reportId = data.report_id;

          // Verifica o status do relatório periodicamente
          const interval = setInterval(() => {
            fetch(`http://localhost:8530/relatorios/status/${reportId}`)
              .then((response) => response.json())
              .then((statusData) => {
                if (statusData.status === 'pronto') {
                  clearInterval(interval); // Para de verificar o status
                  setDownloadUrl(statusData.download_url); // Armazena o link de download
                  setSuccess(true);
                  setIsGenerating(false);
                }
              });
          }, 3000); // Verifica a cada 3 segundos
        }
      })
      .catch((error) => {
        console.error('Erro ao gerar o relatório:', error);
        setIsGenerating(false);
      });
  };

  const handleCloseModal = () => {
    setSuccess(false);
  };

  return (
    <Router>
      <Navbar />
      <div className="d-flex">
        <div className="container my-5">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomePage />
                </>
              }
            />
            <Route
              path="/relatorios"
              element={
                <>
                  <h1 className="my-5 text-center">Runbook - Relatório</h1>
                  <ReportForm handleSubmit={handleSubmit} />
                  {isGenerating && <ModalLoading />}
                  {success && (
                    <ModalSuccess
                      onClose={handleCloseModal}
                      downloadUrl={downloadUrl} // Passa o link de download para o modal
                    />
                  )}
                </>
              }
            />
            <Route
              path="/conta"
              element={
                <>
                  <h1 className="my-2 text-center">Entre na sua conta ITFácil Dashboard</h1>
                  <p className="text-center">Coloque as suas informações de login abaixo</p>
                  <Conta />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
