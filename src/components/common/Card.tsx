export const Card = () => {
  return (
    <>
      <li className="card">
        <img
          className="card__image"
          src="https://placekitten.com/300/150"
          alt="Card Image"
        />
        <div className="card__content">
          <p className="card__category">
            カテゴリ:
            <span className="card__category--span">洋食</span>
          </p>
          <p className="card__postTime">
            投稿時間:
            <span className="card__postTime--span">2024/02/10</span>
          </p>
          <p className="card__duration">
            所要時間:
            <span className="card__duration--span">30分</span>
          </p>
          <h1 className="card__title">生クリームを使ったカルボナーラ</h1>
        </div>
      </li>
    </>
  );
};
