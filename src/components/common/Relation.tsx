import { useEffect, useState } from 'react';
import { Card } from './Card';
import { RecipeType } from '../utility/type/RecipeType';

export const Relation = ({
  recipeId,
  relationCategory,
}: {
  recipeId: string;
  relationCategory: string;
}) => {
  const [posts, setPosts] = useState<RecipeType[]>([]);

  useEffect(() => {
    fetch(
      `${String(import.meta.env.VITE_MICROCMS_DOMAIN)}${String(
        import.meta.env.VITE_MICROCMS_ENDPOINT
      )}?-publishedAt`,
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
  }, [recipeId]);

  return (
    <>
      <section className="relation">
        <h1 className="relation__title">
          {relationCategory}に関連するその他の料理
        </h1>
        <div className="relation__wrapper">
          <Card
            posts={posts}
            recipeId={recipeId}
            relationCategory={relationCategory}
          />
        </div>
      </section>
    </>
  );
};
