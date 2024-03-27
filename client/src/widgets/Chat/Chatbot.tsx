import React from 'react';
import styled from 'styled-components';

const ChatBtn = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50px;
`;

function Chatbot() {
  return (
    <div>
      <ChatBtn />
    </div>
  );
}

export default Chatbot;
