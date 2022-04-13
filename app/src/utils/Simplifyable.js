class Simplifyable {

  constructor() {
    if (new.target === Simplifyable) {
      throw new Error("Cannot construct Simplifyable instances directly");
    }
  }

  toSimpleObject() {
    throw new Error("toSimpleObject to implemented in Subtype");
  }

  static fromSimpleObject(simpleObject) { // eslint-disable-line no-unused-vars
    throw new Error("fromSimpleObject to implemented in Subtype");
  }

}

export default Simplifyable;