
import ConversationDeletion from "../conversation-deletion/conversation-deletion.component";

const ConversationHeaderMenu = ({ className }) => {

  return (
    <div>
      <div className={className}>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="bg-black bg-opacity-50 m-4 rounded-box menu cursor-pointer">
              <ConversationDeletion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeaderMenu;
