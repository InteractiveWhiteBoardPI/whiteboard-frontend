import NewWhiteboard from "./new-whiteboard.component";
import WhiteboardListItem from "./whiteboard-list-item.component";
import {useEffect, useState} from "react";
import useUserContext from "../../../context/user/useUserContext";
const WhiteboardList = ({selected, setSelected}) => {
    const { currentUser } = useUserContext()
    const [whiteboardsList, setWhiteboardsList] = useState([]);

    useEffect(() => {
        if(!currentUser) return
        const getWhiteboards = async () => {
            const response = await fetch("http://localhost:8080/whiteboard/getAll/"+currentUser?.uid)

            const json = await response.json()
            setWhiteboardsList(json)
        }
        getWhiteboards()
    }, [currentUser]);



    return ( 
        <div className="h-[20%] w-full overflow-x-auto flex gap-2">
            <NewWhiteboard />
            {
                whiteboardsList.map((whiteboard,index) => (
                    <WhiteboardListItem
                        key={index}
                        setSelected={setSelected}
                        whiteboard={whiteboard}
                        selected={whiteboard.id === selected?.id}
                    />
                ))
            }
        </div>
     );
}
 
export default WhiteboardList;