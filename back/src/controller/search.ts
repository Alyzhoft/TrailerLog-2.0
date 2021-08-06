import { search } from "src/types";
import { prisma } from "../utils/prisma";

export async function search({
  carrier,
  category,
  trailerLocation,
  departed,
  trailerNumber,
  page,
  limit,
}: search) {
  try {
    const skip = (page - 1) * limit;

    const trailers = await prisma.trailer.findMany({
      take: limit,
      skip: skip,
      where: {
        carrier,
        category,
        trailerLocation,
        departed,
        trailerNumber,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return trailers;
  } catch (error) {
    return { error };
  }
}
