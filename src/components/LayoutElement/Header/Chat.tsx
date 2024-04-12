import React, { useState, useEffect } from 'react';
import { queryNameMember, queryNameOrganization } from '../../../query';
import { requestWithoutVariable } from '../../../utils';
import { useAppSelector } from '../../../store/redux-hook/hook';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const user = useAppSelector(state => state.token.user);
    const [socket, setSocket] = useState(null); // Add the 'socket' state variable
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:3000');

        setSocket(newSocket);

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
        if (
            messageInput !== '' &&
            socket &&
            socket.readyState === WebSocket.OPEN
        ) {
            const message = {
                type: 'message',
                data: messageInput,
                userId: user.id,
            };
            socket.send(JSON.stringify(message));
            setMessages(prevMessages => [...prevMessages, message]);
            setMessageInput('');
        }
    };
    return (
        <>
            <button className="btn" onClick={() => setIsOpen(true)}>
                Ouvrir la messagerie
            </button>
            {isOpen && (
                <dialog className="modal" open>
                    <div className=" modal-box">
                        <div className="chat chat-start">
                            {messages.map((message, index) => (
                                <p
                                    className="chat-bubble"
                                    key={index}
                                    onClick={e => e.preventDefault()}
                                >
                                    {message.userId}
                                    {' : '}
                                    {message.data}
                                </p>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                placeholder="Entrez votre message"
                                value={messageInput}
                                onChange={e => {
                                    setMessageInput(e.target.value);
                                }}
                            />
                            <button
                                className="btn btn-info"
                                onClick={sendMessage}
                            >
                                Envoyer
                            </button>
                        </div>
                        <button
                            className="btn btn-error"
                            onClick={() => setIsOpen(false)}
                        >
                            Fermer
                        </button>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default Chat;
