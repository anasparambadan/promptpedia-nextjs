import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import userModel from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_ID,
      clientSecret: process.env.OAUTH_CLIENT_SCECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await userModel.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
        console.log(profile,'profile.........')
      try {
        await connectToDB();

        //check user already exist
        const userExist = await userModel.findOne({ email: profile.email });
        if (!userExist) {

          await userModel.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        //create new user and save to DB

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
