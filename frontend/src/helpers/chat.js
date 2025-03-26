import { initializeApp } from 'firebase/app'
import { Timestamp, addDoc, collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore/lite'

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

class Chat{
    static async getFromFirebase(){
        try {
                const doctorColl = collection(db, 'Doctors')
                const querySnapshot = (await getDocs(doctorColl)).docs.map(doc => doc.data()) 
    
                // res.json(querySnapshot)
                console.log(querySnapshot);
                return querySnapshot
            } catch (error) {
                console.log(error);
            }
    }

    static async sendMessage(message, userId, doctorId){
        try {
            await updateDoc(doc(db, 'Chats', userId.toString()), {
                lastMessage: message
            })
            
            await addDoc(collection(db, 'Chats', userId.toString(), 'chat'), {
                message,
                receiverId: doctorId,
                roomId: userId,
                senderId: userId,
                timeStamp: Timestamp.fromDate(new Date())
            })
            console.log('berhasil mengirim pesan');
        } catch (error) {
            console.log(error);
        }
    }
}

export default Chat