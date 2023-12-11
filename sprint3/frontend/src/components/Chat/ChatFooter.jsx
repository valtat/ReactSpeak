
const ChatFooter = ({sendMessage, message, setMessage}) => {

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;