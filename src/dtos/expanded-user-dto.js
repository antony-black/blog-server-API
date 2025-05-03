const UserDto = require("./user-dto");

module.exports = class ExpandedUserDto extends UserDto {
  bio;
  location;
  dateOfBirth;

  constructor(model) {
    super(model);
    this.bio = model.bio;
    this.location = model.location;
    this.dateOfBirth = model.dateOfBirth;
  }
};
