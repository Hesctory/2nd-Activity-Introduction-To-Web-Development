import { Potion } from "./models/Potion.js";

// The six sample potions from the statement. Because the database lives only
// in memory, these are re-created every time the server starts.
const samplePotions = [
  {
    name: "Poção Blue Sky",
    description:
      "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
    image: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
    price: 300,
  },
  {
    name: "Poção do Perfume Misterioso",
    description:
      "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
    image: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
    price: 200,
  },
  {
    name: "Poção de Pinus",
    description:
      "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
    image: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
    price: 3000,
  },
  {
    name: "Poção da Beleza Eterna",
    description: "Veneno que mata rápido.",
    image: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
    price: 100,
  },
  {
    name: "Poção do Arco Íris",
    description:
      "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.",
    image: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
    price: 120,
  },
  {
    name: "Caldeirão das Verdades Secretas",
    description:
      "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
    image: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
    price: 150,
  },
];

export async function seedPotions() {
  await Potion.bulkCreate(samplePotions);
  console.log(`Seeded ${samplePotions.length} potions into the database.`);
}
