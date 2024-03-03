import { IoMdCall } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import useUserContext from "../../../context/user/useUserContext";
import UsePrivateCallContext from "../../../context/private-call/usePrivateCallContext";
import Call from "./call.component";
import useSound from "use-sound";
import {useEffect} from "react";
import {sounds} from "../../../sounds/settings";

const ChatCall = ({username, chosenUserId}) => {
  const {currentUser} = useUserContext();
  const {incomingCall, callInitiated} = UsePrivateCallContext();
  const {acceptCall,rejectCall, callAccepted, endCall} = UsePrivateCallContext();

  const [playCallSound] = useSound(sounds.call.sound.src)

  useEffect(() => {
    if (incomingCall) {
      playCallSound();
    }
  }, [incomingCall]);

  if (callAccepted) {
    return <Call chosenUserId={chosenUserId} />;
  }

  return (
      <div>
        {callInitiated && (
            <div>
              {currentUser?.uid === incomingCall?.calledUserId ? (
                  <div>
                    <div
                        className="flex flex-col rounded py-2 px-2 justify-center items-center rounded-b-2xl bg-dark-clr-30">
                      <div className="flex flex-col justify-evenly w-full mb-2">
                        <div className="flex justify-center mt-2">
                          Incoming call . . .
                        </div>
                        &nbsp;
                        <div className="flex flex-col justify-center items-center">
                          <RxAvatar className={incomingCall? 'animate-bounce text-5xl' : 'text-5xl'}/>
                          {username}
                        </div>
                      </div>
                      <div className="flex justify-center items-center justify-evenly w-1/4">
                        <div className="bg-green-600  rounded-3xl p-2 hover:bg-opacity-90 cursor-pointer"
                             onClick={acceptCall.bind(null, chosenUserId)}>
                          <IoMdCall className="text-white cursor-pointer"/>
                        </div>
                        <div className="bg-red-500  rounded-3xl p-2 hover:bg-opacity-90 cursor-pointer"
                             onClick={rejectCall.bind(null, chosenUserId)}>
                          <IoMdCall className="text-white cursor-pointer"/>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : (
                  <div>
                    <div
                        className="flex flex-col rounded-r-2xl py-2 px-2 justify-center items-center rounded-b-2xl bg-dark-clr-30">
                      <div className="flex flex-row justify-evenly w-1/4 mb-2">

                        <div className="flex flex-col justify-center items-center">
                          <RxAvatar className="text-5xl"/>
                          {username}
                          <div>
                            Calling...
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center justify-evenly w-1/4">
                      </div>
                        <div className="bg-red-500  rounded-3xl p-2 hover:bg-opacity-90 cursor-pointer"
                             onClick={endCall.bind(null, chosenUserId)}>
                          <IoMdCall className="text-white cursor-pointer"/>
                        </div>
                    </div>
                  </div>
              )}
            </div>
        )}

      </div>
  );
};
export default ChatCall;
