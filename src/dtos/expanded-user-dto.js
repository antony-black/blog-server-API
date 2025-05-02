const UserDto = require("./user-dto");

module.exports = class ExpandedUserDto extends UserDto {
  bio;
  location;
  dateOfBirth;
  avatarUrl;
  followers;
  following;

  constructor(model) {
    super(model);
    this.bio = model.bio;
    this.location = model.location;
    this.dateOfBirth = model.dateOfBirth;
    this.avatarUrl = model.avatarUrl;
    this.followers = model.followers;
    this.following = model.following;
  }
};
