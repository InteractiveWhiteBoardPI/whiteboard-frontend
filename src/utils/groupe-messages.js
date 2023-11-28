const groupeMessages = (originalArray) => {
  const resultObject = {};

  originalArray.forEach((message) => {
    if (!resultObject[message.sender]) {
      resultObject[message.sender] = [];
    }

    resultObject[message.sender].push(message);

    if (!resultObject[message.receiver]) {
      resultObject[message.receiver] = [];
    }

    resultObject[message.receiver].push(message);
  });
  return resultObject;
};
export default groupeMessages;
