import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { Tooth } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock credentials check
    if (email === 'drgbemi@optimusai.com' && password === 'thenewdawn2017') {
      login({
        id: 'U001',
        name: 'Dr. Gbemi',
        email: 'drgbemi@optimusai.com',
        role: 'Dentist'
      });
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <div className="text-accent relative">
                <Tooth size={48} strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome to Xola</h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#0073b9] border-gray-300 rounded focus:ring-[#0073b9]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-[#0073b9] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0073b9] text-white py-2 px-4 rounded-lg hover:bg-[#005a94] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0073b9] focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-white">© 2025 Xola SmartCare. All rights reserved.</p>
          <p className="text-sm text-white mt-1">Powered by Optimus AI Labs</p>
        </div>
      </div>
    </div>
  );
};

export default Login;