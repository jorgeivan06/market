import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpiar base de datos
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('zenu_pass_2026', 10);
  
  // 1. Crear Artesano Maestro
  const artesano = await prisma.user.create({
    data: {
      email: 'artesano@zenu.com',
      password: hashedPassword,
      name: 'Eusebio Tuchín',
      role: 'SELLER',
      bio: 'Maestro artesano con más de 40 años de experiencia en el trenzado de la caña flecha. Líder de la comunidad en Tuchín.',
      location: 'Tuchín, Córdoba',
      community: 'Zenú',
    },
  });

  console.log('Artesano creado:', artesano.name);

  // 2. Crear Productos con Historia Cultural
  const products = [
    {
      name: 'Sombrero Vueltiao "El Rey"',
      description: 'Sombrero de 21 vueltas, la máxima expresión de calidad y detalle en el tejido Zenú.',
      culturalHistory: 'El diseño representa elementos de la naturaleza y la cosmogonía Zenú. Las vueltas simbolizan la jerarquía y el tiempo dedicado a la pieza.',
      price: 350000,
      category: 'Sombreros',
      material: 'Caña Flecha',
      technique: 'Trenzado 21 vueltas',
      stock: 5,
      images: [
        'https://www.shutterstock.com/image-photo/hat-sombrero-vueltiao-traditional-colombian-260nw-2254424789.jpg',
        'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1000'
      ]
    },
    {
      name: 'Mochila Zenú "Tierra Madre"',
      description: 'Mochila tejida con figuras geométricas tradicionales en blanco y negro.',
      culturalHistory: 'Los rombos representan el territorio y las divisiones de la tierra que los ancestros Zenúes protegían.',
      price: 150000,
      category: 'Bolsos',
      material: 'Caña Flecha / Hilo',
      technique: 'Tejido en telar manual',
      stock: 12,
      images: [
        'https://images.unsplash.com/photo-1590611380053-1fd423f322bb?q=80&w=1000'
      ]
    }
  ];

  for (const p of products) {
    const { images, ...productData } = p;
    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        userId: artesano.id,
      },
    });

    for (const imgUrl of images) {
      await prisma.productImage.create({
        data: {
          url: imgUrl,
          productId: createdProduct.id,
        },
      });
    }
  }

  console.log('Marketplace poblado con éxito con datos culturales.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
