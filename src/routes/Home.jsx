import Hero from "../components/Hero";
import Trending from "../components/Trending";
import RecentlyAdded from "../components/RecentlyAdded";
import MostViewed from "../components/MostViewed";
import RecentlyCompleted from "../components/RecentlyCompleted";
import { ClicksContext, LoadingContext } from "../utils/context";
import { useContext } from "react";
import { CustomSpinner } from "../components/Spinner";
import { Modal } from "../components/Dialog";

export default function Home() {
  const { loading } = useContext(LoadingContext);
  const { clicks } = useContext(ClicksContext);

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <Hero />
          <p className="text-gray-400 mt-2">Page visits: <span className="font-semibold">{clicks}</span></p>
          <Modal />
          <Trending />
          <section className="container mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <MostViewed />
              <RecentlyAdded />
              <RecentlyCompleted />
            </div>
          </section>
        </>
      )}
    </>
  );
}
