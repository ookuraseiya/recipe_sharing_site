import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../components/common/Footer';
import { Header } from '../components/common/Header';
import { Relation } from '../components/common/Relation';

type Image = {
  url: string;
  height: number;
  width: number;
};

type Recipe = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  image: Image;
  duration: number;
  category: string;
};

interface RecipeType {
  posts: Recipe[];
}

export const RecipeDetail = () => {
  // const [posts, setPosts] = useState([]);
  // const { recipeId } = useParams();

  // useEffect(() => {
  //   fetch(
  //     `${String(import.meta.env.VITE_MICROCMS_DOMAIN)}${String(
  //       import.meta.env.VITE_MICROCMS_ENDPOINT
  //     )}${String(recipeId)}`,
  //     {
  //       headers: {
  //         'X-API-KEY': String(import.meta.env.VITE_MICROCMS_API_KEY),
  //       },
  //       method: 'GET',
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data.contents);
  //     });
  // }, [recipeId]);

  return (
    <>
      <Header />
      {/* {posts.map((post) => (
      ))} */}
      <section className="recipeDetail">
        <div className="recipeDetail__container">
          <h1 className="recipeDetail__title">
            生クリームを使ったカルボナーラのレシピの詳細
          </h1>
          <div className="recipeDetail__wrapper">
            <div className="recipeDetail__description">
              <div className="recipeDetail__item">
                <img
                  className="recipeDetail__item--image"
                  src="https://placekitten.com/300/150"
                  alt=""
                />
                <h1 className="recipeDetail__item--title">
                  生クリームを使ったカルボナーラ
                </h1>
                <p className="recipeDetail__item--postTime">
                  投稿時間:
                  <span className="recipeDetail__item--postTime--span">
                    2024/02/11
                  </span>
                </p>
                <p className="recipeDetail__item--category">
                  カテゴリ:
                  <span className="recipeDetail__item--category--span">
                    洋食
                  </span>
                </p>
                <p className="recipeDetail__item--duration">
                  所要時間:
                  <span className="recipeDetail__item--duration--span">
                    30分
                  </span>
                </p>

                <div className="richEditor">
                  {/* <div dangerouslySetInnerHTML={{ __html: post.richEditor }}></div> */}
                </div>
              </div>
              <div className="recipeDetail__description--button--position">
                <Link to="/">
                  <button className="recipeDetail__description--button">
                    レシピ一覧に戻る
                  </button>
                </Link>
              </div>
            </div>
            <Relation />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
