import React, { useState } from 'react';
import { Animated, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';


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
      <View style={styles.chatContainer}>
        <View style={styles.messageList}>
          {messages.map((message, i) => {
            console.log(message);
            return (
              <View key={i} style={styles.message}>
                <Text style={styles.messageText}>{message.message}</Text>
              </View>
            );
          })}
          {isTyping ? (
            <View style={styles.typingIndicator}>
              <Text style={styles.typingIndicatorText}>ChatBot is typing</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.messageInput}>
          <TextInput
            style={styles.inputField}
            placeholder="Type message here"
            onSend={handleSend}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleSend()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
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
              backgroundColor: '#cccccc',
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 10,
            },
            sendButtonText: {
              color: '#fff',
              fontWeight: 'bold',
            },
            message: {
              marginBottom: 10,
            },
            messageText: {
              fontSize: 16,
            },
            typingIndicator: {
              alignSelf: 'flex-end',
              marginTop: 10,
            },
            typingIndicatorText: {
              fontSize: 14,
              fontStyle: 'italic',
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
  
