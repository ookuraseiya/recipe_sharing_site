import { Card } from './Card';
import { RecipeType } from '../utility/type/RecipeType';

export const Relation = ({
  relationPosts,
  recipeId,
  relationCategory,
}: {
  relationPosts: RecipeType[];
  recipeId: string;
  relationCategory: string;
}) => {
  return (
    <>
      <section className="relation">
        <div className="relation__wrapper">
          <h1 className="relation__title">
            {relationCategory}に関連するその他の料理
          </h1>
          <Card
            posts={relationPosts}
            recipeId={recipeId}
            relationCategory={relationCategory}
          />
        </div>
      </section>
    </>
  );
};
