import { useEffect, useState } from 'react';
import { Search } from '../components/utility/search/Search';
import { RecipeList } from '../components/common/RecipeList';
import { RecipeType } from '../components/utility/type/RecipeType';
import { Loading } from '../components/animetions/Loading';
import { FadeIn } from '../components/animetions/FadeIn';

export const Recipe = () => {
  const [posts, setPosts] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FadeIn>
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
          </FadeIn>
        </>
      )}
    </>
  );
};
