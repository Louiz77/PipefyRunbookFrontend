import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import DashboardTotvs from '../DashboardTotvs';
import ChamadosTable from '../ChamadosTabela';

const ChamadosFaturados = () => {
  const [formData, setFormData] = useState({
    descricaoAnalista: '',
    data: '',
    solicitante: '',
    descricaoSolicitacao: '',
    horaInicial: '',
    horaFinal: '',
  });

  const [totalHoras, setTotalHoras] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'horaInicial' || name === 'horaFinal') {
      calcularTotalHoras({ ...formData, [name]: value });
    }
  };

  const calcularTotalHoras = (data) => {
    const { horaInicial, horaFinal } = data;

    if (horaInicial && horaFinal) {
      const inicio = new Date(`1970-01-01T${horaInicial}:00`);
      const fim = new Date(`1970-01-01T${horaFinal}:00`);
      const diferenca = (fim - inicio) / (1000 * 60 * 60);

      if (diferenca >= 0) {
        setTotalHoras(diferenca.toFixed(2));
      } else {
        setTotalHoras('Hora final deve ser após a hora inicial');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://10.5.8.145:5000/api/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setAlertMessage(result.message || 'Chamado registrado com sucesso!');
        setAlertVariant('success');
        setFormData({
          descricaoAnalista: '',
          data: '',
          solicitante: '',
          descricaoSolicitacao: '',
          horaInicial: '',
          horaFinal: '',
        });
        setTotalHoras('');
      } else {
        const error = await response.json();
        setAlertMessage(error.error || 'Erro ao registrar chamado.');
        setAlertVariant('danger');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setAlertMessage('Erro ao conectar com o servidor.');
      setAlertVariant('danger');
    }
  };

  return (
    <Container className="mb-5">
      <DashboardTotvs />
      <h1 className="text-center my-4">Adicionar Chamado Faturado</h1>

      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="descricaoAnalista" className="mb-3">
              <Form.Label>Descrição sobre o Analista</Form.Label>
              <Form.Control
                type="text"
                name="descricaoAnalista"
                value={formData.descricaoAnalista}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="data" className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="solicitante" className="mb-3">
              <Form.Label>Solicitante</Form.Label>
              <Form.Control
                type="text"
                name="solicitante"
                value={formData.solicitante}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="descricaoSolicitacao" className="mb-3">
              <Form.Label>Descrição da Solicitação</Form.Label>
              <Form.Control
                type="text"
                name="descricaoSolicitacao"
                value={formData.descricaoSolicitacao}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="horaInicial" className="mb-3">
              <Form.Label>Hora Inicial</Form.Label>
              <Form.Control
                type="time"
                name="horaInicial"
                value={formData.horaInicial}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="horaFinal" className="mb-3">
              <Form.Label>Hora Final</Form.Label>
              <Form.Control
                type="time"
                name="horaFinal"
                value={formData.horaFinal}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="totalHoras" className="mb-3">
              <Form.Label>Total de Horas</Form.Label>
              <Form.Control
                type="number"
                value={totalHoras}
                readOnly
                style={{ backgroundColor: '#f8f9fa' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button variant="primary" size='lg' type="submit">
            Enviar
          </Button>
        </div>
      </Form>
      <ChamadosTable className='m-2'/>
    </Container>
  );
};

export default ChamadosFaturados;