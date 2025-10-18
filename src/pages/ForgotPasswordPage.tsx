
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    // TODO: handle forgot password logic
    console.log('Forgot password for:', email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
            Fitness Tracker
          </h1>
          <h2 className="text-xl mb-6 text-center text-gray-600">Forgot Password</h2>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">
              Reset Password
            </Button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
