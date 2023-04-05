import { PrismaClient } from "@prisma/client";
// import { hash } from "@webapp/helpers/encryption/encrypt";
import { hash } from "../src/helpers/encryption/encrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding");
  try {
    await prisma.admin.create({
      data: {
        name: process.env.ADMIN_NAME as string,
        email: process.env.ADMIN_EMAIL as string,
        password: await hash(process.env.ADMIN_PASSWORD as string),
      },
    });
  } catch (err) {
    console.log("Admin already exists.");
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
