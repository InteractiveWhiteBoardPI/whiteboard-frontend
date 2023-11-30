import CallSection from "../call-section/call-section.component"
import SessionMenu from "../session-menu/session-menu.component";

const SessionBody = () => {
    return (
        <div className="h-5/6 w-[90%] rounded-2xl flex bg-dark-clr-70 justify-between">
            <CallSection />
            <SessionMenu />
        </div>
    );
}

export default SessionBody;