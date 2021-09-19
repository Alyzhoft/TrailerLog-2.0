import { Requests, RequestType } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { addTrailer } from "./trailer";

export async function getRequests() {
  try {
    const requests = await prisma.requests.findMany({
      where: {
        completed: false,
      },
      include: {
        trailer: {
          include: {
            Spots: true,
          },
        },
      },
      orderBy: {
        urgent: "desc",
      },
    });

    return requests;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function inRequest(request: Requests) {
  try {
    const res = await prisma.requests.findMany({
      where: {
        inSpotNumber: request.inSpotNumber,
        inTrailerLocation: request.inTrailerLocation,
        completed: false,
      },
    });

    console.log({ request, res });

    if (res.length === 0) {
      const inRequest = await prisma.requests.create({
        data: {
          trailerId: request.trailerId,
          inCarrier: request.inCarrier,
          inTrailerNumber: request.inTrailerNumber,
          inSpotNumber: request.inSpotNumber,
          inTrailerLocation: request.inTrailerLocation,
          special: request.special,
          requestType: RequestType.IN,
          urgent: request.urgent,
        },
      });
      return inRequest;
    } else {
      return {
        error: `Request has already been submitted for ${request.inTrailerLocation} - ${request.inSpotNumber}`,
      };
    }
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

type OutIn = Requests & {
  inTrailerId: number;
  outTrailerId: number;
};

export async function addRequest(requests: OutIn) {
  try {
    let outRequest;
    let inRequest;

    if ("outTrailerNumber" in requests) {
      const res = await prisma.requests.findMany({
        where: {
          outSpotNumber: requests.outSpotNumber,
          outTrailerLocation: requests.outTrailerLocation,
          completed: false,
        },
      });

      if (res.length === 0) {
        outRequest = await prisma.requests.create({
          data: {
            trailerId: requests.outTrailerId,
            outSpotNumber: requests.outSpotNumber,
            outTrailerLocation: requests.outTrailerLocation,
            outTrailerNumber: requests.outTrailerNumber,
            outCarrier: requests.outCarrier,
            special: requests.special,
            outCategory: requests.outCategory,
            requestType: RequestType.OUT,
            urgent: requests.urgent,
          },
        });
      } else {
        return {
          error: `Request has already been submitted for ${requests.outTrailerLocation} - ${requests.outSpotNumber}`,
        };
      }
    }

    if ("inTrailerNumber" in requests) {
      const res = await prisma.requests.findMany({
        where: {
          inSpotNumber: requests.inSpotNumber,
          inTrailerLocation: requests.inTrailerLocation,
          completed: false,
        },
      });

      if (res.length === 0) {
        inRequest = await prisma.requests.create({
          data: {
            trailerId: requests.inTrailerId,
            inCarrier: requests.inCarrier,
            inTrailerNumber: requests.inTrailerNumber,
            inSpotNumber: requests.inSpotNumber,
            inTrailerLocation: requests.inTrailerLocation,
            special: requests.special,
            requestType: RequestType.IN,
            urgent: requests.urgent,
          },
        });
      } else {
        return {
          error: `Request has already been submitted for ${requests.inTrailerLocation} - ${requests.inSpotNumber}`,
        };
      }
    }

    return { outRequest, inRequest };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function deleteRequest(id: number) {
  try {
    const trailer = await prisma.requests.delete({
      where: {
        id,
      },
    });

    return trailer;
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function completed(request: any) {
  try {
    const res = await prisma.requests.update({
      where: {
        id: request.id,
      },
      data: {
        completed: true,
      },
    });

    console.log(request);

    let trailer;
    if (
      request.inTrailerLocation !== null &&
      request.inSpotNumber !== null &&
      request.trailerId
    ) {
      trailer = await prisma.trailer.update({
        where: { id: request.trailerId },
        data: {
          trailerLocation: request?.inTrailerLocation,
          spotNumber: request?.inSpotNumber,
          // category: "In Process",
        },
      });
    }

    const t = await prisma.spots.update({
      where: {
        id: parseInt(request.trailer.Spots.id),
      },
      data: {
        trailerId: null,
      },
    });

    if (request.requestType === "IN") {
      const spot = await prisma.spots.update({
        where: {
          id: parseInt(request.trailer.Spots.id),
        },
        data: {
          trailerId: request.trailerId,
        },
      });
    } else {
      const spot = await prisma.spots.update({
        where: {
          id: parseInt(request.spotId),
        },
        data: {
          trailerId: request.trailerId,
        },
      });
    }

    return { res, trailer };
  } catch (error) {
    console.log(error);

    return { error: JSON.stringify(error) };
  }
}

export async function move(temp: any) {
  try {
    console.log(temp);

    const res = await prisma.spots.update({
      where: {
        id: temp.trailer.Spots.id,
      },
      data: {
        trailerId: null,
      },
    });

    const spot = await prisma.spots.update({
      where: {
        id: parseInt(temp.newSpotId),
      },
      data: {
        trailerId: temp.trailer.id,
      },
    });

    const trailer = await prisma.trailer.update({
      where: {
        id: temp.trailer.id,
      },
      data: {
        trailerLocation: temp.newLocation,
        spotNumber: temp.newSpot,
      },
    });

    return { trailer, spot };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}
