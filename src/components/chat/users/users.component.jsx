import { useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import ConversationList from "../conversation-list/conversation-list.component";
import UserSelector from "../user-selector/user-selector.component";

const Users = () => {
  const [showSearch, setShowSearch] = useState(false);
  

  const toggleShowSearch = () => {
    setShowSearch(prevState => !prevState);
  };
  return (
    <div className="border-r border-white w-1/4">
      <div className="flex w-full justify-between items-center text-xl p-2 border-b border-light-clr-60">
        <div className="text-white font-bold mr-2 py-2 px-2">
          Users's List
        </div>
        <TiPlusOutline
          className="text-white cursor-pointer text-3xl"
          onClick={toggleShowSearch}
        />
      </div>
      {
        showSearch && (
          <UserSelector />
        )
      }
      <ConversationList />
    </div>
  )
}

export default Users;