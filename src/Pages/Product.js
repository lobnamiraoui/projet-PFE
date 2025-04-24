import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, Links } from "react-router-dom";

function Product() {
  const products = [
    { id: 1, title: 'vétement', price: '79DT', image: "robe.jpg" },
    { id: 2, title: 'sac', price: '55DT', image: "robe.jpg" },
    { id: 3, title: 'montres', price: '99DT', image: "robe.jpg" },
  ];

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Nos Produits</h2>
    
      <Row>
        {products.map(product => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                <Button variant="secondary">Voir détails</Button>
              </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    
  );
}

export default Product;