// // types/next-auth.d.ts
// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string;
//             email: string;
//             name: string;
//             role: string;
//         } & DefaultSession["user"];
//     }

//     interface User {
//         id: string;
//         email: string;
//         name: string;
//         role: string;
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         id: string;
//         email: string;
//         name: string;
//         role: string;
//     }
// }

// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string;
//             name: string;
//             email: string;
//             role: string;
//         } & DefaultSession["user"];
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         id: string;
//         email: string;
//         role: string;
//     }
// }
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            role: string;
        };
    }

    interface User {
        id: string;
        email: string;
        role: string;
        password: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        role: string;
    }
}
