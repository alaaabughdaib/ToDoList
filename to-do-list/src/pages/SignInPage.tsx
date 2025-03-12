import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('http://localhost:3000/csrf-token', {
          method: 'GET',
          credentials: 'include', 
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
        }

        const data = await response.json();
        setCsrfToken(data.csrfToken);
        console.log('CSRF Token fetched:', data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    console.log('Login successful:', data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('csrfToken', data.csrfToken); 
    localStorage.setItem('user', JSON.stringify(data.user)); 

   
    navigate('/task');
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred.');
    }
  }
};

  return (
    <div className="signin-page">
      <div className="background-layer"></div>
      <div className='signin'>
        <div className="signin-container">
          <div className="signin-box">
            <h1 className="signin-title">Sign In</h1> 
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit">Sign In</button>
            </form>
            <p className="signup-link">
              Don't have an account? <a href="/signup">Sign up here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
