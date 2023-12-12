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
        <p>Hangout with Locals</p>
        <button className={classes.leave} onClick={handleLeaveChat}>
          Leave chat
        </button>
      </header>

      <div className={classes.messageContainer}>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </>
  );
};

export default ChatBody;