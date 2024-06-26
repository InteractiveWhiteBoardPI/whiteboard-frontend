const truncateString = (str) => {
  if(!str) return "";
  if (str.length > 10) {
    return str.substring(0, 10) + "...";
  }
  return str;
}

export default truncateString