import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import { addNewUser } from "@/lib/mongoDb/users";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      return session;
    },

    async signIn({ profile }) {
      //Save profile to db
      if (profile?.name && profile.email) {
        await addNewUser({
          name: profile.name,
          email: profile.email,
          picture: profile.image,
          saved_routes: [],
          achievements: [],
        });
      }

      try {
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
