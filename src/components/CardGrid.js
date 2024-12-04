import React from 'react';

const CardGrid = () => {
  const cards = [
    { img: 'rb_2548.png', text: 'Relatórios Automatizados', link: '/relatorios' },
    { img: 'ilustracao-do-conceito-de-status-do-servidor.png', text: 'Grafana', link: 'http://10.5.8.145:3000/?orgId=1' },
    { img: 'rb_6820.png', text: 'Zabbix', link: 'http://10.5.8.145/zabbix/'},
    { img: 'rb_13016.png', text: 'Pipefy', link: 'https://app.pipefy.com/pipes/304582953' }
  ];

  return (
    <div className="row text-center">
      {cards.map((card, i) => (
        <div className="col-md-3 mb-4" key={i}>
          <div className="card">
            <img src={card.img} alt={card.text} className="card-img-top" />
            <div className="card-body">
              {card.link ? <a href={card.link} className="stretched-link"></a> : null}
              <p className="card-text">{card.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
