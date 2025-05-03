module.exports = class UserDto {
  id;
  name;
  email;
  avatarUrl;
  followers;
  following;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.email = model.email;
    this.avatarUrl = model.avatarUrl;
    this.followers = model.followers;
    this.following = model.following;
  }
}