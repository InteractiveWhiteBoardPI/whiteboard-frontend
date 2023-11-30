import ControlMenu from "../components/session/control-menu/control-menu.component";
import SessionBody from "../components/session/session-body/session-body.component";

const SessionCreated = () => {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 gap-10">
      <SessionBody />

      <ControlMenu />
    </div>
  );
};
export default SessionCreated;
