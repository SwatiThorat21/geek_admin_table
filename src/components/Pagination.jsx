import PropTypes from "prop-types";
import "./pagination.css";

const Pagination = ({
  totalPosts,
  postsPerpage,
  setcurrentpage,
  currentPage,
}) => {
  let totalPages = Math.ceil(totalPosts / postsPerpage);
  let maxPageButtons = 3;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  let pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return (
    <>
      <div className="pagination">
        {/* First Page Button - Disabled on first page */}
        <button
          className="first-page"
          onClick={() => setcurrentpage(1)}
          disabled={currentPage === 1}
        >
          ««
        </button>

        {/* Previous Button - Disabled on first page */}
        <button
          className="prev-page"
          onClick={() => setcurrentpage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {/* Page Number Buttons */}
        {pages.map((page) => (
          <button
            key={page}
            className={`page ${currentPage === page ? "active" : ""}`}
            onClick={() => setcurrentpage(page)}
          >
            {page}
          </button>
        ))}

        {/* Next Button - Disabled on last page */}
        <button
          className="next-page"
          onClick={() => setcurrentpage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>

        {/* Last Page Button - Disabled on last page */}
        <button
          className="last-page"
          onClick={() => setcurrentpage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »»
        </button>
      </div>
    </>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerpage: PropTypes.number.isRequired,
  setcurrentpage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
