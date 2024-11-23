import jwt from "jsonwebtoken";

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;