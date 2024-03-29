import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { _Button } from '../../features/ListView/ui/style';
import { baseApi } from '../../shared/api/BaseApi';

const ChatBtn = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #8a8a8a;
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
  gap: 8px;
  right: 30px;
  bottom: 100px;
  width: 300px;
  height: 400px;
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
  padding: 10px;
  margin: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background-color: #515151;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-track-color: #515151;
`;

const _AiChat = styled(motion.p)`
  display: flex;
  width: fit-content;
  padding: 8px;
  margin: 0;
  border-radius: 8px;
  background-color: #6f6f6f;
`;

const _MyChat = styled(motion.p)`
  display: flex;
  width: fit-content;
  padding: 8px;
  margin: 0;
  border-radius: 8px;
  background-color: #3070d1;
`;

const _LoadingChat = styled(motion.p)`
  display: flex;
  width: fit-content;
  padding: 12px;
  margin: 8px;
  border-radius: 50px;
  background-color: #606060;
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
  border-radius: 8px;
  box-sizing: border-box;
`;

interface Message {
  text: string;
  role: 'user' | 'bot';
}

function Chatbot() {
  const [chatWindow, setChatWindow] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      const chatAreaElement = chatAreaRef.current;
      chatAreaElement.scrollTop = chatAreaElement.scrollHeight;
    }
  }, [messages]);

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

        // API 응답을 채팅 메시지로 추가
        if (response.data) {
          const botMessage: Message = {
            text: response.data.result,
            role: 'bot',
          };
          setChatLoading(false);
          setMessages((messages) => [...messages, botMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  function toggleChat() {
    setChatWindow(!chatWindow);
  }

  return (
    <div>
      <AnimatePresence>
        <ChatBtn onClick={toggleChat}></ChatBtn>
        {chatWindow ? (
          <Chat
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
                    <_AiChat className="bot-message">{message.text}</_AiChat>
                  ) : (
                    <_MyChat className="user-message">{message.text}</_MyChat>
                  )}
                  {index === messages.length - 1 && chatLoading && (
                    <_LoadingChat>답변을 생성하고 있습니다</_LoadingChat>
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
              />
              <_Button onClick={handleSendMessage}>전송</_Button>
            </_InputContainer>
          </Chat>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;