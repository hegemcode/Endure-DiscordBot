module.exports = class command {
  static parse(message) {
    if (this.match(message)) {
      this.action(message);
      return true;
    }
    return true;
  }
  static match(message) {
    return false;
  }
  static action(message) {}
};
