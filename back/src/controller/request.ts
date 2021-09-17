import { Requests, RequestType } from "@prisma/client";
import { prisma } from "../utils/prisma";

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
    return { error };
  }
}

export async function inRequest(request: Requests) {
  try {
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
  } catch (error) {
    return { error };
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
    }

    if ("inTrailerNumber" in requests) {
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
    }

    return { outRequest, inRequest };
  } catch (error) {
    return { error };
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
    return { error };
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
        id: request.trailer.Spots.id,
      },
      data: {
        trailerId: null,
      },
    });

    const spot = await prisma.spots.update({
      where: {
        id: request.spotId,
      },
      data: {
        trailerId: request.trailerId,
      },
    });

    return { res, trailer };
  } catch (error) {
    return { error };
  }
}
