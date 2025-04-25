import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  // Helper function to add debug information
  const addDebugInfo = (message) => {
    setDebugInfo(prev => prev + "\n" + message);
    console.log(message);
  };

  // Fetch cart items from the backend on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Get token and log it (sanitized for security)
        const token = localStorage.getItem('token');
        addDebugInfo(`Token exists: ${!!token}`);
        if (token) {
          addDebugInfo(`Token first 5 chars: ${token.substring(0, 5)}...`);
        }
        
        // Configure the request with proper baseURL
        // NOTE: Make sure this URL matches your backend server exactly
        const baseURL = 'http://localhost:5000';
        addDebugInfo(`Making request to: ${baseURL}/api/cart`);
        
        // Make the API request with full URL
        const response = await axios({
          method: 'get',
          url: `${baseURL}/api/cart`,
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            // Add these headers to help with CORS issues
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          // Don't use withCredentials if your backend isn't configured for it
          // withCredentials: true 
        });
        
        // Log the response
        addDebugInfo(`Response status: ${response.status}`);
        addDebugInfo(`Response data: ${JSON.stringify(response.data).substring(0, 100)}...`);
        
        // Update state with the response data
        setCartItems(response.data.items || []);
        setCartTotal(response.data.totals?.total || 0);
        setLoading(false);
      } catch (err) {
        addDebugInfo(`Error: ${err.message}`);
        
        if (err.response) {
          addDebugInfo(`Response status: ${err.response.status}`);
          addDebugInfo(`Response data: ${JSON.stringify(err.response.data)}`);
        }
        
        // Handle different types of errors
        if (err.message === 'Network Error') {
          setError('Cannot connect to the server. Please check your connection or contact support.');
        } else if (err.response?.status === 401) {
          setError('Authentication failed. Please sign in again.');
        } else {
          setError(`Failed to load cart: ${err.message}`);
        }
        
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://localhost:5000';
      
      const response = await axios({
        method: 'delete',
        url: `${baseURL}/api/cart/${itemId}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      setCartItems(response.data.items || []);
      setCartTotal(response.data.totals?.total || 0);
    } catch (err) {
      console.error('Failed to delete item:', err.response?.data || err.message);
      alert('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    try {
      const token = localStorage.getItem('token');
      const baseURL = 'http://localhost:5000';
      
      const response = await axios({
        method: 'put',
        url: `${baseURL}/api/cart/${itemId}`,
        data: { quantity },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      setCartItems(response.data.items || []);
      setCartTotal(response.data.totals?.total || 0);
    } catch (err) {
      console.error('Failed to update quantity:', err.response?.data || err.message);
      alert('Failed to update quantity');
    }
  };

  // Function to manually test the API connection
  const testApiConnection = async () => {
    try {
      addDebugInfo('Testing API connection...');
      const baseURL = 'http://localhost:5000';
      const response = await fetch(`${baseURL}/api/cart`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        addDebugInfo('API connection successful!');
        const data = await response.json();
        addDebugInfo(`API returned: ${JSON.stringify(data).substring(0, 100)}...`);
      } else {
        addDebugInfo(`API returned status: ${response.status}`);
        const text = await response.text();
        addDebugInfo(`API error: ${text}`);
      }
    } catch (err) {
      addDebugInfo(`Test failed: ${err.message}`);
    }
  };

  if (loading) return <Container className="py-5"><p>Loading your cart...</p></Container>;
  
  return (
    <Container className="py-5 cart-container">
      <h2 className="mb-4">Votre Panier</h2>
      
      
      
      {/* Error display */}
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
          <div className="mt-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              Sign In Again
            </Button>
            {' '}
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </Alert>
      )}
      
      {/* Cart content */}
      {!error && cartItems.length === 0 ? (
        <p className="text-center">Votre panier est vide.</p>
      ) : !error && (
        <>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td><img src={item.image} alt={item.name} width="70" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}DT</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      className="form-control"
                      style={{ width: '80px' }}
                      min={1}
                      onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>{item.price * item.quantity}DT</td>
                  <td>
                    <Button 
                      variant="danger" 
                      className="btn-delete" 
                      onClick={() => handleDelete(item._id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <h4>Total: {cartTotal}DT</h4>
            <Button variant="dark" href="/order">Commander</Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;