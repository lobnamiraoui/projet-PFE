import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";  // useNavigate instead of useHistory
import axios from 'axios';

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');  // for displaying API errors
  const navigate = useNavigate();  // using useNavigate for redirection

  const validate = () => {
    const err = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = 'Email invalide';
    if (!form.password || form.password.length < 6) err.password = 'Le mot de passe doit contenir au moins 6 caractères';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);

      try {
        // API call to the login endpoint
        const response = await axios.post('http://localhost:5000/api/auth/login', form);

        // Assuming the response contains a token
        localStorage.setItem('token', response.data.token);  // Store the JWT token in localStorage
        setSubmitted(false);
        navigate('/home');  // Redirect to the home page on successful login
      } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : 'Server error');
        setSubmitted(false);
      }
    }
  };

  return (
    <Container className="py-5 signin-wrapper">
      <div className="signin-form">
        <h2>Se connecter</h2>
        {submitted && <Alert variant="success">Connexion réussie !</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
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

          <Button variant="dark" type="submit">Connexion</Button>
        </Form>
      </div>
    </Container>
  );
}

export default SignIn;
