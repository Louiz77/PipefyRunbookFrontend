import React, { useState } from 'react';
import { Row, Col, Form, Card, Spinner } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardTotvsMensal = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (month) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://10.5.8.145:5000/pipefy/cards_by_month?month=${month}`);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao carregar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    if (month) fetchData(month);
  };

  const chartDataPie = {
    labels: ['Meu RH', 'TOTVS Datasul'],
    datasets: [
      {
        data: [
          data?.totals['Meu RH'] || 0,
          data?.totals['TOTVS Datasul'] || 0,
        ],
        backgroundColor: ['#3498db', '#e74c3c'],
      },
    ],
  };

  const chartDataBar = {
    labels: ['Total de Cards', 'Cards Concluídos'],
    datasets: [
      {
        label: 'Contagens',
        data: [
          data?.totals['Meu RH'] + data?.totals['TOTVS Datasul'] || 0,
          data?.completed['Meu RH'] + data?.completed['TOTVS Datasul'] || 0,
        ],
        backgroundColor: ['#9b59b6', '#2ecc71'],
      },
    ],
  };

  return (
    <div className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Visualização Mensal</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Selecione o Mês</Form.Label>
              <Form.Control
                as="select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="">Escolha o mês</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Carregando dados...</p>
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      {data && (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Total de Cards</Card.Title>
                  <p>Meu RH: {data.totals['Meu RH']}</p>
                  <p>TOTVS Datasul: {data.totals['TOTVS Datasul']}</p>
                  <p>
                    Total: {data.totals['Meu RH'] + data.totals['TOTVS Datasul']}
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Cards Concluídos</Card.Title>
                  <p>Meu RH: {data.completed['Meu RH']}</p>
                  <p>TOTVS Datasul: {data.completed['TOTVS Datasul']}</p>
                  <p>
                    Total:{' '}
                    {data.completed['Meu RH'] + data.completed['TOTVS Datasul']}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Gráfico de Pizza</Card.Title>
                  <Pie data={chartDataPie} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>Gráfico de Barras</Card.Title>
                  <Bar data={chartDataBar} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashboardTotvsMensal;