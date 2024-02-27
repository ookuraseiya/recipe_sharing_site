import { RecipeType } from '../type/RecipeType';

export const FetchData = async ({
  query,
  categoryState,
}: {
  query: string;
  categoryState: string;
}) => {
  const response = await fetch(
    `${String(import.meta.env.VITE_MICROCMS_DOMAIN)}${String(
      import.meta.env.VITE_MICROCMS_ENDPOINT
    )}`,
    {
      headers: {
        'X-API-KEY': String(import.meta.env.VITE_MICROCMS_API_KEY),
      },
      method: 'GET',
    }
  );

  const data = await response.json();
  let searchResult: RecipeType[] = data.contents;

  if (query && categoryState) {
    searchResult = searchResult.filter(
      (item: RecipeType) =>
        item.name.includes(query) && item.category.includes(categoryState)
    );
  } else if (!query && categoryState) {
    searchResult = searchResult.filter((item: RecipeType) =>
      item.category.includes(categoryState)
    );
  } else {
    searchResult = searchResult.filter((item: RecipeType) =>
      item.name.includes(query)
    );
  }

  return searchResult;
};
