import MessagePlayer from "../message-player/message-player.component";
import styles from "./message-item.module.css";

const MessageItem = ({ item }) => {
  //   console.log(item);

  const date = new Date(item.Received.text).toLocaleString();
  return (
    <div className={styles.item}>
      <div className={styles.date}>{date}</div>
      <div className={styles.number}>{item.From.text}</div>
      <MessagePlayer duration={item.Duration.text} />
    </div>
  );
};
export default MessageItem;
