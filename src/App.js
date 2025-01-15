import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ReportForm from './components/pages/ReportForm';
import ModalLoading from './components/ModalLoading';
import ModalSuccess from './components/ModalSuccess';
import HomePage from './components/pages/HomePage';
import Conta from './auth/Conta';
import Cirion from './components/pages/CirionReport'
import ChamadosFaturados from './components/pages/TotvsControl'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGrid from './components/CardGrid';

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

    fetch('http://10.5.8.145:8535/relatorios/gerar', fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'Relatório em processamento') {
          const reportId = data.report_id;

          // Verifica o status do relatório periodicamente
          const interval = setInterval(() => {
            fetch(`http://10.5.8.145:8535/relatorios/status/${reportId}`)
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
                  <CardGrid />
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
                  <div className='m-5'/>
                  <CardGrid className="m-5" />
                </>
              }
            />
            <Route
              path="/cirion"
              element={
                <>
                  <Cirion className="m-5"/>
                </>
              }
            />
            <Route
              path='/chamados'
              element={
                <>
                <ChamadosFaturados className='m-2'/>
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
