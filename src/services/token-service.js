const jwt = require('jsonwebtoken');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '20d' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  
  // TODO: this approach work if user login just from a single device.
  // To uset it for multiple device, it should be rewokred
  async save(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ _id: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ userId, refreshToken });
    return token;
  }

  
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  // validateRefreshToken(token) {
  //   try {
  //     const userData = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
  //     return userData;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // async find(refreshToken) {
  //   const tokenData = await TokenModel.findOne({refreshToken});
  //   return tokenData;
  // }

  async remove(refreshToken) {
    // const token = await TokenModel.deleteOne({ refreshToken });
    // return token;
  }
}

module.exports = new TokenService();