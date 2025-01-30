import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        if (username === "admin" && password === "admin") {
          return { id: "1", name: "Admin" };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login/",
  },
};
