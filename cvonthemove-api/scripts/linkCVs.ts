import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function linkCVs() {
    console.log('Starting CV linking process...');

    try {
        // Fetch all users
        const users = await prisma.user.findMany({
            select: { id: true, email: true }
        });

        console.log(`Found ${users.length} users.`);

        let linkedCount = 0;

        for (const user of users) {
            // Find orphan CVs with matching email in personalDetails
            const matchingDetails = await prisma.entityDetails.findMany({
                where: {
                    email: user.email,
                    cv: { userId: null }
                },
                select: { cvId: true }
            });

            const cvIds = matchingDetails.map(d => d.cvId);

            if (cvIds.length > 0) {
                console.log(`Linking ${cvIds.length} CVs to user ${user.email} (${user.id})`);
                await prisma.cV.updateMany({
                    where: { id: { in: cvIds } },
                    data: { userId: user.id }
                });
                linkedCount += cvIds.length;
            }
        }

        console.log(`Finished. Linked total of ${linkedCount} CVs.`);

    } catch (error) {
        console.error('Error linking CVs:', error);
    } finally {
        await prisma.$disconnect();
    }
}

linkCVs();
