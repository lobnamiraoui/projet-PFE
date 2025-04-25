import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur de chargement des produits:", err));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Nos Produits</h2>
      <Row>
        {products.map(product => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
            <Card.Img variant="top" src={product.imageUrl} className="product-image" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price} DT</Card.Text>
                <Link to={`/product/${product._id}`}>
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