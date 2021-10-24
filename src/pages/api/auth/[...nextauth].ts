import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { query as q } from "faunadb"
import { fauna } from "../../../services/faunadb"

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: "read:user"
        })
        
    ],
    callbacks: {
        async signIn(user, accout, profile) {
            const {email} = user
            q.Create(
                q.Collections("users"),
                {data: {email}}
            )
            return true
        }
        
    }

})
