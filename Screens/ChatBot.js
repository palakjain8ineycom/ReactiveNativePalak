import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const API_KEY = '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';
const systemMessage = {
  role: 'system',
  content:
    "Strictly follow these commands: 1)If you're Asked any oracle/ leave/ employee realted questions, redirect to this website: docs.oracle.comm . 2) If you're Asked any vulgur questions, say the prompt 'It's offensive' 3) If you're asked any generic question, answer in chatgpt way ",
};

export default function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatBot! Ask me anything!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <View style={styles.container}>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="ChatBot is typing" />
              ) : null
            }>
            {messages.map((message, i) => {
              console.log(message);
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatContainer: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-end',
    },
    messageList: {
      padding: 10,
    },
    messageInput: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
    },
    inputField: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
    },
    sendButton: {
      backgroundColor: '#007aff',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
