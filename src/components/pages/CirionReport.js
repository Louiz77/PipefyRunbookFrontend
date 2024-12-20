import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BackupStatusPage = () => {
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]); // Para armazenar os dados filtrados
  const [date, setDate] = useState([null]);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All"); // Filtro para status

  async function atualizarPlanilha() {
    const url = "http://10.5.8.145:5050/backup/check";
    
    const spinner = document.getElementById('spinner');
    const mensagemErro = document.getElementById('mensagemErro');
    spinner.style.display = 'block';
    mensagemErro.style.display = 'none';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          mensagemErro.innerText = "Nenhum novo e-mail encontrado para atualizar a planilha.";
          mensagemErro.style.display = 'block';
          return;
        }
        throw new Error(`Erro: ${response.status}`);
      }

      // Refresh automático após sucesso
      fetchData();
    } catch (error) {
      console.error(error.message);
      mensagemErro.innerText = "Ocorreu um erro ao atualizar a planilha.";
      mensagemErro.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  }

  async function gerarPDF() {
    const url = "http://10.5.8.145:5050/backup/report";

    const spinner = document.getElementById('spinner');
    const mensagemErro = document.getElementById('mensagemErro');
    spinner.style.display = 'block';
    mensagemErro.style.display = 'none';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                mensagemErro.innerText = "Não foi possível gerar o PDF.";
                mensagemErro.style.display = 'block';
                return;
            }
            throw new Error(`Erro: ${response.status}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;

        //nome do arquivo para download
        link.download = "relatorio_comparativo_cirion.pdf";
        document.body.appendChild(link);
        link.click();

        //cleana URL apos download
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);

        //refresh automático apos sucesso
        fetchData();
    } catch (error) {
        console.error(error.message);
        mensagemErro.innerText = "Ocorreu um erro ao gerar o PDF.";
        mensagemErro.style.display = 'block';
    } finally {
        spinner.style.display = 'none';
    }
}

  // Função para buscar dados do backend
  const fetchData = () => {
    fetch('http://10.5.8.145:5050/backup/status')
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary);
        setDetails(data.details);
        setFilteredDetails(data.details); // Inicializa com todos os detalhes
        setDate(data.date);
      })
      .catch((err) => console.error('Erro ao carregar dados:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // filtro
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    if (selectedStatus === "All") {
      setFilteredDetails(details);
    } else {
      const filtered = details.filter(item => item['Status do Backup'] === selectedStatus);
      setFilteredDetails(filtered);
    }
  };

  const chartData = {
    labels: ['Successful', 'Error', 'Partially Successful'],
    datasets: [
      {
        data: summary ? [summary.Successful || 0, summary.Error || 0, summary.Partially || 0] : [],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div className="d-grid gap-2">
      <h1 className="text-center">Status dos Backups</h1>
      <Button className="text-center m-4" variant="success" size='lg' onClick={gerarPDF}>
        Gerar relatório PDF
      </Button>
      {summary ? (
        <>
          <div className="chart-container" style={{ width: '600px', height: '600px', margin: '0 auto' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>

          <div className="mt-4" id="spinner">
            <div></div>
          </div>

          <Button className="text-center m-4" variant="success" onClick={atualizarPlanilha}>
            Atualizar planilha
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowDetails(!showDetails)}
            aria-controls="details-table"
            aria-expanded={showDetails}
          >
            {showDetails ? 'Esconder Detalhes' : 'Mostrar Detalhes'}
          </Button>

          <div id="mensagemErro" style={{ display: "none", color: "red", fontWeight: "bold", textAlign: 'center' }} />

          <Collapse in={showDetails}>
            <div id="details-table" className="my-4">
              <h5 className="text-center">{date}</h5>

              {/* Filtro de Status */}
              <Form.Group controlId="statusFilter" className="my-3">
                <Form.Label>Filtrar por Status</Form.Label>
                  <Form.Control as="select" value={statusFilter} onChange={handleFilterChange}>
                    <option value="All">Todos</option>
                    <option value="Successful">Successful</option>
                    <option value="Error">Error</option>
                    <option value="Partially Successful">Partially Successful</option>
                  </Form.Control>
              </Form.Group>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome do Job</th>
                    <th>Nome do Servidor</th>
                    <th>Status</th>
                    <th>Início</th>
                    <th>Final</th>
                    <th>Volume Protegido (GB)</th>
                    <th>Tipo de Backup</th>
                    <th>Nome do Agendamento</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{item['Nome do Job']}</td>
                      <td>{item['Nome do Servidor']}</td>
                      <td>{item['Status do Backup']}</td>
                      <td>{item['Inicio do Backup']}</td>
                      <td>{item['Final do Backup']}</td>
                      <td>{item['Volume Protegido(GB)']}</td>
                      <td>{item['Tipo de Backup']}</td>
                      <td>{item['Nome do Agendamento']}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Collapse>
        </>
      ) : (
        <p className="text-center">Carregando dados...</p>
      )}
    </div>
  );
};

export default BackupStatusPage;
