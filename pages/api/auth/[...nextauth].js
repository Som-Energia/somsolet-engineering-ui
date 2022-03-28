import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
  Providers.Credentials({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      username: { label: 'Usuari', type: 'text' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SOMSOLET_API}/api/token/`,
        {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        }
      )

      console.log(res)
      const user = await res.json()
      console.log(user)
      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
]

const callbacks = {}

callbacks.signIn = async function signIn(user, account, metadata) {
  console.log(user)
  console.log(account)
  console.log(metadata)
  return false
}

const options = {
  providers,
  callbacks
}

export default (req, res) => NextAuth(req, res, options)
