import { TrailerLocation } from "@prisma/client";
import { prisma } from "../utils/prisma";

export async function getTrailerLocations() {
  try {
    const res = await prisma.trailerLocation.findMany({
      include: {
        Spots: {
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function getAvalibleTrailerLocations() {
  try {
    const res = await prisma.trailerLocation.findMany({
      include: {
        Spots: {
          where: {
            trailerId: null,
          },
        },
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function addTrailerLocation(trailerLocation: TrailerLocation) {
  try {
    const res = await prisma.trailerLocation.create({
      data: {
        name: trailerLocation.name,
        lot: trailerLocation.lot,
        dock: trailerLocation.dock,
        lotName: trailerLocation.lotName,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function updateTrailerLocation(trailerLocation: TrailerLocation) {
  try {
    const res = await prisma.trailerLocation.update({
      where: {
        id: trailerLocation.id,
      },

      data: {
        name: trailerLocation.name,
        lot: trailerLocation.lot,
        dock: trailerLocation.dock,
        lotName: trailerLocation.lotName,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function deleteTrailerLocation(id: number) {
  try {
    const res = await prisma.trailerLocation.delete({
      where: {
        id,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}
