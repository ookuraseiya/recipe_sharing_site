import { useEffect, useState } from 'react';
import { Card } from './Card';
import { Pagination } from '../utility/Pagination';
import { Search } from '../utility/Serch';

export const Recipe = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(
      `${String(import.meta.env.VITE_MICROCMS_DOMAIN)}${String(
        import.meta.env.VITE_MICROCMS_ENDPOINT
      )}`,
      {
        headers: {
          'X-API-KEY': String(import.meta.env.VITE_MICROCMS_API_KEY),
        },
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.contents);
      });
  }, []);

  return (
    <>
      <section className="recipe">
        <div className="recipe__container">
          <div className="recipe__heading">
            <h1 className="recipe__title">大倉家のレシピ共有サイト</h1>
            <p className="recipe__lead">オンマの飯しか勝たん</p>
          </div>
          <div className="recipe__wrapper">
            <div className="recipe__list">
              <ul className="recipe__list--wrapper">
                <Card posts={posts} />
              </ul>
              <Pagination />
            </div>
            <Search />
          </div>
        </div>
      </section>
    </>
  );
};
