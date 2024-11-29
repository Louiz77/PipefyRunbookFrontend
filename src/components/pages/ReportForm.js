import React, { useState } from 'react';
import { Form, Button, Row, Col, Collapse } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

const ReportForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    custom_link1: '',
    custom_link2: '',
    custom_link3: '',
    autorResponsavel: '',
    numberVersion: '',
    start_date: '',
    end_date: '',
  });

  const [showImages, setShowImages] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formElement = e.target;
    handleSubmit(formElement);
  };

  return (
    <Form onSubmit={onSubmit} encType="multipart/form-data">
      <Row className="justify-content-center text-center">
        <Col md={4}>
          <Form.Group controlId="custom_link1" className="mb-3">
            <Form.Label>Link do Checklist diário</Form.Label>
            <Form.Control
              type="text"
              name="custom_link1"
              value={formData.custom_link1}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="custom_link2" className="mb-3">
            <Form.Label>Link do controle de aplicativos</Form.Label>
            <Form.Control
              type="text"
              name="custom_link2"
              value={formData.custom_link2}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="custom_link3" className="mb-3">
            <Form.Label>Link do inventário de máquinas - GLPI</Form.Label>
            <Form.Control
              type="text"
              name="custom_link3"
              value={formData.custom_link3}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="autorResponsavel" className="mb-3">
            <Form.Label>Autor responsável</Form.Label>
            <Form.Control
              type="text"
              name="autorResponsavel"
              value={formData.autorResponsavel}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="numberVersion" className="mb-3">
            <Form.Label>Número de versão do documento</Form.Label>
            <Form.Control
              type="number"
              name="numberVersion"
              value={formData.numberVersion}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        
        <Col md={5}>
          <Form.Group controlId="start_date" className="mb-3">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={5}>
          <Form.Group controlId="end_date" className="mb-3">
            <Form.Label>Data Final</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={12} className="text-center mb-3">
          <Button
            variant="primary"
            onClick={() => setShowImages(!showImages)}
            aria-controls="image-upload-section"
            aria-expanded={showImages}
          >
            {showImages ? 'Esconder Imagens' : 'Adicionar Imagens'}
          </Button>
        </Col>

        <Collapse in={showImages}>
            <div id="image-upload-section">
                <Row>
                <Col md={15}>
                    <Form.Group controlId="pipefy_image" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Pipefy</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="pipefy_image"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Print do pipe [TI] Solicitações | Imagem para Gestão de Serviços (Pipefy)</Form.Text>
                    </Form.Group>
                </Col>

                <Col md={15}>
                    <Form.Group controlId="grafana_image_1" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Grafana (1)</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="grafana_image_1"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Grafana - Imagem 1</Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="grafana_image_2" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Grafana (2)</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="grafana_image_2"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Grafana - Imagem 2</Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="grafana_image_3" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Grafana (3)</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="grafana_image_3"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Grafana - Imagem 3</Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="grafana_image_4" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Grafana (4)</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="grafana_image_4"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Grafana - Imagem 4</Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="grafana_image_5" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Grafana (5)</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="grafana_image_5"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Grafana - Imagem 5</Form.Text>
                    </Form.Group>
                </Col>
                </Row>
            </div>
        </Collapse>

        <Col md={12} className="text-center mb-3">
          <Button
            variant="primary"
            onClick={() => setShowReport(!showReport)}
            aria-controls="report-upload-section"
            aria-expanded={showReport}
          >
            {showReport ? 'Esconder Relatorio/Desenvolvimento' : 'Adicionar Relatorio/Desenvolvimento'}
          </Button>
        </Col>

        <Collapse in={showReport}>
            <div id="report-upload-section">
                <Row>
                <Col md={15}>
                    <Form.Group controlId="relatorio_dev" className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>Relatório</InputGroup.Text>
                        <Form.Control
                        type="file"
                        name="relatorio_dev"
                        onChange={handleFileChange}
                        accept=".doc, .docx, .txt, .pdf"
                        required
                        />
                    </InputGroup>
                    <Form.Text className="text-muted">Relatório para acomplamento (Desenvolvimento com Infraestrutura)</Form.Text>
                    </Form.Group>
                </Col>
                </Row>
            </div>
        </Collapse>

        <Col md={12} className="text-center mt-5">
          <Button variant="success" type="submit">
            Gerar Relatório
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ReportForm;
