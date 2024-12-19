import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" variant="dark" expand="lg" className="mb-4">
      <Container style={{
        backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
        <Navbar.Brand href="/">ITFacil Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link href="/">Início</Nav.Link>
            <Nav.Link href="/relatorios">Runbook</Nav.Link>
            <Nav.Link href="/cirion">Cirion</Nav.Link>
            <Nav.Link href="http://10.5.9.45:3006">Inventario</Nav.Link>
            <Nav.Link href="http://10.5.8.145:3000/?orgId=1">Grafana</Nav.Link>
            <Nav.Link href="http://10.5.8.145/zabbix">Zabbix</Nav.Link>
            <Nav.Link href="https://app.pipefy.com/pipes/304582953">Pipefy</Nav.Link>
            
          </Nav>
          <Nav.Link href="/conta">
            <Button>
              <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1"/>
              Conta
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
