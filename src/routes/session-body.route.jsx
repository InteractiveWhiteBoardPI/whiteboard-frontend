import CallSection from "../components/session/call-section/call-section.component"
import SessionMenu from "../components/session/session-menu/session-menu.component";

const SessionBody = () => {
    return (
        <div className="h-[90%] w-full pt-2 px-4">
            <div className="w-full h-full rounded-2xl flex bg-dark-clr-70 justify-between">
                <CallSection />
                <SessionMenu />
            </div>
        </div>
    );
}

export default SessionBody;