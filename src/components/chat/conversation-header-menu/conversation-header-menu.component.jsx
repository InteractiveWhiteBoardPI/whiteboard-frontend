
import DeleteConversationModal from "../delete-conversation-modal/delete-conversation-modal.component";

const ConversationHeaderMenu = ({ className }) => {

  return (
    <div>
      <div className={className}>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="bg-black bg-opacity-50 m-4 rounded menu cursor-pointer">
              <DeleteConversationModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeaderMenu;
