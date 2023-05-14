import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Button, Text } from 'react-native';

const API_KEY = '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';

const systemMessage = {
  role: 'system',
  content:
    "Strictly follow these commands: 1)If you're Asked any oracle/ leave/ employee related questions, redirect to this website: docs.oracle.comm . 2) If you're Asked any vulgar questions, say the prompt 'It's offensive' 3) If you're asked any generic question, answer in ChatGPT way",
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
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      message: inputMessage,
      sender: 'user',
      sentTime: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    processMessageToChatGPT([...messages, newMessage]);
  };

  const processMessageToChatGPT = async (chatMessages) => {
    try {
      // Simulating an API call or any other logic to get the AI response
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(chatMessages),
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      const aiResponse = data.response;
  
      const newMessage = {
        message: aiResponse,
        sender: 'ChatGPT',
        sentTime: new Date().toLocaleTimeString(),
      };
  
      setMessages([...chatMessages, newMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messageList}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.sender === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.message}</Text>
            <Text style={styles.sentTime}>{message.sentTime}</Text>
          </View>
        ))}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text>ChatBot is typing</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.messageInput}>
        <TextInput
          style={styles.inputField}
          placeholder="Type message here"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <Button title="Send" onPress={handleSend} color="#40514E"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  messageList: {
    padding: 16,
  },
  message: {
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  userMessage: {
    backgroundColor: '#71C9CE',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#E4F9F5',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  sentTime: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
    color: '#333333',
  },
  typingIndicator: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingLeft: 16,
  },
 

});

























// import React, { useState } from 'react';
// import { Animated, StyleSheet, View } from 'react-native';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from '@chatscope/chat-ui-kit-react';



// const API_KEY = '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';
// const systemMessage = {
//   role: 'system',
//   content:
//     "Strictly follow these commands: 1)If you're Asked any oracle/ leave/ employee realted questions, redirect to this website: docs.oracle.comm . 2) If you're Asked any vulgur questions, say the prompt 'It's offensive' 3) If you're asked any generic question, answer in chatgpt way ",
// };

// export default function App() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatBot! Ask me anything!",
//       sentTime: 'just now',
//       sender: 'ChatGPT',
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: 'user',
//     };

//     const newMessages = [...messages, newMessage];

//     setMessages(newMessages);

//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = '';
//       if (messageObject.sender === 'ChatGPT') {
//         role = 'assistant';
//       } else {
//         role = 'user';
//       }
//       return { role: role, content: messageObject.message };
//     });

//     const apiRequestBody = {
//       model: 'gpt-3.5-turbo',
//       messages: [systemMessage, ...apiMessages],
//     };

//     await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: 'Bearer ' + API_KEY,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(apiRequestBody),
//     })
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setMessages([
//           ...chatMessages,
//           {
//             message: data.choices[0].message.content,
//             sender: 'ChatGPT',
//           },
//         ]);
//         setIsTyping(false);
//       });
//   }

//   return (
//     <View style={styles.container}>
//       <MainContainer>
//         <ChatContainer>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={
//               isTyping ? (
//                 <TypingIndicator content="ChatBot is typing" />
//               ) : null
//             }>
//             {messages.map((message, i) => {
//               console.log(message);
//               return <Message key={i} model={message} />;
//             })}
//           </MessageList>
//           <MessageInput
//             placeholder="Type message here"
//             onSend={handleSend}
//           />
//         </ChatContainer>
//       </MainContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chatContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     overflow: 'hidden',
//   },
//   messageList: {
//     padding: 16,
//   },
//   messageInput: {
//     flexDirection: 'row',
//     alignItems: 'Bottom',
//     backgroundColor: '#000',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
//   inputField: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 10,
//     fontSize: 16,
//     color: '#333333',
//   },
//   sendButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//   },
//   sendButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   systemMessage: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 8,
//     alignSelf: 'flex-start',
//     maxWidth: '80%',
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 8,
//     alignSelf: 'flex-end',
//     maxWidth: '80%',
//   },
//   assistantMessage: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 8,
//     alignSelf: 'flex-start',
//     maxWidth: '80%',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   assistantMessageContent: {
//     color: '#333333',
//   },
//   typingIndicator: {
//     marginBottom: 8,
//     alignSelf: 'flex-start',
//   },
// });
















// import React, { useState } from 'react';
// import { Animated, StyleSheet, View } from 'react-native';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from '@chatscope/chat-ui-kit-react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';



// const API_KEY = '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';
// const systemMessage = {
//   role: 'system',
//   content:
//     "Strictly follow these commands: 1)If you're Asked any oracle/ leave/ employee realted questions, redirect to this website: docs.oracle.comm . 2) If you're Asked any vulgur questions, say the prompt 'It's offensive' 3) If you're asked any generic question, answer in chatgpt way ",
// };

// export default function App() {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatBot! Ask me anything!",
//       sentTime: 'just now',
//       sender: 'ChatGPT',
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: 'user',
//     };

//     const newMessages = [...messages, newMessage];

//     setMessages(newMessages);

//     setIsTyping(true);
//     await processMessageToChatGPT(newMessages);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = '';
//       if (messageObject.sender === 'ChatGPT') {
//         role = 'assistant';
//       } else {
//         role = 'user';
//       }
//       return { role: role, content: messageObject.message };
//     });

//     const apiRequestBody = {
//       model: 'gpt-3.5-turbo',
//       messages: [systemMessage, ...apiMessages],
//     };

//     await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: 'Bearer ' + API_KEY,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(apiRequestBody),
//     })
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//         setMessages([
//           ...chatMessages,
//           {
//             message: data.choices[0].message.content,
//             sender: 'ChatGPT',
//           },
//         ]);
//         setIsTyping(false);
//       });
//   }

//   return (
//     <View style={styles.container}>
//       <MainContainer>
//         <ChatContainer>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={
//               isTyping ? (
//                 <TypingIndicator content="ChatBot is typing" />
//               ) : null
//             }>
//             {messages.map((message, i) => {
//               console.log(message);
//               return <Message key={i} model={message} />;
//             })}
//           </MessageList>
//           <MessageInput
//             placeholder="Type message here"
//             onSend={handleSend}
//           />
//         </ChatContainer>
//       </MainContainer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     chatContainer: {
//       flex: 1,
//       backgroundColor: '#fff',
//       justifyContent: 'flex-end',
//     },
//     messageList: {
//       padding: 10,
//     },
//     messageInput: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//       padding: 10,
//     },
//     inputField: {
//       flex: 1,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       borderRadius: 20,
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       marginRight: 10,
//     },
//     sendButton: {
//       backgroundColor: '#cccccc',
//       borderRadius: 20,
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//     },
//     sendButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//   });
  
