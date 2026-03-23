
import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Mail } from 'lucide-react';
import AuthShell from '../components/auth/AuthShell';
import { sendPasswordReset } from '../firebase/auth';
import { getErrorMessage } from '../lib/errors';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please use a valid email address.');
      return;
    }

    setEmailError('');
    setLoading(true);

    try {
      await sendPasswordReset(email.trim());
      setSuccess('Reset link sent. Check your inbox and spam folder.');
    } catch (err) {
      setError(getErrorMessage(err, 'Could not send reset link. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Enter your email and we will send you a secure reset link."
    >
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={email}
          error={emailError}
          icon={<Mail className="h-4 w-4 text-slate-400" />}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}

        <div className="pt-2">
          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Sending reset link...' : 'Send Reset Link'}
          </Button>
        </div>

        <div className="pt-2 text-sm text-center text-slate-600">
          Remembered your password?{' '}
          <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-800">
            Back to login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};

export default ForgotPasswordPage;
