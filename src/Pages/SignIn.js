import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, Links } from "react-router-dom";
function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email invalide';
    if (!form.password || form.password.length < 6) err.password = 'Le mot de passe doit contenir au moins 6 caractères';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log('Connexion avec :', form);
      // tu peux appeler ici une API de connexion
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Container className="py-5 signin-wrapper">
      <div className="signin-form">
        <h2>Se connecter</h2>
        {submitted && <Alert variant="success">Connexion réussie !</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Link to="/home">
          {" "}
          <Button variant="dark" type="submit">Connexion</Button>
          </Link>
        </Form>
      </div>
    </Container>
  );
}

export default SignIn;