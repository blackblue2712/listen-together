const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

class User {
  constructor() {
    this.users = {};
  }

  push(socketId, name) {
    let userData = { name, init: false };
    if (!name) {
      userData.name = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
        length: 2,
      }); // big-donkey
    }

    this.users[socketId] = userData;
  }

  remove(socketId) {
    console.log("remove user", this.users[socketId]);
    delete this.users[socketId];
  }

  getAll() {
    return this.users;
  }

  getBySocketId(socketId) {
    return this.users[socketId];
  }

  getFirst() {
    if (Object.keys(this.users).length === 0) {
      return null;
    }
    return Object.keys(this.users)[0];
  }

  setInit(socketId) {
    this.users[socketId].init = true;
  }

  getAllUserUnInit() {
    return Object.keys(this.users).filter((socketId) => {
      return this.users[socketId].init === false;
    });
  }
}

module.exports = User;
