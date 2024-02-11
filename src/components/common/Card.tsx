import Moment from 'moment';
import { Link } from 'react-router-dom';
import { RecipeType } from '../utility/type/RecipeType';

interface RecipePostType extends RecipeType {
  firstPost: number;
  lastPost: number;
}

export const Card = ({ posts, firstPost, lastPost }: RecipePostType) => {
  return (
    <>
      {posts.slice(firstPost, lastPost).map((post) => (
        <Link className="card" key={post.id} to={`/recipeDetail/${post.id}`}>
          <li>
            <img
              className="card__image"
              src={post.image.url}
              alt="Card Image"
            />
            <div className="card__content">
              <p className="card__category">
                カテゴリ:
                <span className="card__category--span">{post.category}</span>
              </p>
              <p className="card__postTime">
                投稿時間:
                <span className="card__postTime--span">
                  {Moment(post.createdAt).format('YYYY/MM/DD HH:mm')}
                </span>
              </p>
              <p className="card__duration">
                所要時間:
                <span className="card__duration--span">{post.duration}分</span>
              </p>
              <h1 className="card__title">{post.name}</h1>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
};
