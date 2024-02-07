import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface DefaultUser {
        id: string | null;
        role?: string | null;
    }

    interface Session {
        user?: {
            id: string | null;
            role?: string | null;
        } & DefaultSession["user"]
    }
}   

declare module "next-auth/jwt" {
    interface JWT {
        role?: string
    }
}