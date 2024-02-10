export const Search = () => {
  return (
    <>
      <section className="search">
        <h1 className="search__title">検索機能</h1>
        <form className="search__form" action="#">
          <input
            className="search__text"
            type="text"
            placeholder="料理名を入力"
          />
          <div className="search__category">
            <label className="search__label">
              <input
                className="search__radio"
                type="radio"
                name="category"
                value="all"
              />
              全て
            </label>
            <label className="search__label">
              <input
                className="search__radio"
                type="radio"
                name="category"
                value="category"
              />
              カテゴリ
            </label>
            <label className="search__label">
              <input
                className="search__radio"
                type="radio"
                name="category"
                value="date"
              />
              日付
            </label>
          </div>
          <div className="search__button--position">
            <button className="search__button" type="button">
              検索
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
