import NextAuth from "next-auth"

export const authOptions = {
  providers: [
    {
      id: 'dataporten',
      name: 'DATAPORTEN',
      type: 'oauth',
      wellKnown: 'https://auth.dataporten.no/.well-known/openid-configuration',
      idToken: true,
      clientId: process.env.DATAPORTEN_ID,
      clientSecret: process.env.DATAPORTEN_SECRET,
      profile: (profile) => {
        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ]
}
export default NextAuth(authOptions)
