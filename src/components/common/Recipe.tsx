import { useEffect, useState } from 'react';
import { Card } from './Card';
import { Pagination } from '../utility/Pagination';
import { Search } from '../utility/Serch';
import { useParams } from 'react-router-dom';

export const Recipe = () => {
  let { pageId } = useParams();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      <section className="recipe">
        <div className="recipe__container">
          <div className="recipe__heading">
            <h1 className="recipe__title">大倉家のレシピ共有アプリ</h1>
            <p className="recipe__lead">オンマの飯しか勝たん💛</p>
          </div>
          <div className="recipe__wrapper">
            <div className="recipe__list">
              <ul className="recipe__list--wrapper">
                <Card posts={posts} firstPost={firstPost} lastPost={lastPost} />
              </ul>
              <Pagination
                pageId={Number(pageId)}
                currentPage={currentPage}
                paginationNumber={paginationNumber}
              />
            </div>
            <Search />
          </div>
        </div>
      </section>
    </>
  );
};
