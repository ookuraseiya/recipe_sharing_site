import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from './Card';
import { Pagination } from '../utility/Pagination';
import { RecipeType } from '../utility/type/RecipeType';
import { RecipeListJudge } from '../utility/RecipeListJudge';

interface RecipePostsType {
  posts: RecipeType[];
}

export const RecipeList = ({ posts }: RecipePostsType) => {
  let { pageId } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(Number(pageId));
  }, [pageId]);

  const PER_PAGE: number = 9;
  const lastPost: number = currentPage * PER_PAGE;
  const firstPost: number = lastPost - PER_PAGE;
  const totalPosts: number = posts.length;
  const paginationNumber: number = Math.ceil(totalPosts / PER_PAGE);

  return (
    <>
      <div className="recipe__list">
        {RecipeListJudge(Number(pageId), paginationNumber) ? (
          <>
            <ul className="recipe__list--wrapper">
              <Card posts={posts} firstPost={firstPost} lastPost={lastPost} />
            </ul>
            <Pagination
              pageId={Number(pageId)}
              currentPage={currentPage}
              paginationNumber={paginationNumber}
            />
          </>
        ) : (
          <h1 className="recipe__list--error">レシピがありません。</h1>
        )}
      </div>
    </>
  );
};
