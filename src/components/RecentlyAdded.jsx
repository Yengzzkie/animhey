import { useContext } from "react"
import { RecentAnimeContext } from "../utils/context"

export default function RecentlyAdded() {
  const { recent } = useContext(RecentAnimeContext);

  return (
    <div className="flex flex-col h-full col-span-1 pr-4">
      <h1 className="text-xl mb-4">Recently Added</h1>
        {recent.slice(0, 7).map((recent) => (
            <div key={recent.id} className="bg-[#252525] hover:bg-[#141414] flex grow items-center shadow-md h-full w-full mb-1 cursor-pointer">
                <img src={recent.image} alt={recent.title} className="mr-4 w-16"/>
                <p>{recent.title.english}</p>
            </div>
        ))}
    </div>
  )
}
