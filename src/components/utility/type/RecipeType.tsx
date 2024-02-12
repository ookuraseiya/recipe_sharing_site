type Image = {
  url: string;
  height: number;
  width: number;
};

export type RecipeType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  image: Image;
  duration: number;
  category: string;
  description: string;
};
