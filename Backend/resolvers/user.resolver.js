import { users } from "../dummydata/data.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById({ userId });
        return user;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, password, gender, name } = input;
        if (!username || !password || !gender || !name) {
          throw new Error("All fields are required! ");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User exists already");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boysProfilePick = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
        const girlsProfilePick = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture:
            gender === "male" ? boysProfilePick : girlsProfilePick,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
  },
};

export default userResolver;
