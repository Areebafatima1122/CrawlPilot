const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    // Admin from .env (Master Access)
    const masterAdminEmail = process.env.ADMIN_EMAIL || 'admin@crawlpilot.io'
    const masterAdminPass = process.env.ADMIN_PASSWORD || 'admin123'

    // Fallback/Demo Admin
    const adminPassword = await bcrypt.hash(masterAdminPass, 10)
    const userPassword = await bcrypt.hash('user123', 10)

    const admin = await prisma.user.upsert({
        where: { email: masterAdminEmail },
        update: { role: 'ADMIN' },
        create: {
            email: masterAdminEmail,
            name: 'Master Admin',
            password: adminPassword,
            role: 'ADMIN',
            balance: 1000000
        },
    })

    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'Standard User',
            password: userPassword,
            role: 'USER',
            balance: 100
        },
    })

    // Create a mock blog for the admin
    await prisma.blog.upsert({
        where: { slug: 'welcome-to-crawlpilot' },
        update: {},
        create: {
            title: 'Welcome to Crawl Pilot',
            slug: 'welcome-to-crawlpilot',
            category: 'Engineering',
            excerpt: 'The fastest path to search indexing starts here.',
            content: '<h1>Hello!</h1><p>Our engineering team is dedicated to providing real-time indexing solutions for SEO masters.</p>',
            authorId: admin.id
        }
    })

    console.log({ admin, user, blogsCreated: 1 })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
