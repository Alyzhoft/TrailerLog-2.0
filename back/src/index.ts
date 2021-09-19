import express, { request } from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import boolParser from "express-query-boolean";
import {
  addTrailer,
  getTrailers,
  deleteTrailer,
  updateTrailer,
  departed,
} from "./controller/trailer";
import { Requests, Trailer } from "@prisma/client";
import {
  addRequest,
  completed,
  deleteRequest,
  getRequests,
  inRequest,
  move,
} from "./controller/request";
import { addCarrier, getCarriers, deleteCarrier } from "./controller/carrier";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "./controller/category";

const app = express();
const server = http.createServer(app);

// const userRoutes = require('./routes/user');
const trailerRoutes = require("./routes/trailer");
const carrierRoutes = require("./routes/carrier");
const categoryRoutes = require("./routes/category");
const requestRoutes = require("./routes/request");
const trailerLocationRoutes = require("./routes/trailerLocation");
const spotRoutes = require("./routes/spots");
const search = require("./routes/search");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(boolParser());
app.use("/api/trailer", trailerRoutes);
app.use("/api/carrier", carrierRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/trailerLocation", trailerLocationRoutes);
app.use("/api/spot", spotRoutes);
app.use("/api/search", search);

server.listen(4000, () => {
  console.log("Working");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

type OutIn = Requests & {
  inTrailerId: number;
  outTrailerId: number;
};
type AddTrailer = Trailer & {
  spotId: number;
};
io.on("connection", (Socket) => {
  Socket.on("addTrailer", async (trailer: AddTrailer) => {
    const res = await addTrailer(trailer);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const trailers = await getTrailers();
      io.emit("returnTrailerAdded", { newTrailer: res, trailers });
    }
  });

  Socket.on("updateTrailer", async (trailer: Trailer) => {
    const res = await updateTrailer(trailer);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const trailers = await getTrailers();
      io.emit("returnTrailerUpdated", { newTrailer: res, trailers });
    }
  });

  Socket.on("deleteTrailer", async (trailer: Trailer) => {
    const res = await deleteTrailer(trailer.id);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const trailers = await getTrailers();
      io.emit("returnTrailerDeleted", { newTrailer: res, trailers });
    }
  });

  Socket.on("addRequest", async (request: OutIn) => {
    const res = await addRequest(request);
    const requests = await getRequests();

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      io.emit("returnRequestAdded", { newRequest: res, requests });
    }
  });

  Socket.on("inRequest", async (request: Requests) => {
    const res = await inRequest(request);
    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const requests = await getRequests();
      io.emit("returnInRequest", { newRequest: res, requests });
    }
  });

  Socket.on("deleteRequest", async (id: number) => {
    const res = await deleteRequest(id);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const requests = await getRequests();
      io.emit("returnDeleteRequest", { newRequest: res, requests });
    }
  });

  Socket.on("move", async (data: any) => {
    const res = await move(data);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const trailers = await getTrailers();
      io.emit("returnMove", { res, trailers });
    }
  });

  Socket.on("complete", async (request: Requests) => {
    const res = await completed(request);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const requests = await getRequests();
      const trailers = await getTrailers();
      io.emit("returnCompleted", { request: res, requests, trailers });
    }
  });

  Socket.on("addCarrier", async (carrier: any) => {
    const res = await addCarrier(carrier.carrierName);
    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const carriers = await getCarriers();
      io.emit("returnAddCarrier", { newCarrier: res, carriers });
    }
  });

  Socket.on("deleteCarrier", async (id: any) => {
    const res = await deleteCarrier(id);
    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const carriers = await getCarriers();
      io.emit("returnDeleteCarrier", { newCarrier: res, carriers });
    }
  });

  Socket.on("addCategory", async (category: any) => {
    const res = await addCategory(category.categoryName, category.color);
    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const categories = await getCategories();
      io.emit("returnAddCategory", { newCategory: res, categories });
    }
  });

  Socket.on("deleteCategory", async (id: any) => {
    const res = await deleteCategory(id);
    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const categories = await getCategories();
      io.emit("returnDeleteCategory", { newCategory: res, categories });
    }
  });

  Socket.on("editCategory", async (category: any) => {
    console.log(category);
    const res = await updateCategory(
      category.categoryID,
      category.category,
      category.color
    );

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const categories = await getCategories();
      io.emit("returnEditCategory", { newCategory: res, categories });
    }
  });

  Socket.on("departed", async (id: number) => {
    const res = await departed(id);

    if ("error" in res) {
      Socket.emit("error", res);
    } else {
      const trailers = await getTrailers();
      io.emit("returnDeparted", { departed: res, trailers });
    }
  });
});
