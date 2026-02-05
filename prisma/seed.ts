import { PrismaClient, UserStatus } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

/**
 * SAME adapter setup as src/lib/prisma.ts
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["info", "warn", "error"],
});

const rawData = `
Swaroop	9036818980
CC OFFICE	1234567891
Shekhar	7001008027
Ashuk	9831045364
Rs Maity	9434506596
Mt A 802	9930886102
Mt A 404	9620272274
Goutham	8217321013
Gobinda	6003941110
Dev	9923467269
Santush	6002816584
Vivek	9492824286
Amit Roy	7044087562
Yugesh	9353237692
Sujata	9167222378
Annan	9900086999
Nagraj	9972833173
Sathdik	6361175388
Satish	6364376080
Dah	9916405554
K Maju Nath	9742526889
Kiran	7295275987
Umarshankar	7899956677
Sngram	8217010589
Amit Kumar	9740405972
Satish	9844089995
Arnab	9620708373
Manjunath	9945598880
Guru	9916098254
Harish Gowda	9663394968
Sanjit	9742408819
Manjunath	9035555316
Mahua	7619352672
Krishnamurthy	9731199664
Ivan	8457880042
Arindhita	8971366822
Bikash	7782873947
ABHILAS	9562516505
KUNDAN	9844983666
PT 3164	9945338805
PRABIN	9745421965
REZA	9916210790
SASI	9731478600
Arsha	8800541858
Satokumar	9986346052
Srinath	7483159170
Narayan	9916435728
Bhagvan	8310224743
Ganesh	9972220082
Gautam	8217321012
Upohata	9845013010
Sunil	9739440735
Navin	7349428823
Santhi	7259497677
Ramchandra	9844082178
`;

async function main() {
  console.log("🌱 Seeding started...");

  const lines = rawData.trim().split("\n");

  for (const line of lines) {
    const match = line.trim().match(/^(.+?)\s+(\d+)$/);
    if (!match) continue;

    const name = match[1].trim();
    const contact = match[2].trim();

    await prisma.user.upsert({
      where: { contact }, // ✅ unique field
      update: {
        name,
        status: UserStatus.New,
      },
      create: {
        name,
        contact,
        status: UserStatus.New,
      },
    });

    console.log(`✔ Upserted: ${name} (${contact})`);
  }

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
