import { useState } from 'react';
import '../styles/SignInPage.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signin-page">

      <div className="background-layer"></div>
      <div className='signin'>
        <div className="signin-container">
          <div className="signin-box">
            <h1 className="signin-title">Sign In</h1> 
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
              Don't have an account? <a href="/signup">SignUp here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;