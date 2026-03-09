const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function simulateSignup() {
    const prisma = new PrismaClient();
    const name = 'mateen';
    const email = 'sohnapakistan41@gmail.com';
    const password = 'any-password';

    console.log('--- Simulating Signup in Database ---');
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER",
                balance: 100,
            },
        });
        console.log('SUCCESS:', user.id);
    } catch (err) {
        console.error('FAILED (ERROR):', err.message);
        if (err.stack) console.error(err.stack);
    } finally {
        await prisma.$disconnect();
    }
}

simulateSignup();
