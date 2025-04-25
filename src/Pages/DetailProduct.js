import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // To manage the quantity of the product being added to the cart
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Erreur lors de la récupération du produit :", err));
  }, [id]);

  const handleAddToCart = () => {
    fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
      },
      body: JSON.stringify({
        productId: product._id,  // Sending the product ID
        quantity: quantity,      // Sending the quantity selected by the user
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message); // If there's an error, show it
          setSuccess(false);
        } else {
          setSuccess(true); // If successfully added to cart, show success message
          setError(null);
        }
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout au panier :", err);
        setError("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  if (!product) return <p>Chargement en cours...</p>;

  return (
    <Container className="detail-page mt-5">
      <Row>
        <Col md={6}>
          <img src={product.imageUrl} alt={product.name} className="img-fluid rounded detail-image" />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-danger">{product.price} TND</h4>

          {/* Quantity selection */}
          <div className="mt-3">
            <input
              type="number"
              value={quantity}
              min="1"
              max={product.countInStock}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="form-control w-25"
            />
          </div>

          {/* Error or success message */}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">Produit ajouté au panier avec succès!</Alert>}

          <Button variant="dark" className="mt-3" onClick={handleAddToCart}>
            Ajouter au panier 🛒
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailProduct;
