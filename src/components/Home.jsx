import Hero from "./Hero";
import RecentUpdated from "./RecentUpdated";
import RecentlyAdded from "./RecentlyAdded";
import MostViewed from "./MostViewed";
import RecentlyCompleted from "./RecentlyCompleted";

export default function Home() {
  return (
    <>
    <Hero />
    <RecentUpdated />
    
    <section className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <RecentlyAdded />
            <MostViewed />
            <RecentlyCompleted />

        </div>
    </section>
    </>
  );
}
