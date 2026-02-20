import 'reflect-metadata';
import { AppDataSource } from '../database/data-source';
import { Category } from '../categories/entities/category.entity';
import { Content } from '../contents/entities/content.entity';

import contentsData from './contents.json';

async function seed() {
  await AppDataSource.initialize();

  const categoryRepo = AppDataSource.getRepository(Category);
  const contentRepo = AppDataSource.getRepository(Content);

  // 1️⃣ Vérifier si des contenus existent déjà
  const contentCount = await contentRepo.count();

  if (contentCount > 0) {
    console.log('📦 Database already seeded, skipping.');
    await AppDataSource.destroy();
    return;
  }

  console.log('🌱 Seeding database...');

  // 2️⃣ Créer ou récupérer les catégories
  const categoriesToCreate = ['Synopsis', 'Citation'];

  const categories: Record<string, Category> = {};

  for (const name of categoriesToCreate) {
    let category = await categoryRepo.findOne({ where: { name } });

    if (!category) {
      category = categoryRepo.create({ name });
      await categoryRepo.save(category);
      console.log(`✅ Category created: ${name}`);
    }

    categories[name] = category;
  }

  const contents: Content[] = [];

  for (const content of contentsData) {
    contents.push(
      contentRepo.create({
        title: content.title,
        text: content.text,
        author: content.author,
        image : content.image,
        type: content.categoryId.toLowerCase(),
        category: categories[content.categoryId]
      })
    );
  }


  await contentRepo.save(contents);

  console.log(`✅ ${contents.length} contents inserted`);
  console.log('🌱 Seed finished');

  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error('❌ Seed error', err);
  process.exit(1);
});
