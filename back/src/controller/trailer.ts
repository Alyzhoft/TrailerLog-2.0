import { Spots, Trailer } from "@prisma/client";
import { prisma } from "../utils/prisma";

export async function getTrailers() {
  try {
    const trailers = await prisma.trailer.findMany({
      where: {
        departed: false,
      },
    });

    return trailers;
  } catch (error) {
    return { error };
  }
}

type AddTrailer = Trailer & {
  spotId: number;
};

export async function addTrailer(trailer: AddTrailer) {
  try {
    const search = await prisma.trailer.findMany({
      where: {
        trailerNumber: trailer.trailerNumber,
        carrier: trailer.carrier,
        departed: false,
      },
    });

    if (!search.length) {
      const res = await prisma.trailer.create({
        data: {
          trailerNumber: trailer.trailerNumber.toString(),
          carrier: trailer.carrier,
          category: trailer.category,
          trailerLocation: trailer.trailerLocation,
          spotNumber: trailer.spotNumber.toString(),
          comments: trailer.comments,
        },
      });

      const updateSpotTrailerId = await prisma.spots.update({
        where: {
          id: trailer.spotId,
        },
        data: {
          trailerId: res.id,
        },
      });

      return res;
    } else {
      return {
        error: `Trailer ${trailer.trailerNumber} for carrier ${trailer.carrier} has already been created. It is in spot ${search[0].trailerLocation} - ${search[0].spotNumber}`,
      };
    }
  } catch (error) {
    return { error };
  }
}

export async function updateTrailer(trailer: Trailer) {
  try {
    const res = await prisma.trailer.update({
      where: {
        id: trailer.id,
      },

      data: {
        trailerNumber: trailer.trailerNumber.toString(),
        carrier: trailer.carrier,
        category: trailer.category,
        comments: trailer.comments,
      },
    });

    return res;
  } catch (error) {
    return { error };
  }
}

export async function deleteTrailer(trailerId: number) {
  try {
    const trailer = await prisma.trailer.delete({
      where: {
        id: trailerId,
      },
    });

    return trailer;
  } catch (error) {
    return { error };
  }
}

export async function departed(trailerId: number) {
  try {
    const res = await prisma.trailer.update({
      where: {
        id: trailerId,
      },

      data: {
        departed: true,
      },
    });

    return res;
  } catch (error) {
    return error;
  }
}
