const { prisma } = require("../../prisma/prsma-client");
const ApiError = require("../exceptions/api-error");
const { TokenService } = require("../services");
const UserDto = require('../dtos/user-dto');

module.exports = async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }

    const user = await prisma.user.findUnique({
      where: {id : userData.id}
    });

    if (!user) {
      return next(ApiError.UnautorizedError());
    }

    const publicUserData = new UserDto(user);

    req.user = publicUserData;

    next();
  } catch (error) {
    return next(ApiError.UnautorizedError());
  }
};
