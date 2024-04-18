import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '/src/store/redux-hook/hook';
import { openModalChat } from '/src/store/actions/modalChatAction';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const user = useAppSelector(state => state.memberInformation.userInformation);
  const [socket, setsocket] = useState(null); // Add the 'socket' state variable
  const dispatch = useAppDispatch();
  const openChat = useAppSelector(state => state.chat.isOpen);

  useEffect(() => {
    const newSocket = new WebSocket(import.meta.env.VITE_WS);

    setsocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');

      newSocket.send(JSON.stringify({ type: 'getAllMessages' }));
    };

    newSocket.onmessage = async event => {
      const text = await event.data;
      const receivedMessages = JSON.parse(text);
      const parsedMessages = receivedMessages.map(messageStr =>
        JSON.parse(messageStr)
      );
      setMessages(parsedMessages);
    };

    return () => {
      newSocket.close();
    };
  }, []);
  const sendMessage = () => {
    if (messageInput !== '' && socket && socket.readyState === WebSocket.OPEN) {
      console.log(user);
      const message = {
        type: 'message',
        data: messageInput,
        user: user,
      };
      socket.send(JSON.stringify(message));
      setMessages(prevMessages => [...prevMessages, message]);
      setMessageInput('');
    }
  };
  return (
    <>
      {openChat && (
        <dialog className="modal" open>
          <div className="modal-box flex flex-col">
            <div className="chat chat-start overflow-y-auto overflow-x-hidden flex flex-col gap-2 items-start">
              {messages.map((message, index) => (
                <div
                  className={`chat-bubble mb-2 min-h-24 ${
                    message.user && message.user.id === user.id
                      ? 'self-end bg-sky-600'
                      : 'self-start'
                  }`}
                  key={index}
                  onClick={e => e.preventDefault()}
                >
                  <div className="flex flex-row items-center">
                    <img
                      className="rounded-full"
                      src={
                        message.data && message.user.avatar
                          ? `https://res.cloudinary.com/${
                              import.meta.env.VITE_CDNY_CLOUDNAME
                            }/image/upload/c_scale,w_30,h_30/v1/otalent/${
                              message.user.avatar
                            }`
                          : `https://res.cloudinary.com/${
                              import.meta.env.VITE_CDNY_CLOUDNAME
                            }/image/upload/c_scale,w_30,h_30/v1/otalent/yocggnbjzfjygu3naanv`
                      }
                      alt="Avatar"
                    />
                    <span className="ml-2 font-extrabold uppercase">
                      {(message.user && message.user.firstname) ||
                        'Utilisateur inconnu'}
                    </span>
                  </div>
                  <p className="overflow-wrap break-word mt-2">
                    {message.data}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <div className="chat-input flex flex-col gap-2">
                <input
                  className="input input-bordered"
                  type="text"
                  placeholder="Entrez votre message"
                  value={messageInput}
                  onChange={e => {
                    setMessageInput(e.target.value);
                  }}
                />
                <button className="btn btn-success" onClick={sendMessage}>
                  Envoyer
                </button>
              </div>
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  dispatch(openModalChat(false));
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Chat;
