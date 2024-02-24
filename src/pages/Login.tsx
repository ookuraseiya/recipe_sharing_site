import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setLoginError('');
        navigate('/1');
      } catch (error: unknown) {
        if (error instanceof Error) {
          setLoginError('メールアドレスかパスワードが違います。');
        }
      }
    } else {
      setLoginError('メールアドレスとパスワード両方入力してください。');
    }
  };

  return (
    <>
      <section className="login">
        <div className="login__container">
          <div className="login__error--position">
            <h1 className="login__error" data-testid="error-text">
              {loginError && loginError}
            </h1>
          </div>
          <form className="login__form" onSubmit={(e) => e.preventDefault()}>
            <h1 className="login__title">ログインフォーム</h1>
            <div className="login__form--group">
              <label className="login__form--label" htmlFor="email">
                Email:
              </label>
              <input
                className="login__form--input"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
            <div className="login__form--group">
              <label className="login__form--label" htmlFor="password">
                Password:
              </label>
              <input
                className="login__form--input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
            <div className="login__button--position">
              <button
                className="login__button"
                type="submit"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
