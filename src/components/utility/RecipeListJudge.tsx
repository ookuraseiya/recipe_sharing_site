export const RecipeListJudge = (
  pageId: number | any,
  paginationNumber: number
) => {
  if (
    1 > Number(pageId) ||
    paginationNumber < Number(pageId) ||
    isNaN(Number(pageId))
  ) {
    return false;
  } else {
    return true;
  }
};
