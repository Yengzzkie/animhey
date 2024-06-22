import Hero from "./Hero";
import Trending from "./Trending";
import RecentlyAdded from "./RecentlyAdded";
import MostViewed from "./MostViewed";
import RecentlyCompleted from "./RecentlyCompleted";
import { ClicksContext, LoadingContext } from "../utils/context";
import { useContext } from "react";
import { CustomSpinner } from "./Spinner";

export default function Home() {
  const { loading } = useContext(LoadingContext);
  const { clicks } = useContext(ClicksContext)

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <Hero />
          <span className="text-gray-500">Page visit count: {clicks}</span>
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
