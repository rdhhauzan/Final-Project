const { OAuth2Client } = require("google-auth-library");

class Google {
  static async googleLogin(id_token) {
    const client = new OAuth2Client(process.env.GOOGLE_ID);
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_ID,
    });
    const payload = ticket.getPayload();
    return payload
  }
}

module.exports = Google;
