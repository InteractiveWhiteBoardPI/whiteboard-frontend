import useSessionContext from "./useSessionContext"

const useSessionSelector = () => {
    const { 
        sessionId,
        sessionPassword,
        sessionHost,
        sessionMembers,
        sessionLink } = useSessionContext
    return {
        sessionId,
        sessionPassword,
        sessionHost,
        sessionMembers,
        sessionLink
    }
}
export default useSessionSelector