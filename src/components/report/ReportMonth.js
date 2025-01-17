import React, { useState } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';

const MonthlyReport = () => {
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    if (!month) {
      setError('Por favor, selecione um mês.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://10.5.8.145:5670/report/generate-monthly-report?month=${month}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_mensal_${month}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        setError('Erro ao gerar o relatório.');
      }
    } catch (e) {
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center my-5">
      <h1>Relatório Mensal</h1>
      <Form.Group controlId="selectMonth" className="my-4">
        <Form.Label>Selecione o mês:</Form.Label>
        <Form.Control
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleGenerateReport} disabled={loading}>
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            {' '}Gerando...
          </>
        ) : (
          'Gerar Relatório'
        )}
      </Button>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </div>
  );
};

export default MonthlyReport;