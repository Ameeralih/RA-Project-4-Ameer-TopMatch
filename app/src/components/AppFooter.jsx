import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

export const AppFooter = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <footer style={{ position: "absolute", bottom: "1vh" }}>footer</footer>
  );
};
