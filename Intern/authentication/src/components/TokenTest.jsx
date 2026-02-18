import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expiryTime = payload.exp * 1000;
          const now = Date.now();
          const seconds = Math.floor((expiryTime - now) / 1000);
          setTimeLeft(seconds);
        } catch {
          setTimeLeft(null);
        }
      } else {
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const testTokenRefresh = async () => {
    setLoading(true);
    setResult('Making API call...');
    
    try {
      const response = await axiosInstance.get('/auth/me');
      setResult(`✅ Success! User: ${response.data.firstName} ${response.data.lastName}`);
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkTokenExpiry = () => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      setResult('❌ No token found');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = new Date(payload.exp * 1000);
      const now = new Date();
      const timeLeft = Math.floor((expiryTime - now) / 1000);

      if (timeLeft > 0) {
        setResult(`⏱️ Token expires in ${timeLeft} seconds (${expiryTime.toLocaleTimeString()})\n\nWait for it to expire, then click "Test API Call" to see the refresh token in action!`);
      } else {
        setResult(`⚠️ Token expired ${Math.abs(timeLeft)} seconds ago!\n\nClick "Test API Call" NOW to trigger the refresh token flow!`);
      }
    } catch (error) {
      setResult(`❌ Error decoding token: ${error.message}`);
    }
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px solid #333',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5'
    }}>
      <h2>🔐 Token Refresh Test</h2>
      
      {timeLeft !== null && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: timeLeft > 0 ? '#d4edda' : '#f8d7da',
          border: `2px solid ${timeLeft > 0 ? '#28a745' : '#dc3545'}`,
          borderRadius: '5px',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {timeLeft > 0 ? (
            <>⏱️ Token expires in: <span style={{ color: '#28a745' }}>{timeLeft}s</span></>
          ) : (
            <>⚠️ Token EXPIRED {Math.abs(timeLeft)}s ago!</>
          )}
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkTokenExpiry}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            marginBottom: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Check Token Expiry
        </button>

        <button 
          onClick={testTokenRefresh}
          disabled={loading}
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Test API Call (Auto-Refresh if Expired)'}
        </button>
      </div>

      {result && (
        <div style={{
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '5px',
          marginTop: '10px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap'
        }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', border: '1px solid #ffc107' }}>
        <strong>✅ NEW: Client-Side Token Expiry Check</strong>
        <ol style={{ marginTop: '10px', marginBottom: '0' }}>
          <li><strong>Login</strong> - You get a token that expires in 1 minute</li>
          <li><strong>Watch Timer</strong> - See the countdown above in real-time</li>
          <li><strong>Wait for Expiry</strong> - Timer will turn red when expired</li>
          <li><strong>Make API Call</strong> - Click "Test API Call" or search products</li>
          <li><strong>Watch Console</strong> - You'll see:
            <ul>
              <li>⚠️ "Token expired - refreshing before request..."</li>
              <li>✅ "Token refreshed proactively"</li>
              <li>✅ Original request succeeds with new token</li>
            </ul>
          </li>
        </ol>
        <p style={{ marginTop: '10px', marginBottom: '0', color: '#856404' }}>
          <strong>How it works:</strong> The interceptor now checks token expiry BEFORE making requests and refreshes automatically.
        </p>
      </div>
    </div>
  );
};

export default TokenTest;
