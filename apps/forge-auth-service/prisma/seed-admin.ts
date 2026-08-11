import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const email = "admin@forge.dev";
    const username = "forge-admin";
    const password = "Admin@12345";

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        await prisma.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                role: UserRole.ADMIN,
                isActive: true,
            },
        });

        console.log("Existing user promoted to ADMIN.");

        return;
    }

    const passwordHash = await bcrypt.hash(
        password,
        12,
    );

    const user = await prisma.user.create({
        data: {
            email,
            username,
            passwordHash,
            role: UserRole.ADMIN,
            firstName: "Forge",
            lastName: "Admin",
            isEmailVerified: true,
            isActive: true,
        },
    });

    console.log("Admin created:", user.email);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });