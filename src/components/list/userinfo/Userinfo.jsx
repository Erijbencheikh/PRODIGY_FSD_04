import { useUserStore } from "../../../lib/userStore";
import "./userinfo.css"

const Userinfo = () => {
    const {currentUser} =useUserStore()


    return (
        <div className="userinfo"> 
        <div className="user">
            <img src={currentUser.avatar || "./avatar.png"} alt="None"/>
            <h3>{currentUser.username}</h3>
        </div>
        <div className="icons">
            <img src="./more.png" alt="None"/>
            <img src="./video.png" alt="None"/>
            <img src="./edit.png" alt="None"/>

        </div>
        
        
        </div>
    )
}
export default Userinfo;
