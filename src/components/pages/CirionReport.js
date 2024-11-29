import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

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
  const [date, setDate] = useState([null]);
  const [showDetails, setShowDetails] = useState(false);

  async function atualizarPlanilha() {
    const url = "http://localhost:5050/backup/check";
    
    // Exibe o spinner antes de começar a requisição
    const spinner = document.getElementById('spinner');
    const mensagemErro = document.getElementById('mensagemErro');
    spinner.style.display = 'block'; // Mostra o spinner
    mensagemErro.style.display = 'none'; // Esconde qualquer mensagem de erro anterior
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`Erro: ${response.status}`);
        
        if (response.status === 404) {
          mensagemErro.innerText = "Nenhum novo e-mail encontrado para atualizar a planilha.";
          mensagemErro.style.display = 'block'; // Exibe mensagem de erro
          return; // Encerra a execução
        }
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
      mensagemErro.innerText = "Ocorreu um erro ao atualizar a planilha.";
      mensagemErro.style.display = 'block'; // Exibe mensagem de erro genérica
    } finally {
      spinner.style.display = 'none'; // Esconde o spinner após a conclusão
    }
  }
  

  useEffect(() => {
    fetch('http://localhost:5050/backup/status')
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary);
        setDetails(data.details);
        setDate(data.date);
      })
      .catch((err) => console.error('Erro ao carregar dados:', err));
  }, []);

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
    <div                
    style={{
      display:"grid",
      justifyContent:"center",
      alignItems:"center"}}  
      >
        <h1 className="text-center">Status dos Backups</h1>
        {summary ? (
            <>
            <div className="chart-container" style={{ width: '600px', height: '600px', margin: '0 auto' }}>
                <Pie data={chartData} options={chartOptions} />
            </div>

            <div className='mt-4' id="spinner">
              <div></div>
            </div>

            <Button className='text-center m-4'
              variant='success'
              onClick={atualizarPlanilha}>Atualizar planilha
            </Button>
            <Button
                variant="primary"
                onClick={() => setShowDetails(!showDetails)}
                aria-controls="details-table"
                aria-expanded={showDetails}
            >
                {showDetails ? 'Esconder Detalhes' : 'Mostrar Detalhes'}
            </Button>

            <div id="mensagemErro" style={{display: "none", color: "red", fontWeight: "bold", textAlign: 'center'}}/>

            <Collapse in={showDetails}>
                <div id="details-table" className="my-4">
                <h5 className='text-center'>{date}</h5>
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
                    {details.map((item, index) => (
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
