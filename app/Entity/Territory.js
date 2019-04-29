class Territory {
  constructor(key, name, country, type) {
    this._key = key;
    this._name = name;
    this._country = country;
    this._type = type;
    this._user = null;
    this._units = {army: false, fleet:false};
  }

  get key() {
    return this._key;
  }

  get user() {
    return this._user;
  }

  set user(pUser) {
    this._user = pUser;
  }

  get units() {
    return this._units;
  }

  set army(army) {
    this._units.army = army;
  }

  set fleet(fleet) {
    this._units.fleet = fleet;
  }

  toResult() {
    let user = null;
    if (this._user) {
      user = this._user.toString();
    }

    return {
      key: this._key,
      name: this._name,
      country: this._country,
      type: this._type,
      user: user,
      units: this._units,
    };
  }
}

module.exports = Territory;
