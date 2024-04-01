import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { _Button } from '../../features/ListView/ui/style';
import { baseApi } from '../../shared/api/BaseApi';
import SyncLoader from 'react-spinners/SyncLoader';
import { IoMdDocument } from 'react-icons/io';

const ChatBtn = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  background: rgb(48, 48, 48);
  background: linear-gradient(90deg, #444444 0%, #282828 100%);
  border-radius: 50px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transform-origin: center;

  &:hover {
    transform: scale(1.05);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transform-origin: center;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    transform-origin: center;
  }
`;

const Chat = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 20px;
  right: 30px;
  bottom: 100px;
  width: 30%;
  min-width: 300px;
  height: 60%;
  min-height: 400px;
  background-color: #383838;
  border-radius: 8px;
  z-index: 2;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  padding: 16px 20px;
  box-sizing: border-box;
`;

const _ChatArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  height: 100%;
  width: 100%;
  padding-right: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-track-color: #515151;
`;

const _AiChat = styled(motion.p)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
  padding: 12px;
  margin: 0;
  border-radius: 8px;
  background-color: #6f6f6f;
  line-height: 1.4;
  align-self: flex-end;
`;

const _AiSource = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #3b3b3b;
  &:hover {
    cursor: pointer;
    background-color: #5f5f5f;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
`;

const _MyChat = styled(motion.p)`
  display: flex;
  width: fit-content;
  padding: 12px;
  margin: 0;
  border-radius: 8px;
  background-color: #3070d1;
  line-height: 1.4;
  align-self: flex-start;
`;

const _LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
`;

const _LoadingChat = styled(motion.p)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 12px 20px;
  padding-bottom: 20px;
  margin: 20px;
  margin: 8px;
  font-size: 12px;
  border-radius: 8px;
  background-color: #60606000;
`;

const _InputContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  margin: 0;
  gap: 8px;
  box-sizing: border-box;
`;

const _Input = styled(motion.input)`
  display: flex;
  width: 100%;
  padding: 8px;
  background-color: #515151;
  border: none;
  color: #cccccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

interface Message {
  text: string;
  role: 'user' | 'bot';
  link?: string;
  content?: string;
}

function Chatbot() {
  const [chatWindow, setChatWindow] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      const chatAreaElement = chatAreaRef.current;
      chatAreaElement.scrollTop = chatAreaElement.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // ChatBtn이 클릭된 경우 함수를 종료
      if (target.closest('#chat-button')) {
        return;
      }
      if (chatRef.current && !chatRef.current.contains(target)) {
        setChatWindow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      // 사용자 메시지를 먼저 추가
      const userMessage: Message = { text: input, role: 'user' };
      setMessages((messages) => [...messages, userMessage]);

      const inputMsg = input;
      setInput('');
      setChatLoading(true);

      try {
        const response = await baseApi.post(`/chatAI`, {
          question: inputMsg,
        });

        console.log(response);

        // API 응답을 채팅 메시지로 추가
        if (response.data) {
          const botMessage: Message = {
            // text: response.data.ai.result,
            text: response.data.ai,
            role: 'bot',
          };
          // const botSourceTitle: Message = {
          //   text: response.data.source.title,
          //   role: 'bot',
          //   link: response.data.source.postId,
          //   content: response.data.source.content,
          // };
          setChatLoading(false);
          // setMessages((messages) => [...messages, botMessage, botSourceTitle]);
          setMessages((messages) => [...messages, botMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  function toggleChat(event: React.MouseEvent) {
    event.stopPropagation();
    setChatWindow(!chatWindow);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      <ChatBtn id="chat-button" onClick={toggleChat}>
        <img src="/robot.svg"></img>
      </ChatBtn>
      {chatWindow ? (
        <Chat
          ref={chatRef}
          key="chatWindow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
        >
          <h2>내 문서 기반 AI 대화</h2>

          <_ChatArea ref={chatAreaRef}>
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message.role === 'bot' ? (
                  <_AiChat className="bot-message">
                    {message.link ? (
                      <_AiSource
                        href={
                          `/user/starwrite/listview/main/${localStorage.getItem('nickname')}/all/` +
                          message.link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoMdDocument />
                        {message.text}
                      </_AiSource>
                    ) : (
                      message.text
                    )}
                    {message.content && (
                      <div className="message-content">{message.content}</div>
                    )}
                  </_AiChat>
                ) : (
                  <_MyChat className="user-message">{message.text}</_MyChat>
                )}

                {index === messages.length - 1 && chatLoading && (
                  <_LoadingContainer>
                    <_LoadingChat>
                      답변을 생성하고 있습니다
                      <SyncLoader
                        color="#e3e3e3"
                        speedMultiplier={0.2}
                        size={6}
                        margin={3}
                      />
                    </_LoadingChat>
                  </_LoadingContainer>
                )}
              </div>
            ))}
          </_ChatArea>
          <_InputContainer>
            <_Input
              value={input}
              placeholder="검색어를 입력하세요"
              type="text"
              onChange={(e) => handleInputChange(e)}
              onKeyDown={handleKeyDown}
            />
            <_Button onClick={handleSendMessage}>전송</_Button>
          </_InputContainer>
        </Chat>
      ) : null}
    </AnimatePresence>
  );
}

export default Chatbot;
