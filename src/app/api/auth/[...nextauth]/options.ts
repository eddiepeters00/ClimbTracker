import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "your-name",
        },
        password: {
          label: "Password",
          type: "Password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials, req) {
        //Docs: nextauth:  configuration/providers/credentials
        //Retrieve user data and verify

        // const res = await fetch("your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });

        // const userFromEndpoint = await res.json();
        // if(res.ok && userFromEndpoint) {
        //     return userFromEndpoint
        // }

        const user = { id: "42", name: "Eddie", password: "nextauth" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
