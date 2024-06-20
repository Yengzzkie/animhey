import { useContext } from "react";
import { RecommendationsContext } from "./Watch";
import { Link } from "react-router-dom";

export default function Recommended() {
  const { recommendations } = useContext(RecommendationsContext);

  return (
    <div className="flex flex-col h-full pr-4 lg:w-96">
      <h1 className="text-xl mb-4">Recommended</h1>
      {recommendations.slice(0, 7).map((recommend) => (
        <Link to={`/watch/${recommend.id}`} key={recommend.id}>
          <div className="bg-[#252525] hover:bg-[#141414] text-sm flex items-center shadow-md h-full w-full mb-1 pr-2 cursor-pointer">
            <img src={recommend.image} alt={recommend.title} className="mr-4 w-16"/>
            <p>{recommend.title.english}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
