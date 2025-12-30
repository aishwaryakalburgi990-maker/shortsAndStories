import bcrypt from 'bcryptjs';
import prisma from './config/database';

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await prisma.adminUser.upsert({
      where: { email: 'admin@shotsandstories.com' },
      update: {},
      create: {
        email: 'admin@shotsandstories.com',
        passwordHash: hashedPassword,
        name: 'Admin User',
      },
    });

    console.log('✅ Admin user created:', adminUser.email);

    // Create hero images with real Cloudinary URLs
    const heroImages = [
      {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042410/shots-stories/hero/hero-1-1767042406816.jpg',
        orderIndex: 1,
      },
      {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042423/shots-stories/hero/hero-2-1767042420548.jpg',
        orderIndex: 2,
      },
      {
        id: 3,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042444/shots-stories/hero/hero-3-1767042440625.jpg',
        orderIndex: 3,
      },
      {
        id: 4,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042466/shots-stories/hero/hero-4-1767042462119.jpg',
        orderIndex: 4,
      },
      {
        id: 5,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042485/shots-stories/hero/hero-5-1767042482049.jpg',
        orderIndex: 5,
      },
      {
        id: 6,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042502/shots-stories/hero/hero-6-1767042498886.jpg',
        orderIndex: 6,
      },
      {
        id: 7,
        imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042536/shots-stories/hero/hero-7-1767042532051.jpg',
        orderIndex: 7,
      },
    ];

    for (const heroImage of heroImages) {
      await prisma.heroImage.upsert({
        where: { id: heroImage.id },
        update: {
          imageUrl: heroImage.imageUrl,
          orderIndex: heroImage.orderIndex,
        },
        create: heroImage,
      });
    }

    console.log('✅ Hero images created');

    // Create couples with real data
    const couplesData = [
      {
        id: 2,
        names: 'Pooja and Prabhakar',
        title: 'Modern Mumbai Romance',
        date: 'November 8, 2023',
        location: 'Mumbai, Maharashtra',
        description: 'A contemporary celebration where tradition meets modernity.',
        coverImageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042874/shots-stories/couples/prabhanjan-and-maanasa-1767042872406-f9ekwo.jpg',
        videoUrl: '1_M4pOvUp9kXRQpMaGDBFES1dw8Q5nyYx', // Google Drive ID
      },
      {
        id: 6,
        names: 'Sharmada and Karthik',
        title: 'A Royal Wedding',
        date: 'Oct 25',
        location: 'Karnataka',
        description: 'A magnificent celebration of love',
        coverImageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036414/shots-stories/couples/satya-and-shani-1767036411253-zocsj.jpg',
        videoUrl: '1WA0MBkXtDlYadLILHcmwCsN2INJFLn58', // Google Drive ID
      },
      {
        id: 7,
        names: 'Aarthi and Puneeth',
        title: 'An intimate ceremony by the lakes',
        date: 'Jan 15th, 2023',
        location: 'Goa,India',
        description: 'An intimate ceremony by the lakes of Udaipur',
        coverImageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043148/shots-stories/couples/aarthi-and-puneeth-1767043141242-083cj.webp',
        videoUrl: null,
      },
    ];

    for (const coupleData of couplesData) {
      await prisma.couple.upsert({
        where: { id: coupleData.id },
        update: coupleData,
        create: coupleData,
      });
      console.log(`✅ Couple created: ${coupleData.names}`);
    }

    // Create couple images
    const coupleImagesData = [
      // Sharmada and Karthik (couple_id: 6)
      { id: 15, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036414/shots-stories/couples/satya-and-shani-1767036411253-zocsj.jpg', orderIndex: 1 },
      { id: 16, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036417/shots-stories/couples/satya-and-shani-1767036415679-ybuvw.jpg', orderIndex: 2 },
      { id: 17, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036419/shots-stories/couples/satya-and-shani-1767036417824-6twp5r.jpg', orderIndex: 3 },
      { id: 18, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036422/shots-stories/couples/satya-and-shani-1767036420397-cs3an3.jpg', orderIndex: 4 },
      { id: 19, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036425/shots-stories/couples/satya-and-shani-1767036423046-xmv6l.jpg', orderIndex: 5 },
      { id: 20, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036427/shots-stories/couples/satya-and-shani-1767036426423-4fvs6l.jpg', orderIndex: 6 },
      { id: 21, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036431/shots-stories/couples/satya-and-shani-1767036428571-aobyt.jpg', orderIndex: 7 },
      { id: 22, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036433/shots-stories/couples/satya-and-shani-1767036431952-5v01al.jpg', orderIndex: 8 },
      { id: 23, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036436/shots-stories/couples/satya-and-shani-1767036434716-wpouea.webp', orderIndex: 9 },
      { id: 24, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036438/shots-stories/couples/satya-and-shani-1767036436868-83c04.jpg', orderIndex: 10 },
      { id: 25, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036441/shots-stories/couples/satya-and-shani-1767036439333-a4ejs.jpg', orderIndex: 11 },
      { id: 26, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036445/shots-stories/couples/satya-and-shani-1767036443028-dhm2mj.jpg', orderIndex: 12 },
      { id: 27, coupleId: 6, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767036448/shots-stories/couples/satya-and-shani-1767036447055-jiolwb.jpg', orderIndex: 13 },
      
      // Pooja and Prabhakar (couple_id: 2)
      { id: 28, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042863/shots-stories/couples/prabhanjan-and-maanasa-1767042859668-9lw00q.jpg', orderIndex: 1 },
      { id: 29, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042866/shots-stories/couples/prabhanjan-and-maanasa-1767042864607-0rcra4.webp', orderIndex: 2 },
      { id: 30, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042871/shots-stories/couples/prabhanjan-and-maanasa-1767042869985-vg9pp9.jpg', orderIndex: 3 },
      { id: 31, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042874/shots-stories/couples/prabhanjan-and-maanasa-1767042872406-f9ekwo.jpg', orderIndex: 4 },
      { id: 32, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042877/shots-stories/couples/prabhanjan-and-maanasa-1767042875377-cwdrl.jpg', orderIndex: 5 },
      { id: 33, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042879/shots-stories/couples/prabhanjan-and-maanasa-1767042878243-6l5ec.jpg', orderIndex: 6 },
      { id: 34, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042882/shots-stories/couples/prabhanjan-and-maanasa-1767042881055-fri6kf.jpg', orderIndex: 7 },
      { id: 35, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042886/shots-stories/couples/prabhanjan-and-maanasa-1767042883894-c91iwa.webp', orderIndex: 8 },
      { id: 36, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042890/shots-stories/couples/prabhanjan-and-maanasa-1767042887656-f82ela.webp', orderIndex: 9 },
      { id: 37, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042894/shots-stories/couples/prabhanjan-and-maanasa-1767042891703-t43ibg.webp', orderIndex: 10 },
      { id: 38, coupleId: 2, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767042897/shots-stories/couples/prabhanjan-and-maanasa-1767042895754-45833.jpg', orderIndex: 11 },
      
      // Aarthi and Puneeth (couple_id: 7)
      { id: 39, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043148/shots-stories/couples/aarthi-and-puneeth-1767043141242-083cj.webp', orderIndex: 1 },
      { id: 40, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043153/shots-stories/couples/aarthi-and-puneeth-1767043149339-e3fr8s.webp', orderIndex: 2 },
      { id: 41, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043160/shots-stories/couples/aarthi-and-puneeth-1767043154940-3uzeaj.webp', orderIndex: 3 },
      { id: 42, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043165/shots-stories/couples/aarthi-and-puneeth-1767043162306-sje6h.webp', orderIndex: 4 },
      { id: 43, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043171/shots-stories/couples/aarthi-and-puneeth-1767043167081-ujckt2.webp', orderIndex: 5 },
      { id: 44, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043179/shots-stories/couples/aarthi-and-puneeth-1767043173128-rd3gd.webp', orderIndex: 6 },
      { id: 45, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043185/shots-stories/couples/aarthi-and-puneeth-1767043180912-fm810r.webp', orderIndex: 7 },
      { id: 46, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043191/shots-stories/couples/aarthi-and-puneeth-1767043187262-71golg.webp', orderIndex: 8 },
      { id: 47, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043195/shots-stories/couples/aarthi-and-puneeth-1767043192637-jogr6i.webp', orderIndex: 9 },
      { id: 48, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043201/shots-stories/couples/aarthi-and-puneeth-1767043195844-ys7obl.webp', orderIndex: 10 },
      { id: 49, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043208/shots-stories/couples/aarthi-and-puneeth-1767043202868-7yufta.webp', orderIndex: 11 },
      { id: 50, coupleId: 7, imageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043213/shots-stories/couples/aarthi-and-puneeth-1767043209679-wyom7.webp', orderIndex: 12 },
    ];

    for (const imageData of coupleImagesData) {
      await prisma.coupleImage.upsert({
        where: { id: imageData.id },
        update: {
          coupleId: imageData.coupleId,
          imageUrl: imageData.imageUrl,
          orderIndex: imageData.orderIndex,
        },
        create: imageData,
      });
    }

    console.log('✅ Couple images created');

    // Create about me record with real data
    await prisma.aboutMe.upsert({
      where: { id: 1 },
      update: {
        authorName: 'Sujay',
        description: 'I am your photographer friend specialized to create art in beautiful chaos. With a passion for storytelling through images, I strive to preserve precious moments and showcase the beauty of diverse cultures and landscapes worldwide.\nWhether documenting the intimacy of weddings or the adventures, my goal is to create evocative images that resonate with authenticity and emotion.\nLet me capture your special day with creativity — creating lifelong memories!',
        yearsExperience: 8,
        couplesServed: 30,
        awardsCount: 20,
        location: 'Bangalore',
        profileImageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043340/shots-stories/profile/profile-image.jpg',
      },
      create: {
        id: 1,
        authorName: 'Sujay',
        description: 'I am your photographer friend specialized to create art in beautiful chaos. With a passion for storytelling through images, I strive to preserve precious moments and showcase the beauty of diverse cultures and landscapes worldwide.\nWhether documenting the intimacy of weddings or the adventures, my goal is to create evocative images that resonate with authenticity and emotion.\nLet me capture your special day with creativity — creating lifelong memories!',
        yearsExperience: 8,
        couplesServed: 30,
        awardsCount: 20,
        location: 'Bangalore',
        profileImageUrl: 'https://res.cloudinary.com/ds75rphlo/image/upload/v1767043340/shots-stories/profile/profile-image.jpg',
      },
    });

    console.log('✅ About me record created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Admin user: admin@shotsandstories.com (password: admin123)`);
    console.log(`   - About me record: Created with real data`);
    console.log(`   - Hero images: ${heroImages.length} created with real Cloudinary URLs`);
    console.log(`   - Couples: ${couplesData.length} created with real data`);
    console.log(`   - Couple images: ${coupleImagesData.length} created`);
    console.log('\n⚠️  Remember to change the admin password in production!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });