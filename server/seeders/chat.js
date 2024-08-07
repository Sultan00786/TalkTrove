import { faker, ne } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";

const createSampleChat = async (chatCount) => {
  try {
    const user = await User.find().select("_id");

    const promiseChat = [];

    for (let i = 0; i < chatCount; i++) {
      const randomUserIndex = Math.floor(Math.random() * user.length);
      const randomUserIndex2 = Math.floor(Math.random() * user.length);
      const tempChat = Chat.create({
        name: faker.lorem.word(),
        isGroupChat: false,
        members: [user[randomUserIndex]._id, user[randomUserIndex2]._id],
      });
      promiseChat.push(tempChat);
    }

    await Promise.all(promiseChat);
    console.log("Chat created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createSampleGroupChat = async (chatCount) => {
  const getRandomUserIds = (users) => {
    const numOfUsers = Math.floor(Math.random() * (users.length - 3)) + 3;
    const randomIds = [];
    for (let i = 0; i < numOfUsers; i++) {
      const randomId = users[Math.floor(Math.random() * users.length)]._id;
      randomIds.push(randomId);
    }
    return randomIds;
  };

  try {
    const user = await User.find();
    const promiseChat = [];

    for (let i = 0; i < chatCount; i++) {
      const members = getRandomUserIds(user);
      const tempChat = Chat.create({
        name: faker.lorem.word(),
        groupChat: true,
        members: members,
        creator: members[Math.floor(Math.random() * members.length)],
      });
      promiseChat.push(tempChat);
    }

    await Promise.all(promiseChat);
    console.log("Group Chat created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createSampleMessage = async (messageCount) => {
  try {
    const user = await User.find();
    const chat = await Chat.find({ groupChat: { $ne: true } });
    const promiseMessage = [];
    for (let i = 0; i < messageCount; i++) {
      const tempMessage = Message.create({
        sender: user[Math.floor(Math.random() * user.length)]._id,
        content: faker.lorem.sentence(),
        chat: user[Math.floor(Math.random()) * user.length],
      });
      promiseMessage.push(tempMessage);
    }
    await Promise.all(promiseMessage);
    console.log("Message created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const createSampleGroupMessage = async (messageCount) => {
  try {
    const user = await User.find();
    const chat = await Chat.find({ groupChat: true }).populate("members");
    const promiseMessage = [];
    for (let i = 0; i < messageCount; i++) {
      const rChatLength = Math.floor(Math.random() * chat.length);
      const rMemberLength = Math.floor(
        Math.random() * chat[rChatLength].members.length
      );
      const tempMessage = Message.create({
        sender: chat[rChatLength].members[rMemberLength]._id,
        content: faker.lorem.sentence(),
        chat: chat[Math.floor(Math.random() * chat.length)]._id,
      });
      promiseMessage.push(tempMessage);
    }
    await Promise.all(promiseMessage);
    console.log("Message created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export {
  createSampleChat,
  createSampleGroupChat,
  createSampleMessage,
  createSampleGroupMessage,
};
