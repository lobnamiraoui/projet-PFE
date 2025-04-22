import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Le nom est requis';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email invalide';
    if (!form.password || form.password.length < 6) err.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (form.password !== form.confirmPassword) err.confirmPassword = 'Les mots de passe ne correspondent pas';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log('Inscription réussie avec :', form);
      // Ajoute ici la logique d'inscription, comme un appel API
      setForm({ name: '', email: '', password: '', confirmPassword: '' }); // reset form
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-form">
        <h2>Créer un compte</h2>
        {submitted && <Alert variant="success">Compte créé avec succès !</Alert>}

        <Form className="contact-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group">
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

          <Form.Group className="form-group">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choisissez un mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez le mot de passe"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
  <Link to="/home">
          {" "}
          <Button type="submit">Créer un compte</Button>
          </Link>
        </Form>

        <p className="signin-link">
          Déjà inscrit ? <Link to="/signin">Connecte-toi ici</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;