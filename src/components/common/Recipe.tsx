import { Card } from './Card';
import { Pagination } from '../utility/navigation/Pagination';
import { Search } from '../utility/search/Serch';

export const Recipe = () => {
  return (
    <>
      <section className="recipe">
        <div className="recipe__container">
          <div className="recipe__heading">
            <h1 className="recipe__title">大倉家のレシピ共有サイト</h1>
            <p className="recipe__lead">オンマの飯しか勝たん</p>
          </div>
          <div className="recipe__wrapper">
            <div className="recipe__list">
              <ul className="recipe__list--wrapper">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </ul>
              <Pagination />
            </div>
            <Search />
          </div>
        </div>
      </section>
    </>
  );
};
