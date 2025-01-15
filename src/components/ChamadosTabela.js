import React, { useEffect, useState } from 'react';
import { Table, Alert, Spinner, Badge, Button } from 'react-bootstrap';

const ChamadosTable = () => {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false); // Estado para controlar o spinner do download

  // buscar dados do backend
  const fetchChamados = async () => {
    try {
      const response = await fetch('http://10.5.8.145:5000/api/chamados');
      if (response.ok) {
        const data = await response.json();
        setChamados(data);
        console.log(data);
      } else {
        setError('Erro ao carregar os dados.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChamados();
  }, []);

  const handleDownload = async () => {
    setDownloading(true); // Exibe o spinner de download
    try {
      const response = await fetch('http://10.5.8.145:5000/report/generate', {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_chamados.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Erro ao gerar relatório:', response.statusText);
        alert('Erro ao gerar relatório. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      alert('Erro ao gerar relatório. Por favor, tente novamente.');
    } finally {
      setDownloading(false); // Oculta o spinner de download
    }
  };

  return (
    <div className="my-5">
      <h1 className="text-center mb-4">Chamados Faturados</h1>
      {chamados.length > 0 ? (
        chamados
          .filter((chamado) => chamado.TOTAL !== null && chamado.TOTAL !== undefined)
          .map((chamado, index) => (
            <h3 key={index} className="text-center">
              Horas totais: <Badge bg="secondary">{chamado.TOTAL}</Badge>
            </h3>
          ))
      ) : (
        <h2 className="text-center">Nenhum chamado registrado.</h2>
      )}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Carregando dados...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-grid gap-2 m-5">
        <Button variant="success" onClick={handleDownload} disabled={downloading}>
          {downloading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {' '}Gerando Relatório...
            </>
          ) : (
            'Baixar Relatório'
          )}
        </Button>
      </div>

      {!loading && !error && (
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição do Analista</th>
              <th>Data</th>
              <th>Solicitante</th>
              <th>Descrição da Solicitação</th>
              <th>Hora Inicial</th>
              <th>Hora Final</th>
              <th>Horas</th>
            </tr>
          </thead>
          <tbody>
            {chamados.length > 0 ? (
              chamados.map((chamado, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{chamado.descricaoAnalista}</td>
                  <td>{chamado.data}</td>
                  <td>{chamado.solicitante}</td>
                  <td>{chamado.descricaoSolicitacao}</td>
                  <td>{chamado.horaInicial}</td>
                  <td>{chamado.horaFinal}</td>
                  <td>{chamado.totalHoras}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Nenhum chamado registrado.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ChamadosTable;
