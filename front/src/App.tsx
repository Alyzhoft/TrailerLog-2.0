import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Router } from "@reach/router";
import { SocketContext } from "./utils/socket";
import {
  CarrierContext,
  CategoryContext,
  RequestContext,
  TrailerLocationContext,
} from "./utils/context";
import {
  getCarriers,
  getCategories,
  getRequests,
  getTrailerLocations,
  getTrailers,
} from "./utils/api";
import RVAC from "./Views/RVAC";
import RMAN from "./Views/RMAN";
import Requests from "./Views/Requests";
import Container from "./components/ui/Container";
import Error from "./components/Modals/Error";

function App() {
  // const [trailers, setTrailers] = useState([]);
  // const [carriers, setCarriers] = useState([]);
  // const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    trailers: [],
    requests: [],
    carriers: [],
    categories: [],
    trailerLocations: [],
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //REST
  useEffect(() => {
    const fetchData = async () => {
      const trailers = await getTrailers();
      const carriers = await getCarriers();
      const categories = await getCategories();
      const requests = await getRequests();
      const trailerLocations = await getTrailerLocations();

      setData({
        trailers,
        requests,
        carriers,
        categories,
        trailerLocations,
      });
    };
    fetchData();
  }, []);

  const io = useContext(SocketContext);

  useEffect(() => {
    io.on("returnTrailerAdded", (trailer) => {
      setData((oldState) => ({ ...oldState, trailers: trailer.trailers }));
    });
  }, [io]);

  useEffect(() => {
    io.on("returnTrailerDeleted", (trailer) => {
      setData((oldState) => ({ ...oldState, trailers: trailer.trailers }));
    });
  }, [io]);

  useEffect(() => {
    io.on("returnTrailerUpdated", (trailer) => {
      setData((oldState) => ({ ...oldState, trailers: trailer.trailers }));
    });
  }, [io]);

  useEffect(() => {
    io.on("returnRequestAdded", (request) => {
      setData((oldState) => ({ ...oldState, requests: request.requests }));
    });
  }, [io]);

  useEffect(() => {
    io.on("returnInRequest", (request) => {
      setData((oldState) => ({ ...oldState, requests: request.requests }));
    });
  }, [io]);

  useEffect(() => {
    io.on("returnCompleted", (request) => {
      setData((oldState) => ({
        ...oldState,
        requests: request.requests,
        trailers: request.trailers,
      }));
    });
  }, [io]);

  useEffect(() => {
    io.on("error", (error) => {
      setError(true);
      setErrorMessage(error.error);
      console.error(error.error);
    });
  }, [io]);

  return (
    <div className="App flex flex-col h-screen justify-between">
      <Navbar />
      {error ? (
        <Error
          open={error}
          close={() => setError(false)}
          error={errorMessage}
        />
      ) : null}
      <RequestContext.Provider value={data.requests}>
        <CategoryContext.Provider value={data.categories}>
          <CarrierContext.Provider value={data.carriers}>
            <TrailerLocationContext.Provider value={data.trailerLocations}>
              <Container>
                <Router>
                  <RVAC trailers={data.trailers} path="/" />
                  <RMAN trailers={data.trailers} path="/rman" />
                  <Requests path="/requests" />
                </Router>
              </Container>
            </TrailerLocationContext.Provider>
          </CarrierContext.Provider>
        </CategoryContext.Provider>
      </RequestContext.Provider>
    </div>
  );
}

export default App;
