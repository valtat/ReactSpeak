import classes from "./Chat.module.css";

const ChatBar = () => {
  return (
    <div className={classes.sidebar}>
      <h2>Chat</h2>

      <div>
        <h4 className={classes.header}>ACTIVE USERS</h4>
        <div className={classes.users}>
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;