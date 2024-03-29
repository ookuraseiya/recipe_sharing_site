import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeType } from '../type/RecipeType';
import { FetchData } from './FetchData';

export const Search = ({
  setPosts,
}: {
  setPosts: (setPosts: RecipeType[]) => void;
}) => {
  const [query, setQuery] = useState<string>('');
  const [categoryState, setCategoryState] = useState<string>('');
  const navigate = useNavigate();
  const categorys: string[] = [
    '洋食',
    '和食',
    '中華料理',
    '韓国料理',
    'その他',
  ];

  const clearRadio = (value: string) => {
    if (value === 'category') {
      setCategoryState('');
    }
  };

  const handleSearch = async () => {
    const searchResult = await FetchData({ query, categoryState });
    setPosts(searchResult);
    setQuery('');
    setCategoryState('');
    navigate('/1');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="search">
        <h1 className="search__title">検索機能</h1>
        <form
          className="search__form"
          action="#"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="search__text"
            type="text"
            placeholder="料理名を入力"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search__category">
            {categorys.map((category) => {
              return (
                <label className="search__label" key={category}>
                  <input
                    className="search__radio"
                    id={category}
                    type="radio"
                    name="category"
                    value={category}
                    checked={categoryState === category}
                    onChange={() => setCategoryState(category)}
                    onClick={() => clearRadio('category')}
                  />
                  {category}
                </label>
              );
            })}
          </div>
          <div className="search__button--position">
            <button
              className="search__button"
              type="button"
              onClick={handleSearch}
            >
              検索
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
