import { ScrollTop } from '../utility/ScrollTop';

export const Header = () => {
  return (
    <>
      <ScrollTop />
      <header className="header">
        <div className="header__container">
          <div className="header__list">
            <img className="header__logo" src={'/images/logo.webp'} alt="" />
            <div className="header__button--position">
              <button className="header__button">ログアウト</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
