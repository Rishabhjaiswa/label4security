import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@matrixtags.com';
  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Matrix@2025';

  // User credentials requested: admin@matrixtags.com / Matrix@2025
  const hashedPassword = await bcrypt.hash(defaultPassword, 10)

  const users = [
    { email: defaultEmail, name: 'Matrix Tags Admin' },
    { email: 'admin@label4security.com', name: 'label4security Admin' },
  ]

  for (const u of users) {
    const admin = await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashedPassword },
      create: {
        email: u.email,
        name: u.name,
        password: hashedPassword,
      },
    })
    console.log(`✅ Admin user seeded: ${admin.email}`)
  }

  // Seed Sample Verification Pages
  const samplePages = [
    {
      companyName: 'PharmaShield Industries',
      brandName: 'MediGuard',
      productName: 'Security Holographic Seal',
      productId: 'SN-998234-A',
      description: 'High-security 2D/3D tamper-evident holographic sticker for pharmaceutical packaging.',
      verificationStatus: 'Verified',
    },
    {
      companyName: 'AeroParts Global',
      brandName: 'AeroSeal',
      productName: 'Industrial Rating Plate',
      productId: 'AP-554109-X',
      description: 'Heat & solvent resistant aluminum polyester rating plate for machinery authentication.',
      verificationStatus: 'Verified',
    },
    {
      companyName: 'PureBeverage Bottling',
      brandName: 'Crystal Springs',
      productName: 'Tamper Evident Bottle Seal',
      productId: 'CS-110293-B',
      description: '360 degree shrink sleeve bottle neck seal with micro-perforations.',
      verificationStatus: 'Pending',
    },
  ]

  for (const pageData of samplePages) {
    const existing = await prisma.authenticationPage.findFirst({
      where: { productId: pageData.productId },
    })

    if (!existing) {
      const created = await prisma.authenticationPage.create({
        data: pageData,
      })
      console.log(`✅ Sample verification page created: ${created.productName} (${created.uuid})`)
    }
  }

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
