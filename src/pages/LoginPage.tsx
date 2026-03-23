import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import AuthShell from '../components/auth/AuthShell';
import { signInWithEmailPassword } from '../firebase/auth';
import { getErrorMessage } from '../lib/errors';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please use a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailPassword(email.trim(), password);
      navigate('/app/workouts');
    } catch (err) {
      setError(getErrorMessage(err, 'Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to continue managing your workouts, progress, and goals."
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

        <Input
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter your password"
          value={password}
          error={passwordError}
          icon={<Lock className="h-4 w-4 text-slate-400" />}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPassword ? 'Hide password' : 'Show password'}
        </button>

        {error && <Alert type="error">{error}</Alert>}

        <div className="pt-2">
          <Button type="submit" loading={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </div>

        <div className="flex items-center justify-between pt-2 text-sm">
          <Link
            to="/forgot-password"
            className="font-semibold text-cyan-700 hover:text-cyan-800"
          >
            Forgot password?
          </Link>
          <Link
            to="/signup"
            className="font-semibold text-slate-700 hover:text-slate-900"
          >
            Create account
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};

export default LoginPage;