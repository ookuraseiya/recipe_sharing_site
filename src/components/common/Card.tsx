import Moment from 'moment';
import { Link } from 'react-router-dom';

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

interface CardType {
  posts: Recipe[];
}

export const Card = ({ posts }: CardType) => {
  return (
    <>
      {posts.map((post) => (
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
