const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function cleanup() {
    try {
        const email = 'sohnapakistan41@gmail.com';
        const res = await p.user.deleteMany({
            where: { email }
        });
        console.log('Cleanup result:', res);
    } catch (e) {
        console.error(e);
    } finally {
        await p.$disconnect();
    }
}

cleanup();
