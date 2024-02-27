import { RecipeType } from './type/RecipeType';

export const RecipeDetailJudge = (posts: RecipeType[]) => {
  if (posts.length === 0) {
    return false;
  } else {
    return true;
  }
};
