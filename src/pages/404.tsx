import { Link } from 'react-router-dom';
import { FadeIn } from '../components/animetions/FadeIn';

export const NotFoundPage = () => {
  return (
    <>
      <FadeIn>
        <section className="notFound">
          <div className="notFound__container">
            <h1 className="notFound__title">ページは存在しません</h1>
            <div className="notFound__button--position">
              <Link to="/1">
                <button className="notFound__button">トップページに戻る</button>
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
};
