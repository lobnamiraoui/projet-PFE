import React, { useState } from 'react';
import { Container, Form, Button, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Order() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowModal(true);

    // Simulation du traitement de la commande avec un délai
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Délai de 2 secondes pour simuler le traitement
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); // Redirige vers la page d'accueil
  };

  return (
    <div className="min-h-screen">
      <Container className="py-5 signin-wrapper">
        <div className="signin-form">
          <h2>Finalisez votre commande</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Votre nom" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Adresse de livraison</Form.Label>
              <Form.Control type="text" placeholder="Adresse complète" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Méthode de paiement</Form.Label>
              <Form.Select required>
                <option value="">Choisir une méthode</option>
                <option>Carte Bancaire</option>
                <option>E-Dinar</option>
                <option>Paiement à la livraison</option>
              </Form.Select>
            </Form.Group>
            <Button variant="dark" type="submit">Confirmer la commande</Button>
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