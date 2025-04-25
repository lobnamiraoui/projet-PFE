import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Order() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // useEffect pour récupérer les informations du panier
  useEffect(() => {
    // Simuler une récupération des données depuis un backend
    fetch('http://localhost:5000/api/cart') // Remplacer par l'URL de ton backend
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.items); // suppose que le backend renvoie les items du panier
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données du panier:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const err = {};
    if (!formData.name) err.name = 'Le nom est requis';
    if (!formData.address) err.address = 'L\'adresse est requise';
    if (!formData.paymentMethod) err.paymentMethod = 'La méthode de paiement est requise';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setShowModal(true);

      // Envoi des données de la commande au backend
      fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: formData.name,
          address: formData.address,
          paymentMethod: formData.paymentMethod,
          cartItems: cartItems,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setOrderConfirmed(true);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Erreur lors de la soumission de la commande:', error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (orderConfirmed) {
      navigate('/'); // Redirige vers la page d'accueil après confirmation
    }
  };

  return (
    <div className="min-h-screen">
      <Container className="py-5 signin-wrapper">
        <div className="signin-form">
          <h2>Finalisez votre commande</h2>
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">
              {Object.values(errors).map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Votre nom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adresse de livraison</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adresse complète"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Méthode de paiement</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                isInvalid={!!errors.paymentMethod}
              >
                <option value="">Choisir une méthode</option>
                <option>Carte Bancaire</option>
                <option>E-Dinar</option>
                <option>Paiement à la livraison</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.paymentMethod}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="dark" type="submit">
              Confirmer la commande
            </Button>
          </Form>
        </div>
      </Container>

      {/* Modal de confirmation */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>🎉 Commande en cours...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {loading ? (
            <>
              <Spinner animation="border" variant="success" className="mb-3" />
              <p>Traitement de votre commande...</p>
            </>
          ) : (
            <>
              <div style={{ fontSize: '3rem' }}>✅</div>
              <p>Commande confirmée ! Redirection vers l'accueil...</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Order;