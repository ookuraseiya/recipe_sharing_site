import Moment from 'moment';
import { Link } from 'react-router-dom';
import { RecipeType } from '../utility/type/RecipeType';

interface RecipePostsType {
  posts: RecipeType[];
}

interface RecipePostType extends RecipePostsType {
  firstPost?: number;
  lastPost?: number;
  recipeId?: string;
  relationCategory?: string;
}

export const Card = ({
  posts,
  firstPost,
  lastPost,
  recipeId,
  relationCategory,
}: RecipePostType) => {
  return (
    <>
      {firstPost !== undefined &&
      lastPost !== undefined &&
      recipeId == undefined &&
      relationCategory == undefined
        ? posts.slice(firstPost, lastPost).map((post) => (
            <Link
              className="card"
              key={post.id}
              to={`/recipeDetail/${post.id}`}
            >
              <li className="card__layout">
                <img
                  className="card__image"
                  src={post.image.url}
                  alt="Card Image"
                />
                <div className="card__content">
                  <p className="card__category">
                    カテゴリ:
                    <span className="card__category--span">
                      {post.category}
                    </span>
                  </p>
                  <p className="card__postTime">
                    投稿時間:
                    <span className="card__postTime--span">
                      {Moment(post.createdAt).format('YYYY/MM/DD HH:mm')}
                    </span>
                  </p>
                  <p className="card__duration">
                    所要時間:
                    <span className="card__duration--span">
                      {post.duration}分
                    </span>
                  </p>
                  <h1 className="card__title">{post.name}</h1>
                </div>
              </li>
            </Link>
          ))
        : posts
            .filter(
              (post) =>
                relationCategory &&
                post.category.includes(relationCategory[0]) &&
                post.id !== recipeId
            )
            .slice(0, 3)
            .map((post) => (
              <Link
                className="card"
                key={post.id}
                to={`/recipeDetail/${post.id}`}
              >
                <li className="card__layout">
                  <img
                    className="card__image"
                    src={post.image.url}
                    alt="Card Image"
                  />
                  <div className="card__content">
                    <p className="card__category">
                      カテゴリ:
                      <span className="card__category--span">
                        {post.category}
                      </span>
                    </p>
                    <p className="card__postTime">
                      投稿時間:
                      <span className="card__postTime--span">
                        {Moment(post.createdAt).format('YYYY/MM/DD HH:mm')}
                      </span>
                    </p>
                    <p className="card__duration">
                      所要時間:
                      <span className="card__duration--span">
                        {post.duration}分
                      </span>
                    </p>
                    <h1 className="card__title">{post.name}</h1>
                  </div>
                </li>
              </Link>
            ))}
    </>
  );
};
