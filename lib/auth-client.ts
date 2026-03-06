
import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({ 
    plugins: [emailOTPClient(), adminClient(), nextCookies()] 
});


export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;