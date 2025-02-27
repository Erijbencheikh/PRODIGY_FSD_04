import { useEffect, useState } from "react";
import "./chatlist.css"
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
const Chatlist = () => {

    const[addMode, setAddMode]=useState(false)
    const[input, setInput]=useState("")

    const[chats, setChats]=useState([])
    const {chatId,changeChat} = useChatStore()
    console.log(chatId);
    const {currentUser} = useUserStore()
    useEffect(()=>{
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async(res) => {
            const items = res.data().chats
            const promises = items.map(async(item)=>{
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data()
                return {...item, user}

            })
            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b)=> b.updatedAt - a.updatedAt))
        });
        return()=>{
            unSub()
        }
    },[currentUser.id])
    //console.log(chats);

    const handleSelect = async(chat)=>{
       
        const userChats = chats.map(item=>{
            const {user,...rest} = item
            return rest
        })
        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)
        userChats[chatIndex].isSeen =true
        const userChatsRef = doc(db, "userchats", currentUser.id)
        try {
            await updateDoc(userChatsRef,{
                chats:userChats,
            })
            changeChat(chat.chatId,chat.user)

        } catch (error) {
            console.log(error);
            
        }
    }

    const fileterdChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()))
    return (
        <div className="chatlist">
           <div className="search">
            <div className="searchbar">
                <img src="/search.png" alt="None"/>
                <input type="text" placeholder="Search" onChange={(e)=> setInput(e.target.value)}/>
            </div>
            <img src={addMode ? "./minus.png" : "./plus.png"} alt="None" className="add" onClick={()=> setAddMode(prev => !prev)}/>
           </div>
           {fileterdChats.map((chat)=>(
           <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)} style={{backgroundColor: chat?.isSeen ? "transparent": "#5183f2",}}>
            <img src={chat?.user?.blocked.includes(currentUser.id) ?"./avatar.png": chat?.user?.avatar||"./avatar.png"} alt="None" />
            <div className="texts">
                <span>{chat?.user?.blocked.includes(currentUser.id) ? "User" : chat?.user?.username }</span>
                <p> {chat?.lastMessage}</p>
            </div>
           </div>
           ))}
         
        
       

         {addMode &&<AddUser/>}
        </div>
    )
}

export default Chatlist;