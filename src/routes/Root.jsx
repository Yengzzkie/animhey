import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="container mx-auto px-4 md:px-2 xl:px-20">
      <Navigation />
      <main className="container flex flex-col items-center  w-full mx-auto">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
