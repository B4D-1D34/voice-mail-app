import { useEffect, useState } from "react";
import MessageItem from "../message-item/message-item.component";
import Pagination from "../pagination/pagination.component";
import styles from "./message-list.module.css";

const MessageList = ({ arr }) => {
  const itemsPerPage = 10;
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => setPageNumber(1), [arr]);

  const showedArr = arr.slice(
    pageNumber * itemsPerPage - itemsPerPage,
    pageNumber * itemsPerPage
  );
  // console.log(arr);
  return (
    <div>
      <div className={styles.head}>
        <div className={styles.date}>Дата</div>
        <div className={styles.number}>Номер</div>
        <div className={styles.record}>Запись сообщения</div>
      </div>
      <div className={styles.list}>
        {showedArr.map((el, idx) => (
          <MessageItem key={`${el.Date.text}${el.From.text}${idx}`} item={el} />
        ))}
      </div>
      <Pagination
        pageCount={Math.ceil(arr.length / itemsPerPage)}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </div>
  );
};
export default MessageList;
