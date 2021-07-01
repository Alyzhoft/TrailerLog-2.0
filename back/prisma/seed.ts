import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const createCarriers = await prisma.carrier.createMany({
    data: [
      { carrierName: "XPO" },
      { carrierName: "CTS" },
      { carrierName: "Dart" },
      { carrierName: "Transport Design" },
      { carrierName: "DRT" },
      { carrierName: "Waletich" },
      { carrierName: "Taylor" },
      { carrierName: "Terminal" },
      { carrierName: "Trucking Proz" },
      { carrierName: "UTS" },
      { carrierName: "J&R" },
      { carrierName: "Kuehl" },
      { carrierName: "American Fast Freight" },
      { carrierName: "Ryder" },
      { carrierName: "Keene’s" },
      { carrierName: "XPO Logistics" },
    ],
  });

  const createCategories = await prisma.category.createMany({
    data: [
      { categoryName: "Bays", color: "blue-500" },
      { categoryName: "Completed", color: "green-500" },
      { categoryName: "Dunnage", color: "blue-500" },
      { categoryName: "Empties for Shipping", color: "gray-500" },
      { categoryName: "In Process", color: "yellow-500" },
      { categoryName: "Patio Trailers", color: "yellow-600" },
      { categoryName: "Receiving", color: "purple-400" },
      { categoryName: "Receiving - Rush", color: "pink-600" },
      { categoryName: "Receiving - Storage", color: "blue-900" },
      { categoryName: "Storage/Misc. Shipping Trailers", color: "blue-300" },
      { categoryName: "Supermarket/Legacy/Eng", color: "blue-500" },
      { categoryName: "Do Not Use", color: "red-500" },
    ],
  });

  console.log({ createCarriers, createCategories });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
