import classes from './Chat.module.css';

const ChatFooter = ({sendMessage, message, setMessage}) => {

  return (
    <div className={classes.ChatFooter}>
      <form className={classes.form} onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className={classes.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={classes.leaveBtn}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;