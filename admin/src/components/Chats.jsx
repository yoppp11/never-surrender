// import {
//     addDoc,
//     collection,
//     doc,
//     onSnapshot,
//     orderBy,
//     query,
//     serverTimestamp,
//     updateDoc
// } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import './styles/Chats.css';

import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBLBL6IXuCyCVyTyuefo5RXh_9djVdpHJ4",
    authDomain: "nvr-srndr.firebaseapp.com",
    projectId: "nvr-srndr",
    storageBucket: "nvr-srndr.firebasestorage.app",
    messagingSenderId: "473745279322",
    appId: "1:473745279322:web:29870c34be6942eb25cb63"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function Chats({ appointmentId, patientId, doctorId }){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    console.log(appointmentId, patientId, doctorId);

    const getOrCreateChatRoom = async () => {
        try {
          
          const chatsRef = collection(db, 'Chats');
          const q = query(
            chatsRef,
            where('bookingId', '==', appointmentId),
            where('patientId', '==', patientId),
            where('doctorId', '==', doctorId)
          );
          
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            
            const existingChat = querySnapshot.docs[0];
            setChatId(existingChat.id);
            return existingChat.id;
          }
          
          
          const newChatRef = await addDoc(chatsRef, {
            bookingId: appointmentId,
            patientId,
            doctorId,
            lastMessage: "Chat dimulai",
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
          });
          
          setChatId(newChatRef.id);
          return newChatRef.id;
        } catch (error) {
          console.error("Error in getOrCreateChatRoom:", error);
          throw error;
        }
      };
    
      
      useEffect(() => {
        if (!appointmentId || !patientId || !doctorId) return;
    
        const initializeChat = async () => {
          setLoading(true);
          try {
            await getOrCreateChatRoom();
          } catch (error) {
            console.error("Failed to initialize chat:", error);
          } finally {
            setLoading(false);
          }
        };
    
        initializeChat();
    
        
        return () => {
          
        };
      }, [appointmentId, patientId, doctorId]);
    
      
      useEffect(() => {
        if (!chatId) return;
    
        const messagesRef = collection(db, `Chats/${chatId}/Messages`);
        const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const loadedMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
          }));
          setMessages(loadedMessages);
          
          
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        });
    
        return () => unsubscribe();
      }, [chatId]);
    
      const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!newMessage.trim() || !chatId) return;
    
        try {
          const messagesRef = collection(db, `Chats/${chatId}/Messages`);
          
    
          await addDoc(messagesRef, {
            senderId: doctorId,
            text: newMessage,
            timestamp: serverTimestamp(),
            read: false
          });
          
         
          const chatRef = doc(db, 'Chats', chatId);
          await updateDoc(chatRef, {
            lastMessage: newMessage,
            updatedAt: serverTimestamp()
          });
          
          setNewMessage('');
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };

      if (loading) {
        return <div className="loading-chat">Memuat percakapan...</div>;
      }
    
      if (!chatId) {
        return <div className="error-chat">Gagal memuat percakapan</div>;
      }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Konsultasi dengan Dokter</h3>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message ${message.senderId === doctorId ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ketik pesan Anda..."
        />
        <button type="submit" disabled={!newMessage.trim()}>
          Kirim
        </button>
      </form>
    </div>
  );
}