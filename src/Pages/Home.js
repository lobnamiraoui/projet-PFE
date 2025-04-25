
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel  from '../Components/Carousel';

import DetailProduct from '../Pages/DetailProduct';
import Product from '../Pages/Product';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col,Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erreur de chargement des produits:", err));
  }, []);
  return (
    <div className="container mt-5">
      <h1>Bienvenue sur notre boutique en ligne</h1>

      {/* Carrousel Bootstrap */}
      <Carousel/>
        
      <h2 className="text-center">Nos Produits</h2>
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
      
    
      
   
    </div>
  );
}

export default Home;