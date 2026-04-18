import PropTypes from "prop-types";
import "./pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const maxPageButtons = 3;

  let startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="first-page"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        {"<<"}
      </button>

      <button
        className="prev-page"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page ${currentPage === page ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="next-page"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        {">"}
      </button>

      <button
        className="last-page"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};