import styles from './Message.module.css';

function Message() {
  return (
    <p className={styles.message}>
      <span role='img'>👋</span>
    </p>
  );
}

// function Message({ message }) {
//   return (
//     <p className={styles.message}>
//       <span role="img">👋</span> {message}
//     </p>
//   );
// }

export default Message;
