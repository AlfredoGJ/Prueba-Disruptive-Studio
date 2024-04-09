import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage, Login } from "./components/pages";
import { Register } from "./components/pages/Register";
import Home from "./components/pages/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LandingPage
        title="Welcome"
        subtitle="Disruptive Media Library"
        description="Here you can find lots of media from a lot of interesting topics "
        mediaCount={[
          { name: "Video", count: 100, description: "Video eo eo" },
          { name: "Text", count: 200, description: "Text not your ex" },
          { name: "Image", count: 300, description: "Image in all the people" },
        ]}
      />
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signIn", element: <Register /> },
  { path: "/home", element: <Home /> },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
