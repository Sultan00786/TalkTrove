import { User } from "../models/user.js";
import { faker } from "@faker-js/faker";

const createUser = async (numOfUsers) => {
  try {
    const userArray = [];
    for (let i = 0; i < numOfUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      userArray.push(tempUser);
    }
    // execute the all promise parallelly
    Promise.allSettled(userArray);
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1); // procss terminate with 1 as exit code
  }
};

export { createUser };
