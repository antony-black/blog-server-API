module.exports = class UserDto {
  id;
  name;
  email;
  avatarUrl;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.avatarUrl = model.avatarUrl;
  }
}