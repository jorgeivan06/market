import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpiar base de datos respetando las relaciones
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
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
        'https://www.construmole.com/wp-content/uploads/2025/04/D_Q_NP_2X_815393-MCO83281354127_032025-E.webp'
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
        'https://www.productosdecolombia.com/wp-content/uploads/2025/05/bolso-canaflecha-estilo-mochila-min.jpg'
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

  console.log('Marketplace poblado con éxito con datos culturales y nuevas imágenes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
