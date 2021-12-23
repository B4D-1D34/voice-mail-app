import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./pagination.module.css";

const Pagination = ({ pageCount, setPageNumber, pageNumber }) => {
  if (!pageCount) {
    return null;
  }

  let pagesNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pagesNumbers.push(i);
  }
  //   console.log(`pagesNumbers`, pagesNumbers);

  const handlePageChange = ({ target }) => {
    const name = target.getAttribute("name");

    if (name === "next") {
      if (pageNumber === pageCount) {
        return;
      }
      setPageNumber(pageNumber + 1);
    } else if (name === "back") {
      if (pageNumber === 1) {
        return;
      }
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(parseInt(name));
    }
  };
  return (
    <div className={styles.pagination}>
      <FontAwesomeIcon
        className={styles.arrow}
        name="back"
        style={{ cursor: pageNumber === 1 ? "not-allowed" : "" }}
        icon={faArrowCircleLeft}
        onClick={handlePageChange}
      />
      {pagesNumbers.map((number) => (
        <div
          style={{
            background: pageNumber === number ? "rgb(237, 237, 237)" : "",
          }}
          name={number}
          key={number}
          className={styles.pageNumber}
          onClick={handlePageChange}
        >
          {number}
        </div>
      ))}
      <FontAwesomeIcon
        className={styles.arrow}
        name="next"
        style={{ cursor: pageNumber === pageCount ? "not-allowed" : "" }}
        icon={faArrowCircleRight}
        onClick={handlePageChange}
      />
    </div>
  );
};
export default Pagination;
