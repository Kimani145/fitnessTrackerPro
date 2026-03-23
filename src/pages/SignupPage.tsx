
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import AuthShell from '../components/auth/AuthShell';
import { signUpWithEmailPassword } from '../firebase/auth';
import { getErrorMessage } from '../lib/errors';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError('Name is required.');
      valid = false;
    } else if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters.');
      valid = false;
    } else {
      setNameError('');
    }

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
      await signUpWithEmailPassword(name.trim(), email.trim(), password);
      navigate('/app/workouts');
    } catch (err) {
      setError(getErrorMessage(err, 'Signup failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Build momentum with a training hub designed for consistent progress."
    >
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
          type="text"
          label="Full name"
          placeholder="Jane Doe"
          value={name}
          error={nameError}
          icon={<User className="h-4 w-4 text-slate-400" />}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

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
          placeholder="Use at least 6 characters"
          value={password}
          error={passwordError}
          icon={<Lock className="h-4 w-4 text-slate-400" />}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
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
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>

        <div className="pt-2 text-sm text-center text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-700 hover:text-cyan-800">
            Sign in
          </Link>
        </div>
      </form>
    </AuthShell>
  );
};

export default SignupPage;
