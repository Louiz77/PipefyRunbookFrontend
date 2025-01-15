import React, { useEffect, useState } from 'react';
import { Table, Card, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import DashboardTotvsMensal from '../components/DashboardTotvsMensal'
import 'chart.js/auto';

const DashboardTotvs = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  const fetchTotvsData = async () => {
    try {
      const response = await fetch('http://10.5.8.145:5000/pipefy/cards');
      if (!response.ok) throw new Error('Erro ao buscar dados do Pipefy');
      const data = await response.json();
      setDashboardData(data);
      console.log(data);
    } catch (err) {
      console.error('Erro ao buscar dados TOTVS:', err);
      setError('Erro ao carregar os dados do dashboard.');
    }
  };

  useEffect(() => {
    fetchTotvsData();
  }, []);

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!dashboardData) {
    return <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Carregando dados...</p>
    </div>;
  }

  const { counts, phases_count } = dashboardData;

  const chartData = {
    labels: ['Triagem', 'Pendente', 'Em Atendimento', 'Escalar Chamado'],
    datasets: [
      {
        data: [
          phases_count.triagem,
          phases_count.pendente,
          phases_count.em_atendimento,
          phases_count.escalar_chamado,
        ],
        backgroundColor: ['#FFC107', '#6F42C1', '#17A2B8', '#28A745'],
      },
    ],
  };

  console.log(dashboardData)
  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="mb-5">
      <h1 className="text-center mb-5">Dashboard TOTVS</h1>
      <Row className="mb-5">
        <Col md={8}>
          <div style={{ height: '600px', width: '100%' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Visão Geral</Card.Title>
              <Row className="text-center">
                <Col>
                  <p className="text-primary">
                    <strong>Meu RH</strong>
                  </p>
                  <h4>{counts['Meu RH']}</h4>
                </Col>
                <Col>
                  <p className="text-warning">
                    <strong>TOTVS Datasul</strong>
                  </p>
                  <h4>{counts['TOTVS Datasul']}</h4>
                </Col>
              </Row>
              <hr />
              <p className="text-center">
                <strong>Total de Cards:</strong> {counts['Meu RH'] + counts['TOTVS Datasul']}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-4">Detalhes dos Cards</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Fase Atual</th>
            <th>Tipo de Solicitação</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.cards?.length > 0 ?(
            dashboardData.cards.map((card) => (
              <tr key={card.node.id}>
                <td className='text-center'>
                  <Button variant="outline-secondary" target="_blank" href={"https://app.pipefy.com/open-cards/"+card.node.id}>{card.node.id}</Button>
                </td>
                <td>{card.node.title}</td>
                <td>{card.node.current_phase.name}</td>
                <td>
                  {
                    card.node.fields.find(field => field.name === "Componente -> Suporte a Sistemas")?.value || "N/A"
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Nenhum card encontrado (exceto os concluídos).
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <DashboardTotvsMensal />
    </div>
  );
};

export default DashboardTotvs;