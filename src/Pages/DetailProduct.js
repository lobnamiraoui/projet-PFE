import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Links } from "react-router-dom";

function DetailProduct() {
  const { id } = useParams(); // supposons que tu passes l'id du produit via URL

  // 🔁 Tu peux remplacer ça par un appel API ou state
  const product = {
    id: id,
    name: 'Robe Élégante',
    description: 'Une robe élégante et moderne parfaite pour toutes les occasions.',
    price: '99.00 TND',
    image: '/robe.jpg' // chemin vers l'image
  };

  return (
    <Container className="detail-page">
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-fluid rounded detail-image" />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-danger">{product.price}</h4>
          <Link to="/cart">
          {" "}
          <Button variant="dark" className="mt-3">Ajouter au panier 🛒</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailProduct;