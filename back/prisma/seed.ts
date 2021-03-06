import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Creates Seed Data
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

  const createPlant = await prisma.plant.create({
    data: {
      name: "RbA",
    },
  });

  const createDocks = await prisma.dock.createMany({
    data: [{ name: "RVAC" }, { name: "RMAN" }],
  });

  const createLots = await prisma.lot.createMany({
    data: [{ name: "Secondary" }, { name: "Primary Lot" }],
  });

  const createViews = await prisma.view.createMany({
    data: [
      { name: "RVAC", plantId: 1, dockId: 1 },
      { name: "RMAN", plantId: 1, dockId: 2, lotId: 1 },
      { name: "Primary Lot", plantId: 1, lotId: 2 },
    ],
  });

  const createSpots = await prisma.spots.createMany({
    data: [
      { name: "74", dockId: 1 },
      { name: "73", dockId: 1 },
      { name: "72", dockId: 1 },
      { name: "71", dockId: 1 },
      { name: "70", dockId: 1 },
      { name: "69", dockId: 1 },
      { name: "68", dockId: 1 },
      { name: "67", dockId: 1 },
      { name: "66", dockId: 1 },
      { name: "65", dockId: 1 },
      { name: "64", dockId: 1 },
      { name: "63", dockId: 1 },
      { name: "62", dockId: 1 },
      { name: "61", dockId: 1 },
      { name: "60", dockId: 1 },
      { name: "59", dockId: 1 },
      { name: "58", dockId: 1 },
      { name: "57", dockId: 1 },
      { name: "56", dockId: 1 },
      { name: "55", dockId: 1 },
      { name: "54", dockId: 1 },
      { name: "53", dockId: 1 },
      { name: "52", dockId: 1 },
      { name: "51", dockId: 1 },
      { name: "50", dockId: 1 },
      { name: "49", dockId: 1 },
      { name: "48", dockId: 1 },
      { name: "47", dockId: 1 },
      { name: "46", dockId: 1 },
      { name: "45", dockId: 1 },
      { name: "44", dockId: 1 },
      { name: "43", dockId: 1 },
      { name: "42", dockId: 1 },
      { name: "41", dockId: 1 },
      { name: "40", dockId: 1 },
      { name: "37", dockId: 2 },
      { name: "36", dockId: 2 },
      { name: "35", dockId: 2 },
      { name: "34", dockId: 2 },
      { name: "33", dockId: 2 },
      { name: "32", dockId: 2 },
      { name: "31", dockId: 2 },
      { name: "30", dockId: 2 },
      { name: "29", dockId: 2 },
      { name: "28", dockId: 2 },
      { name: "27", dockId: 2 },
      { name: "26", dockId: 2 },
      { name: "25", dockId: 2 },
      { name: "24", dockId: 2 },
      { name: "23", dockId: 2 },
      { name: "22", dockId: 2 },
      { name: "21", dockId: 2 },
      { name: "20", dockId: 2 },
      { name: "19", dockId: 2 },
      { name: "18a", dockId: 2 },
      { name: "18", dockId: 2 },
      { name: "17", dockId: 2 },
      { name: "16", dockId: 2 },
      { name: "15", dockId: 2 },
      { name: "14", dockId: 2 },
      { name: "13", dockId: 2 },
      { name: "12", dockId: 2 },
      { name: "11", dockId: 2 },
      { name: "10", dockId: 2 },
      { name: "9", dockId: 2 },
      { name: "8", dockId: 2 },
      { name: "7", dockId: 2 },
      { name: "6", dockId: 2 },
      { name: "5", dockId: 2 },
      { name: "4", dockId: 2 },
      { name: "3", dockId: 2 },
      { name: "2", dockId: 2 },
      { name: "1", dockId: 2 },
      { name: "60", lotId: 1 },
      { name: "59", lotId: 1 },
      { name: "58", lotId: 1 },
      { name: "57", lotId: 1 },
      { name: "56", lotId: 1 },
      { name: "55", lotId: 1 },
      { name: "54", lotId: 1 },
      { name: "53", lotId: 1 },
      { name: "52", lotId: 1 },
      { name: "51", lotId: 1 },
      { name: "50", lotId: 1 },
      { name: "49", lotId: 1 },
      { name: "48", lotId: 1 },
      { name: "47", lotId: 1 },
      { name: "46", lotId: 1 },
      { name: "45", lotId: 1 },
      { name: "44", lotId: 1 },
      { name: "43", lotId: 1 },
      { name: "42", lotId: 1 },
      { name: "41", lotId: 1 },
      { name: "40", lotId: 1 },
      { name: "39", lotId: 1 },
      { name: "38", lotId: 1 },
      { name: "37", lotId: 1 },
      { name: "36", lotId: 1 },
      { name: "35", lotId: 1 },
      { name: "34", lotId: 1 },
      { name: "33", lotId: 1 },
      { name: "32", lotId: 1 },
      { name: "31", lotId: 1 },
      { name: "30", lotId: 1 },
      { name: "29", lotId: 1 },
      { name: "28", lotId: 1 },
      { name: "27", lotId: 1 },
      { name: "26", lotId: 1 },
      { name: "25", lotId: 1 },
      { name: "24", lotId: 1 },
      { name: "23", lotId: 1 },
      { name: "22", lotId: 1 },
      { name: "21", lotId: 1 },
      { name: "20", lotId: 1 },
      { name: "19", lotId: 1 },
      { name: "18", lotId: 1 },
      { name: "17", lotId: 1 },
      { name: "16", lotId: 1 },
      { name: "15", lotId: 1 },
      { name: "14", lotId: 1 },
      { name: "13", lotId: 1 },
      { name: "12", lotId: 1 },
      { name: "11", lotId: 1 },
      { name: "10", lotId: 1 },
      { name: "9", lotId: 1 },
      { name: "8", lotId: 1 },
      { name: "7", lotId: 1 },
      { name: "6", lotId: 1 },
      { name: "5", lotId: 1 },
      { name: "4", lotId: 1 },
      { name: "3", lotId: 1 },
      { name: "2", lotId: 1 },
      { name: "1", lotId: 1 },
      { name: "216", lotId: 2 },
      { name: "215", lotId: 2 },
      { name: "214", lotId: 2 },
      { name: "213", lotId: 2 },
      { name: "212", lotId: 2 },
      { name: "211", lotId: 2 },
      { name: "210", lotId: 2 },
      { name: "209", lotId: 2 },
      { name: "208", lotId: 2 },
      { name: "207", lotId: 2 },
      { name: "206", lotId: 2 },
      { name: "205", lotId: 2 },
      { name: "204", lotId: 2 },
      { name: "203", lotId: 2 },
      { name: "202", lotId: 2 },
      { name: "201", lotId: 2 },
      { name: "200", lotId: 2 },
      { name: "199", lotId: 2 },
      { name: "198", lotId: 2 },
      { name: "197", lotId: 2 },
      { name: "196", lotId: 2 },
      { name: "195", lotId: 2 },
      { name: "194", lotId: 2 },
      { name: "193", lotId: 2 },
      { name: "192", lotId: 2 },
      { name: "191", lotId: 2 },
      { name: "190", lotId: 2 },
      { name: "189", lotId: 2 },
      { name: "188", lotId: 2 },
      { name: "187", lotId: 2 },
      { name: "186", lotId: 2 },
      { name: "185", lotId: 2 },
      { name: "184", lotId: 2 },
      { name: "183", lotId: 2 },
      { name: "182", lotId: 2 },
      { name: "181", lotId: 2 },
      { name: "180", lotId: 2 },
      { name: "179", lotId: 2 },
      { name: "178", lotId: 2 },
      { name: "177", lotId: 2 },
      { name: "176", lotId: 2 },
      { name: "175", lotId: 2 },
      { name: "174", lotId: 2 },
      { name: "173", lotId: 2 },
      { name: "172", lotId: 2 },
      { name: "171", lotId: 2 },
      { name: "170", lotId: 2 },
      { name: "169", lotId: 2 },
      { name: "168", lotId: 2 },
      { name: "167", lotId: 2 },
      { name: "166", lotId: 2 },
      { name: "165", lotId: 2 },
      { name: "164", lotId: 2 },
      { name: "163", lotId: 2 },
      { name: "162", lotId: 2 },
      { name: "161", lotId: 2 },
      { name: "160", lotId: 2 },
      { name: "159", lotId: 2 },
      { name: "158", lotId: 2 },
      { name: "157", lotId: 2 },
      { name: "156", lotId: 2 },
      { name: "155", lotId: 2 },
      { name: "154", lotId: 2 },
      { name: "153", lotId: 2 },
      { name: "152", lotId: 2 },
      { name: "151", lotId: 2 },
      { name: "150", lotId: 2 },
      { name: "149", lotId: 2 },
      { name: "148", lotId: 2 },
      { name: "147", lotId: 2 },
      { name: "146", lotId: 2 },
      { name: "145", lotId: 2 },
      { name: "144", lotId: 2 },
      { name: "143", lotId: 2 },
      { name: "142", lotId: 2 },
      { name: "141", lotId: 2 },
      { name: "140", lotId: 2 },
      { name: "139", lotId: 2 },
      { name: "138", lotId: 2 },
      { name: "137", lotId: 2 },
      { name: "136", lotId: 2 },
      { name: "135", lotId: 2 },
      { name: "134", lotId: 2 },
      { name: "133", lotId: 2 },
      { name: "132", lotId: 2 },
      { name: "131", lotId: 2 },
      { name: "130", lotId: 2 },
      { name: "129", lotId: 2 },
      { name: "128", lotId: 2 },
      { name: "127", lotId: 2 },
      { name: "126", lotId: 2 },
      { name: "125", lotId: 2 },
      { name: "124", lotId: 2 },
      { name: "123", lotId: 2 },
      { name: "122", lotId: 2 },
      { name: "121", lotId: 2 },
      { name: "120", lotId: 2 },
      { name: "119", lotId: 2 },
      { name: "118", lotId: 2 },
      { name: "117", lotId: 2 },
      { name: "116", lotId: 2 },
      { name: "115", lotId: 2 },
      { name: "114", lotId: 2 },
      { name: "113", lotId: 2 },
      { name: "112", lotId: 2 },
      { name: "111", lotId: 2 },
      { name: "110", lotId: 2 },
      { name: "109", lotId: 2 },
      { name: "108", lotId: 2 },
      { name: "107", lotId: 2 },
      { name: "106", lotId: 2 },
      { name: "105", lotId: 2 },
      { name: "104", lotId: 2 },
      { name: "103", lotId: 2 },
      { name: "102", lotId: 2 },
      { name: "101", lotId: 2 },
      { name: "100", lotId: 2 },
      { name: "99", lotId: 2 },
      { name: "98", lotId: 2 },
      { name: "97", lotId: 2 },
      { name: "96", lotId: 2 },
      { name: "95", lotId: 2 },
      { name: "94", lotId: 2 },
      { name: "93", lotId: 2 },
      { name: "92", lotId: 2 },
      { name: "91", lotId: 2 },
      { name: "90", lotId: 2 },
      { name: "89", lotId: 2 },
      { name: "88", lotId: 2 },
      { name: "87", lotId: 2 },
      { name: "86", lotId: 2 },
      { name: "85", lotId: 2 },
      { name: "84", lotId: 2 },
      { name: "83", lotId: 2 },
      { name: "82", lotId: 2 },
      { name: "81", lotId: 2 },
      { name: "80", lotId: 2 },
      { name: "79", lotId: 2 },
      { name: "78", lotId: 2 },
      { name: "77", lotId: 2 },
      { name: "76", lotId: 2 },
      { name: "75", lotId: 2 },
      { name: "74", lotId: 2 },
      { name: "73", lotId: 2 },
      { name: "72", lotId: 2 },
      { name: "71", lotId: 2 },
      { name: "70", lotId: 2 },
      { name: "69", lotId: 2 },
      { name: "68", lotId: 2 },
      { name: "67", lotId: 2 },
      { name: "66", lotId: 2 },
      { name: "65", lotId: 2 },
      { name: "64", lotId: 2 },
      { name: "63", lotId: 2 },
      { name: "62", lotId: 2 },
      { name: "61", lotId: 2 },
      { name: "60", lotId: 2 },
      { name: "59", lotId: 2 },
      { name: "58", lotId: 2 },
      { name: "57", lotId: 2 },
      { name: "56", lotId: 2 },
      { name: "55", lotId: 2 },
      { name: "54", lotId: 2 },
      { name: "53", lotId: 2 },
      { name: "52", lotId: 2 },
      { name: "51", lotId: 2 },
      { name: "50", lotId: 2 },
      { name: "49", lotId: 2 },
      { name: "48", lotId: 2 },
      { name: "47", lotId: 2 },
      { name: "46", lotId: 2 },
      { name: "45", lotId: 2 },
      { name: "44", lotId: 2 },
      { name: "43", lotId: 2 },
      { name: "42", lotId: 2 },
      { name: "41", lotId: 2 },
      { name: "40", lotId: 2 },
      { name: "39", lotId: 2 },
      { name: "38", lotId: 2 },
      { name: "37", lotId: 2 },
      { name: "36", lotId: 2 },
      { name: "35", lotId: 2 },
      { name: "34", lotId: 2 },
      { name: "33", lotId: 2 },
      { name: "32", lotId: 2 },
      { name: "31", lotId: 2 },
      { name: "30", lotId: 2 },
      { name: "29", lotId: 2 },
      { name: "28", lotId: 2 },
      { name: "27", lotId: 2 },
      { name: "26", lotId: 2 },
      { name: "25", lotId: 2 },
      { name: "24", lotId: 2 },
      { name: "23", lotId: 2 },
      { name: "22", lotId: 2 },
      { name: "21", lotId: 2 },
      { name: "20", lotId: 2 },
      { name: "19", lotId: 2 },
      { name: "18", lotId: 2 },
      { name: "17", lotId: 2 },
      { name: "16", lotId: 2 },
      { name: "15", lotId: 2 },
      { name: "14", lotId: 2 },
      { name: "13", lotId: 2 },
      { name: "12", lotId: 2 },
      { name: "11", lotId: 2 },
      { name: "10", lotId: 2 },
      { name: "9", lotId: 2 },
      { name: "8", lotId: 2 },
      { name: "7", lotId: 2 },
      { name: "6", lotId: 2 },
      { name: "5", lotId: 2 },
      { name: "4", lotId: 2 },
      { name: "3", lotId: 2 },
      { name: "2", lotId: 2 },
      { name: "1", lotId: 2 },
    ],
  });

  console.log({
    createCarriers,
    createCategories,
    createPlant,
    createViews,
    createDocks,
    createLots,
    createSpots,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
