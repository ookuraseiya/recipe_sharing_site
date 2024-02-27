import Moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Relation } from '../components/common/Relation';
import { RecipeType } from '../components/utility/type/RecipeType';
import { Loading } from '../components/animetions/Loading';
import { FadeIn } from '../components/animetions/FadeIn';
import { NotFoundPage } from './404';
import { RecipeDetailJudge } from '../components/utility/RecipeDetailJudge';

export const RecipeDetail = () => {
  const [posts, setPosts] = useState<RecipeType[]>([]);
  const [relationPosts, setRelationPosts] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { recipeId } = useParams();

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
        setPosts(
          data.contents?.filter(
            (data: { id: string }) => data.id === String(recipeId)
          ) || []
        );
        setRelationPosts(data.contents);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setPosts([]);
        setRelationPosts([]);
        setLoading(false);
      });
  }, [recipeId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : RecipeDetailJudge(posts) ? (
        <>
          <FadeIn>
            {posts.map((post) => (
              <section className="recipeDetail" key={post.id}>
                <div className="recipeDetail__container">
                  <h1 className="recipeDetail__title">
                    {post.name}のレシピの詳細
                  </h1>
                  <div className="recipeDetail__wrapper">
                    <div className="recipeDetail__description">
                      <div className="recipeDetail__item">
                        <img
                          className="recipeDetail__item--image"
                          src={post.image.url}
                          alt="Recipe Image"
                        />
                        <h1 className="recipeDetail__item--title">
                          {post.name}
                        </h1>
                        <p className="recipeDetail__item--postTime">
                          投稿時間:
                          <span className="recipeDetail__item--postTime--span">
                            {Moment(post.createdAt).format('YYYY/MM/DD HH:mm')}
                          </span>
                        </p>
                        <p className="recipeDetail__item--category">
                          カテゴリ:
                          <span className="recipeDetail__item--category--span">
                            {post.category}
                          </span>
                        </p>
                        <p className="recipeDetail__item--duration">
                          所要時間:
                          <span className="recipeDetail__item--duration--span">
                            {post.duration}分
                          </span>
                        </p>

                        <div className="description">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="recipeDetail__description--button--position">
                        <Link to="/1">
                          <button className="recipeDetail__description--button">
                            レシピ一覧に戻る
                          </button>
                        </Link>
                      </div>
                    </div>
                    <Relation
                      relationPosts={relationPosts}
                      recipeId={post.id}
                      relationCategory={post.category}
                    />
                  </div>
                </div>
              </section>
            ))}
          </FadeIn>
        </>
      ) : (
        <>
          <FadeIn>
            <NotFoundPage />
          </FadeIn>
        </>
      )}
    </>
  );
};
