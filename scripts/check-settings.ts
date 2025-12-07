import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const settings = await prisma.globalSettings.findUnique({
            where: { id: 1 },
        });

        console.log('--- DB Check Result ---');
        if (settings) {
            console.log('Raw Layout JSON:', settings.layout);
            if (settings.layout) {
                try {
                    const layout = JSON.parse(settings.layout);
                    console.log('Parsed bgUrl:', layout.bgUrl);
                    console.log('Parsed bgType:', layout.bgType);
                } catch (e) {
                    console.error('JSON Parse Error:', e);
                }
            } else {
                console.log('Layout field is empty/null');
            }
        } else {
            console.log('No GlobalSettings found with ID 1');
        }
    } catch (error) {
        console.error('DB Connection Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
