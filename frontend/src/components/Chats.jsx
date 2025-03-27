import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './styles/Chats.css';

import { initializeApp } from 'firebase/app';
import { getDocs, getFirestore } from 'firebase/firestore/lite';

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
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const findOrCreateChat = async () => {
        try {
            const chatsRef = collection(db, 'chats');
            const q = query(
            chatsRef, 
            where('appointmentId', '==', appointmentId),
            where('patientId', '==', patientId),
            where('doctorId', '==', doctorId)
            );
            
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
            const chatDoc = querySnapshot.docs[0];
            setChatId(chatDoc.id);
            return;
            }
            
            const newChatRef = await addDoc(chatsRef, {
            appointmentId,
            patientId,
            doctorId,
            lastMessage: "Chat dimulai",
            updatedAt: serverTimestamp()
            });
            
            setChatId(newChatRef.id);
        } catch (error) {
            console.error("Error creating/finding chat:", error);
        }
        };

        findOrCreateChat();
    }, [appointmentId, patientId, doctorId]);

    useEffect(() => {
        if (!chatId) return;
        
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        const q = query(messagesRef, orderBy('timestamp', 'asc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        setMessages(msgs);
        
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
        const messagesRef = collection(db, `chats/${chatId}/messages`);
        
        await addDoc(messagesRef, {
            senderId: patientId, 
            text: newMessage,
            timestamp: serverTimestamp(),
            read: false
        });
        
        const chatRef = doc(db, 'chats', chatId);
        await updateDoc(chatRef, {
            lastMessage: newMessage,
            updatedAt: serverTimestamp()
        });
        
        setNewMessage('');
        } catch (error) {
        console.error("Error sending message:", error);
        }
    };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Konsultasi dengan Dokter</h3>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message ${message.senderId === patientId ? 'sent' : 'received'}`}
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