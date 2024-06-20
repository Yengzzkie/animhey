import { useContext } from "react";
import { RelationsContext } from "./Watch";
import { Link } from "react-router-dom";

export default function Recommended() {
  const { relations } = useContext(RelationsContext);

  return (
    <div className="flex flex-col h-auto pr-4 lg:w-96 mb-6">
      <h1 className="text-xl mb-4">Related to this Anime</h1>
      {relations.slice(0, 7).map((relations) => (
        <Link to={`/watch/${relations.id}`} key={relations.id}>
          <div className="bg-[#252525] hover:bg-[#141414] text-sm flex items-center shadow-md h-full w-full mb-1 pr-2 cursor-pointer">
            <img src={relations.image} alt={relations.title} className="mr-4 w-16"/>
            <p>{relations.title.english}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
