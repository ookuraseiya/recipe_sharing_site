import { Link } from 'react-router-dom';

type PaginationProps = {
  pageId: number;
  currentPage: number;
  paginationNumber: number;
};

export const Pagination = ({
  pageId,
  currentPage,
  paginationNumber,
}: PaginationProps) => {
  return (
    <>
      <section className="pagination">
        <ul className="pagination__list">
          <li
            className={
              pageId === 1 ? 'pagination__disabled' : 'pagination__link'
            }
          >
            <Link className="pagination__href" to={`/${pageId - 1}`}>
              &lt;
            </Link>
          </li>
          <li className="pagination__position">
            {currentPage} / {paginationNumber}
          </li>
          <li
            className={
              pageId === paginationNumber
                ? 'pagination__disabled'
                : 'pagination__link'
            }
          >
            <Link className="pagination__href" to={`/${pageId + 1}`}>
              &gt;
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};
