const getRandomMemberId = (members, userId) => {
  let randomId;
  do {
    const num = Math.floor(Math.random() * members.length);
    randomId = members[num]._id.toString();
  } while (randomId.toString() === userId);
  return randomId;
};

export { getRandomMemberId };
