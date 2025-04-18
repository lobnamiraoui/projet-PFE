import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      setError('');
      // Ajoute ici la logique d'inscription
      alert("Compte créé avec succès !");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-form">
        <h2>Créer un compte</h2>
        <Form className="contact-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre nom complet"
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Votre email"
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Choisissez un mot de passe"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Confirmer le mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez le mot de passe"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {error && <div className="error-message">{error}</div>}

          <Button type="submit">Créer un compte</Button>
        </Form>

        <p className="signin-link">
          Déjà inscrit ? <Link to="/signin">Connecte-toi ici</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;