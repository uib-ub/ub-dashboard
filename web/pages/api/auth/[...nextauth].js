import NextAuth from "next-auth"

const AUTH_ENDPOINT = process.env.DATAPORTEN_AUTH_ENDPOINT
const SCOPES = 'openid groups-org profile userid email userinfo-photo'

export const authOptions = {
  /* callbacks: {
    session: async (session, data) => {
      const { accessToken, email_verified, picture, sub } = data;
      const username = session.user.email.split('@')[0];
      const user = {
        fullName: session.user.name,
        username,
        email: session.user.email,
        emailVerified: email_verified,
        id: sub,
        image: picture,
        accessToken,
        expiresAt: Date.parse(session.expires),
      };
      return user;
    },
    jwt: async (token, _, account, profile) => {
      if (account && account.accessToken) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve({ ...token, ...profile });
    },
  }, */
  // Configure one or more authentication providers
  providers: [
    /* GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), */

    {
      id: 'dataporten',
      name: 'DATAPORTEN',
      type: 'oauth',
      wellKnown: 'https://auth.dataporten.no/.well-known/openid-configuration',
      idToken: true,
      clientId: process.env.DATAPORTEN_ID,
      clientSecret: process.env.DATAPORTEN_SECRET,
      profile: (profile) => {
        console.log(profile)
        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          email: profile.email,
          image: profile.picture,
        };
      },
      /* authorization: {
        params: { scope: SCOPES },
        //url: `${AUTH_ENDPOINT}/oauth/authorization`
      },
      //version: '2.0',
      debug: true, */
      /* 
      token: {
        url: `${AUTH_ENDPOINT}/oauth/token`
      },
      params: {
        grant_type: 'authorization_code',
      },
      userinfo: `${AUTH_ENDPOINT}/userinfo`, */
    },
  ]
}
export default NextAuth(authOptions)
