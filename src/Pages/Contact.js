import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Le nom est requis';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email invalide';
    if (!form.message || form.message.length < 10) err.message = 'Le message doit contenir au moins 10 caractères';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });

      // ⏳ Après 2 secondes, on redirige vers /home
      setTimeout(() => {
        setSubmitted(false);
        navigate('/home');
      }, 2000);
    }
  };

  return (
    <Container className="contact-container mt-5">
      <h2>Contactez-nous</h2>
      {submitted && <Alert variant="success">Message envoyé avec succès ! Redirection en cours...</Alert>}

      <Form onSubmit={handleSubmit} className="contact-form">
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Votre email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            isInvalid={!!errors.message}
          />
          <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="dark" type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
}

export default Contact;