import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

function DetailProduct() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`) // Remplace par ton vrai port si nécessaire
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Erreur lors de la récupération du produit :", err));
  }, [id]);

  if (!product) return <p>Chargement en cours...</p>;

  return (
    <Container className="detail-page mt-5">
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.title} className="img-fluid rounded detail-image" />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-danger">{product.price} TND</h4>
          <Link to="/cart">
            <Button variant="dark" className="mt-3">Ajouter au panier 🛒</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailProduct;