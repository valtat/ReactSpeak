import { useNavigate } from 'react-router-dom';
import classes from './Chat.module.css';

const ChatBody = ({chat}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className={classes.bodyHeader}>
        <p>Hangout with Colleagues</p>
        <button className={classes.leave} onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      {/*This shows messages sent from you*/}
      <div className="message__container">
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        {/*This shows messages received by you*/}
        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I&apos;m good, you?</p>
          </div>
        </div>

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;