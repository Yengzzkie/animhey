import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import Error from "./routes/Error";
import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";
import AnimeResult from "./components/AnimeResult";
import Watch from "./components/Watch";

const router = createBrowserRouter([
  { path: "/", element: <Root />, errorElement: <Error />, children: [
    {path: "/", element: <Home />},
    {path: "/results", element: <AnimeResult />},
    {path: "/videoplayer", element: <VideoPlayer />},
    {path: "/watch/:id", element: <Watch />},
  ] },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
