import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Импортируем хук useAuth

export default function SignUpPage() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Получаем функцию login из контекста

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = { name, email, password };

    try {
      // 1. Регистрация
      const registerResponse = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        setError(errorData.detail || 'Ошибка регистрации');
        setLoading(false);
        return;
      }

      const registeredUser = await registerResponse.json();

      // 2. Автоматический вход после регистрации
      const loginResponse = await fetch('http://127.0.0.1:8000/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        setError(errorData.detail || 'Ошибка входа после регистрации');
        setLoading(false);
        return;
      }

      const { access_token, token_type } = await loginResponse.json();

      // 3. Сохраняем токен и данные пользователя в контексте
      login(access_token, {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
      });

      // 4. Перенаправляем на главную страницу
      navigate('/');
    } catch (err) {
      setError('Произошла непредвиденная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-3 py-2 text-white text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                Signing Up...
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}