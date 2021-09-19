import { Spots } from "@prisma/client";
import { prisma } from "../utils/prisma";

export async function getSpots() {
  try {
    const res = await prisma.spots.findMany();

    return res;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getAvalibleSpots() {
  try {
    const res = await prisma.spots.findMany({
      where: {
        trailerId: null,
      },
    });

    return res;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function addSpot(spot: Spots) {
  try {
    const res = await prisma.spots.create({
      data: {
        name: spot.name,
        trailerLocationId: spot.trailerLocationId,
      },
    });

    return res;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function updateSpot(spot: Spots) {
  try {
    const res = await prisma.spots.update({
      where: {
        id: spot.id,
      },

      data: {
        name: spot.name,
        trailerLocationId: spot.trailerLocationId,
      },
    });

    return res;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function deleteSpot(id: number) {
  try {
    const res = await prisma.spots.delete({
      where: {
        id,
      },
    });

    return res;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}
