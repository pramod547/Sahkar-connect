import { PrismaClient, UserRole, WorkerStatus, CertificationLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting SahakarConnect database seeding...');

  // 1. Clean existing data
  await prisma.notification.deleteMany();
  await prisma.kycDocument.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.welfareClaim.deleteMany();
  await prisma.welfareFundLedger.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.jobAssignment.deleteMany();
  await prisma.jobOffer.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.serviceListing.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.workerSkill.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.adminProfile.deleteMany();
  await prisma.cooperativeSociety.deleteMany();
  await prisma.cooperativeFederation.deleteMany();
  await prisma.user.deleteMany();

  // 2. Federations
  const maharashtraFed = await prisma.cooperativeFederation.create({
    data: {
      name: 'Maharashtra State Labour Cooperative Federation',
      region: 'Maharashtra',
      ncct_registration_id: 'NCCT/MH/2021/0042',
    },
  });

  const karnatakaFed = await prisma.cooperativeFederation.create({
    data: {
      name: 'Karnataka State Labour Cooperative Federation',
      region: 'Karnataka',
      ncct_registration_id: 'NCCT/KA/2022/0118',
    },
  });

  // 3. Societies
  const mumbaiElecSociety = await prisma.cooperativeSociety.create({
    data: {
      federation_id: maharashtraFed.id,
      name: 'Mumbai District Electricians Labour Cooperative Society',
      district: 'Mumbai Suburban',
      primary_trade_focus: 'Electrical & Appliance Repair',
      max_dispatch_radius_km: 8.0,
    },
  });

  const puneCareSociety = await prisma.cooperativeSociety.create({
    data: {
      federation_id: maharashtraFed.id,
      name: 'Pune Domestic Care & Cleaning Labour Cooperative Society',
      district: 'Pune',
      primary_trade_focus: 'Domestic Help & Cleaning',
      max_dispatch_radius_km: 10.0,
    },
  });

  const bengaluruHomeSociety = await prisma.cooperativeSociety.create({
    data: {
      federation_id: karnatakaFed.id,
      name: 'Bengaluru Household Trades Labour Cooperative Society',
      district: 'Bengaluru Urban',
      primary_trade_focus: 'Plumbing & Household Maintenance',
      max_dispatch_radius_km: 7.5,
    },
  });

  const mysuruTechSociety = await prisma.cooperativeSociety.create({
    data: {
      federation_id: karnatakaFed.id,
      name: 'Mysuru Technicians & Artisans Cooperative Society',
      district: 'Mysuru',
      primary_trade_focus: 'Carpentry & Electrical',
      max_dispatch_radius_km: 8.0,
    },
  });

  // Seed initial Welfare Fund Ledger balance for societies
  await prisma.welfareFundLedger.createMany({
    data: [
      {
        society_id: mumbaiElecSociety.id,
        entry_type: 'contribution',
        amount: 25000.0,
        running_balance: 25000.0,
      },
      {
        society_id: puneCareSociety.id,
        entry_type: 'contribution',
        amount: 18500.0,
        running_balance: 18500.0,
      },
      {
        society_id: bengaluruHomeSociety.id,
        entry_type: 'contribution',
        amount: 32000.0,
        running_balance: 32000.0,
      },
      {
        society_id: mysuruTechSociety.id,
        entry_type: 'contribution',
        amount: 12000.0,
        running_balance: 12000.0,
      },
    ],
  });

  // 4. Service Categories & Service Listings
  const catElectrical = await prisma.serviceCategory.create({
    data: {
      name: 'Electrical Services',
      icon_key: 'zap',
      service_listings: {
        create: [
          { name: 'Fan Installation & Repair', base_price: 350.0, estimated_duration_minutes: 45 },
          { name: 'Switchboard Repair', base_price: 250.0, estimated_duration_minutes: 30 },
          { name: 'Full House Rewiring Inspection', base_price: 1200.0, estimated_duration_minutes: 120 },
        ],
      },
    },
  });

  const catCleaning = await prisma.serviceCategory.create({
    data: {
      name: 'Cleaning & Domestic Help',
      icon_key: 'sparkles',
      service_listings: {
        create: [
          { name: 'Deep Kitchen Cleaning', base_price: 850.0, estimated_duration_minutes: 90 },
          { name: 'Full Home Deep Cleaning', base_price: 2200.0, estimated_duration_minutes: 240 },
          { name: 'Bathroom Sanitation', base_price: 499.0, estimated_duration_minutes: 60 },
        ],
      },
    },
  });

  const catPlumbing = await prisma.serviceCategory.create({
    data: {
      name: 'Plumbing Services',
      icon_key: 'droplet',
      service_listings: {
        create: [
          { name: 'Tap & Sink Leakage Repair', base_price: 299.0, estimated_duration_minutes: 40 },
          { name: 'Water Tank Cleaning', base_price: 999.0, estimated_duration_minutes: 120 },
          { name: 'Drainage Unclogging', base_price: 550.0, estimated_duration_minutes: 60 },
        ],
      },
    },
  });

  const catCaregiving = await prisma.serviceCategory.create({
    data: {
      name: 'Caregiving & Assistance',
      icon_key: 'heart',
      service_listings: {
        create: [
          { name: 'Elderly Day Care Assistance (4 hrs)', base_price: 800.0, estimated_duration_minutes: 240 },
          { name: 'Patient Attendant Shift (8 hrs)', base_price: 1500.0, estimated_duration_minutes: 480 },
        ],
      },
    },
  });

  // 5. Admin Users & Profiles
  const platformAdminUser = await prisma.user.create({
    data: {
      phone_number: '+919800000001',
      full_name: 'NCCT Technical Admin',
      role: UserRole.platform_admin,
      preferred_language: 'hi',
    },
  });
  await prisma.adminProfile.create({
    data: { user_id: platformAdminUser.id },
  });

  const fedAdminUser = await prisma.user.create({
    data: {
      phone_number: '+919800000002',
      full_name: 'Ramesh Patil (Maharashtra Fed Officer)',
      role: UserRole.federation_admin,
      preferred_language: 'mr',
    },
  });
  await prisma.adminProfile.create({
    data: { user_id: fedAdminUser.id, federation_id: maharashtraFed.id },
  });

  const societyAdminUser = await prisma.user.create({
    data: {
      phone_number: '+919800000003',
      full_name: 'Suresh Deshmukh (Mumbai Society Admin)',
      role: UserRole.society_admin,
      preferred_language: 'mr',
    },
  });
  await prisma.adminProfile.create({
    data: { user_id: societyAdminUser.id, society_id: mumbaiElecSociety.id, federation_id: maharashtraFed.id },
  });

  // 6. Customers (~10)
  const customerLocations = [
    { name: 'Aarav Sharma', phone: '+919100000001', lat: 19.0760, lng: 72.8777, addr: 'Bandra West, Mumbai' },
    { name: 'Priya Iyer', phone: '+919100000002', lat: 19.1132, lng: 72.8697, addr: 'Andheri East, Mumbai' },
    { name: 'Ananya Kulkarni', phone: '+919100000003', lat: 18.5204, lng: 73.8567, addr: 'Kothrud, Pune' },
    { name: 'Vikram Joshi', phone: '+919100000004', lat: 18.5074, lng: 73.8077, addr: 'Baner, Pune' },
    { name: 'Rohan Hegde', phone: '+919100000005', lat: 12.9716, lng: 77.5946, addr: 'Indiranagar, Bengaluru' },
    { name: 'Sneha Rao', phone: '+919100000006', lat: 12.9352, lng: 77.6245, addr: 'Koramangala, Bengaluru' },
    { name: 'Kavya Gowda', phone: '+919100000007', lat: 12.2958, lng: 76.6394, addr: 'Gokulam, Mysuru' },
    { name: 'Manish Verma', phone: '+919100000008', lat: 19.0896, lng: 72.8656, addr: 'Kurla West, Mumbai' },
    { name: 'Meera Nair', phone: '+919100000009', lat: 18.5626, lng: 73.9168, addr: 'Viman Nagar, Pune' },
    { name: 'Devendra Gowda', phone: '+919100000010', lat: 12.9141, lng: 77.6411, addr: 'HSR Layout, Bengaluru' },
  ];

  for (const c of customerLocations) {
    const user = await prisma.user.create({
      data: {
        phone_number: c.phone,
        full_name: c.name,
        role: UserRole.customer,
        preferred_language: 'hi',
      },
    });
    await prisma.customerProfile.create({
      data: {
        user_id: user.id,
        default_address: c.addr,
        default_lat: c.lat,
        default_lng: c.lng,
      },
    });
  }

  // 7. Seed Workers (~30) across 4 societies with varied scores & statuses
  const workerSeeds = [
    // Mumbai Electricians (Society 1)
    { name: 'Rajesh Shinde', phone: '+919200000001', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.0765, lng: 72.8780, status: WorkerStatus.active, probation: false, jobsWeek: 2, completedJobs: 24, rating: 4.85 },
    { name: 'Sunil Pawar', phone: '+919200000002', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.0800, lng: 72.8750, status: WorkerStatus.active, probation: false, jobsWeek: 4, completedJobs: 18, rating: 4.70 },
    { name: 'Ganesh More', phone: '+919200000003', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.0720, lng: 72.8800, status: WorkerStatus.active, probation: true, jobsWeek: 0, completedJobs: 2, rating: null },
    { name: 'Mahesh Jadhav', phone: '+919200000004', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.0900, lng: 72.8600, status: WorkerStatus.active, probation: false, jobsWeek: 6, completedJobs: 42, rating: 4.90 },
    { name: 'Amitabh Kamble', phone: '+919200000005', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.1000, lng: 72.8500, status: WorkerStatus.documents_pending, probation: true, jobsWeek: 0, completedJobs: 0, rating: null },
    { name: 'Santosh Chavan', phone: '+919200000006', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.0750, lng: 72.8700, status: WorkerStatus.active, probation: false, jobsWeek: 1, completedJobs: 15, rating: 4.60 },
    { name: 'Vikas Solanki', phone: '+919200000007', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.1100, lng: 72.8700, status: WorkerStatus.verified, probation: true, jobsWeek: 0, completedJobs: 1, rating: null },
    { name: 'Dinesh Mane', phone: '+919200000008', society: mumbaiElecSociety.id, category: catElectrical.id, lat: 19.0680, lng: 72.8850, status: WorkerStatus.active, probation: false, jobsWeek: 3, completedJobs: 30, rating: 4.75 },

    // Pune Domestic Care (Society 2)
    { name: 'Sunita Patil', phone: '+919200000009', society: puneCareSociety.id, category: catCleaning.id, lat: 18.5200, lng: 73.8560, status: WorkerStatus.active, probation: false, jobsWeek: 3, completedJobs: 35, rating: 4.90 },
    { name: 'Kavita Shinde', phone: '+919200000010', society: puneCareSociety.id, category: catCleaning.id, lat: 18.5100, lng: 73.8500, status: WorkerStatus.active, probation: false, jobsWeek: 5, completedJobs: 28, rating: 4.65 },
    { name: 'Asha Gaikwad', phone: '+919200000011', society: puneCareSociety.id, category: catCaregiving.id, lat: 18.5250, lng: 73.8600, status: WorkerStatus.active, probation: false, jobsWeek: 1, completedJobs: 12, rating: 4.80 },
    { name: 'Rekha Kadam', phone: '+919200000012', society: puneCareSociety.id, category: catCleaning.id, lat: 18.5000, lng: 73.8100, status: WorkerStatus.active, probation: true, jobsWeek: 1, completedJobs: 4, rating: null },
    { name: 'Manjula Bhosale', phone: '+919200000013', society: puneCareSociety.id, category: catCaregiving.id, lat: 18.5600, lng: 73.9100, status: WorkerStatus.active, probation: false, jobsWeek: 2, completedJobs: 20, rating: 4.70 },
    { name: 'Lata Salunkhe', phone: '+919200000014', society: puneCareSociety.id, category: catCleaning.id, lat: 18.5300, lng: 73.8400, status: WorkerStatus.documents_pending, probation: true, jobsWeek: 0, completedJobs: 0, rating: null },
    { name: 'Shobha Thorat', phone: '+919200000015', society: puneCareSociety.id, category: catCleaning.id, lat: 18.5050, lng: 73.8200, status: WorkerStatus.active, probation: false, jobsWeek: 4, completedJobs: 50, rating: 4.95 },

    // Bengaluru Plumbing & Maintenance (Society 3)
    { name: 'Manjunath Swamy', phone: '+919200000016', society: bengaluruHomeSociety.id, category: catPlumbing.id, lat: 12.9710, lng: 77.5940, status: WorkerStatus.active, probation: false, jobsWeek: 2, completedJobs: 29, rating: 4.80 },
    { name: 'Basavaraj Gowda', phone: '+919200000017', society: bengaluruHomeSociety.id, category: catPlumbing.id, lat: 12.9350, lng: 77.6240, status: WorkerStatus.active, probation: false, jobsWeek: 4, completedJobs: 33, rating: 4.75 },
    { name: 'Shivaraj Kumar', phone: '+919200000018', society: bengaluruHomeSociety.id, category: catPlumbing.id, lat: 12.9140, lng: 77.6410, status: WorkerStatus.active, probation: true, jobsWeek: 0, completedJobs: 3, rating: null },
    { name: 'Prabhu Deva', phone: '+919200000019', society: bengaluruHomeSociety.id, category: catElectrical.id, lat: 12.9600, lng: 77.6000, status: WorkerStatus.active, probation: false, jobsWeek: 1, completedJobs: 19, rating: 4.85 },
    { name: 'Chetan Reddy', phone: '+919200000020', society: bengaluruHomeSociety.id, category: catPlumbing.id, lat: 12.9800, lng: 77.5800, status: WorkerStatus.active, probation: false, jobsWeek: 3, completedJobs: 22, rating: 4.60 },
    { name: 'Nagaraj Bhat', phone: '+919200000021', society: bengaluruHomeSociety.id, category: catPlumbing.id, lat: 12.9200, lng: 77.6300, status: WorkerStatus.verified, probation: true, jobsWeek: 0, completedJobs: 0, rating: null },
    { name: 'Vinayaka Shettar', phone: '+919200000022', society: bengaluruHomeSociety.id, category: catCleaning.id, lat: 12.9400, lng: 77.6100, status: WorkerStatus.active, probation: false, jobsWeek: 2, completedJobs: 14, rating: 4.70 },

    // Mysuru Technicians (Society 4)
    { name: 'Siddaramaiah N', phone: '+919200000023', society: mysuruTechSociety.id, category: catElectrical.id, lat: 12.2950, lng: 76.6390, status: WorkerStatus.active, probation: false, jobsWeek: 1, completedJobs: 16, rating: 4.90 },
    { name: 'Mahadevaswamy B', phone: '+919200000024', society: mysuruTechSociety.id, category: catElectrical.id, lat: 12.3000, lng: 76.6450, status: WorkerStatus.active, probation: false, jobsWeek: 3, completedJobs: 21, rating: 4.65 },
    { name: 'Kiran Kumar', phone: '+919200000025', society: mysuruTechSociety.id, category: catPlumbing.id, lat: 12.2900, lng: 76.6300, status: WorkerStatus.active, probation: true, jobsWeek: 0, completedJobs: 2, rating: null },
    { name: 'Prashanth M', phone: '+919200000026', society: mysuruTechSociety.id, category: catElectrical.id, lat: 12.3100, lng: 76.6500, status: WorkerStatus.documents_pending, probation: true, jobsWeek: 0, completedJobs: 0, rating: null },
    { name: 'Yashwant R', phone: '+919200000027', society: mysuruTechSociety.id, category: catCleaning.id, lat: 12.2800, lng: 76.6200, status: WorkerStatus.active, probation: false, jobsWeek: 2, completedJobs: 11, rating: 4.80 },
    { name: 'Anand Murthy', phone: '+919200000028', society: mysuruTechSociety.id, category: catElectrical.id, lat: 12.2980, lng: 76.6350, status: WorkerStatus.active, probation: false, jobsWeek: 0, completedJobs: 8, rating: 4.75 },
    { name: 'Darshan Gowda', phone: '+919200000029', society: mysuruTechSociety.id, category: catPlumbing.id, lat: 12.3050, lng: 76.6400, status: WorkerStatus.verified, probation: true, jobsWeek: 0, completedJobs: 1, rating: null },
    { name: 'Vijayendra S', phone: '+919200000030', society: mysuruTechSociety.id, category: catElectrical.id, lat: 12.2920, lng: 76.6380, status: WorkerStatus.active, probation: false, jobsWeek: 2, completedJobs: 17, rating: 4.85 },
  ];

  for (const w of workerSeeds) {
    const user = await prisma.user.create({
      data: {
        phone_number: w.phone,
        full_name: w.name,
        role: UserRole.worker,
        preferred_language: 'hi',
      },
    });

    const workerProfile = await prisma.workerProfile.create({
      data: {
        user_id: user.id,
        society_id: w.society,
        status: w.status,
        is_probation: w.probation,
        home_lat: w.lat,
        home_lng: w.lng,
        current_lat: w.lat,
        current_lng: w.lng,
        is_available: w.status === WorkerStatus.active,
        rolling_avg_rating: w.rating ? w.rating : null,
        completed_jobs_count: w.completedJobs,
        jobs_this_week_count: w.jobsWeek,
      },
    });

    await prisma.workerSkill.create({
      data: {
        worker_id: workerProfile.id,
        category_id: w.category,
        certification_level: w.probation ? CertificationLevel.basic : CertificationLevel.certified,
      },
    });

    // Add mock KYC documents
    await prisma.kycDocument.create({
      data: {
        worker_id: workerProfile.id,
        doc_type: 'e_shram_card',
        storage_url: 'https://mock-storage.sahakar.in/kyc/eshram_mock.pdf',
        verification_status: w.status === WorkerStatus.documents_pending ? 'pending' : 'verified',
        verified_via: 'e_shram_mock',
      },
    });
  }

  console.log('✅ Seeding completed successfully!');
  console.log(`- 2 Federations created`);
  console.log(`- 4 Cooperative Societies created`);
  console.log(`- 4 Service Categories & listings created`);
  console.log(`- 3 Admin Profiles created`);
  console.log(`- 10 Customer Profiles created`);
  console.log(`- 30 Worker Profiles with skills & locations created`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
