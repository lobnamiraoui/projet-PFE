import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';


function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Container className="contact-container mt-5">
      <h2>Contactez-nous</h2>
      {submitted && <Alert variant="success">Message envoyé avec succès !</Alert>}
      <Form onSubmit={handleSubmit} className="contact-form">
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" placeholder="Votre nom" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Votre email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="dark" type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
}

export default Contact;
