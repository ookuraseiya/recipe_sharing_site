import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { ScrollTop } from '../utility/ScrollTop';

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <>
      <ScrollTop />
      <header className="header">
        <div className="header__container">
          <div className="header__list">
            <img className="header__logo" src={'/images/logo.webp'} alt="" />
            <div className="header__button--position">
              <button className="header__button" onClick={handleLogout}>
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
