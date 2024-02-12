import { useEffect, useState } from 'react';
import { Search } from '../utility/Serch';
import { RecipeList } from './RecipeList';
import { RecipeType } from '../utility/type/RecipeType';

export const Recipe = () => {
  const [posts, setPosts] = useState<RecipeType[]>([]);

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
            <h1 className="recipe__title">大倉家のレシピ共有アプリ</h1>
            <p className="recipe__lead">オンマの飯しか勝たん💛</p>
          </div>
          <div className="recipe__wrapper">
            <RecipeList posts={posts} />
            <Search setPosts={setPosts} />
          </div>
        </div>
      </section>
    </>
  );
};
