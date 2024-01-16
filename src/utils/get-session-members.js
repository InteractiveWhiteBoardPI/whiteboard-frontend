const getSessionMembers = async(sessionUID) => {

    const response = await fetch(`http://localhost:8080/session/get-members/${sessionUID}`);
    const members = await response.json();
    return members;
}

export default getSessionMembers;