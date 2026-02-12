import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Kakao from "next-auth/providers/kakao"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Kakao],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.picture =
          profile.picture ??
          profile.thumbnail_image_url ??
          token.picture
      }
      return token
    },
    async session({ session, token }) {
      if (token.picture) {
        session.user.image = token.picture as string
      }
      return session
    },
  },
})
