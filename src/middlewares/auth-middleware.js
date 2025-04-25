const { prisma } = require("../../prisma/prisma-client");
const ApiError = require("../exceptions/api-error");
const { TokensService } = require("../services");
const UserDto = require('../dtos/user-dto');

module.exports = async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    console.log("Incoming Authorization:", authorizationHeader);

    if (!authorizationHeader) {
      console.log('ERROR-1');
      return next(ApiError.UnautorizedError());
    }
    console.log('ERROR-2');
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      console.log('ERROR-3');
      return next(ApiError.UnautorizedError());
    }
    console.log('ERROR-4');
    const userData = TokensService.validateAccessToken(accessToken);

    console.log("Decoded user:", userData);
    
    if (!userData) {
      console.log('ERROR-5');
      return next(ApiError.UnautorizedError());
    }
    console.log('ERROR-6');
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
