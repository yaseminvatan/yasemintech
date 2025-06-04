import React, { useState } from 'react';
import '../assets/SignIn.css';
import { Canvas} from '@react-three/fiber';
import { Stars,Html } from '@react-three/drei';

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`Creating account for: ${email}`);
    } else {
      alert(`Signing in as: ${email}`);
    }
  };

  return (
    <Canvas camera = {{position:[0,0,5]}}>
    <Stars radius={100} depth={50} count={5000} factor={4} fade/>
    <Html center>
    <div className="signin-container">
      <div className="signin-box">
        <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <p className="toggle-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            className="toggle-button"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
    </Html>
    </Canvas>
  );
}
