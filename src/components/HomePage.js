import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div className="text-center my-5">
      <h1>Bem-vindo ao ITFacil Dashboard</h1>
      <p>Gerencie seus relatórios de forma fácil e automatizada.</p>
      <Link to="/relatorios">
        <Button variant="primary" size="lg">
          Acessar Relatórios Automatizados
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
