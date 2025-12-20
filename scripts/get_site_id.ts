
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const site = await prisma.site.findFirst();
    if (site) {
        console.log(`SITE_ID=${site.id}`);
    } else {
        console.log('NO_SITES');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
