import jwt from "jsonwebtoken";

const secretKey = "my-secret-key"; // Replace with your actual secret key

/**
 * The function `authenticateToken` checks for a valid authorization token in the request header and
 * verifies it using a secret key before allowing access to the next middleware.
 * @param req - `req` is the request object representing the HTTP request made by the client to the
 * server. It contains information about the request such as headers, parameters, body, etc.
 * @param res - The `res` parameter in the `authenticateToken` function is the response object in
 * Express.js. It is used to send a response back to the client making the request. In the provided
 * code snippet, `res` is used to send JSON responses in case of missing authorization header or
 * invalid token.
 * @param next - The `next` parameter in the `authenticateToken` function is a callback function that
 * is used to pass control to the next middleware function in the stack. When called, it will execute
 * the next middleware function. In this context, `next()` is called after the token verification is
 * successful, allowing the
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    res.json({
      success: 0,
      messege: "access denied! unauthorised user",
    });
  } else {
    const token = authHeader.split(" ")[1];

    // Split the header value to separate "Bearer" and the token

    jwt.verify(token, secretKey, (err, userInfo) => {
      if (err) {
      return  res.json({
          messege: "invalid token",
        });
      }
      //   req.user = userInfo;
      next();
    });
  }
};

export default authenticateToken;
