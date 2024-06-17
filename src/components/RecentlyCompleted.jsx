export default function RecentlyCompleted() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-lg mb-4">Recently Completed</h1>
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="bg-[#252525] hover:bg-[#141414] flex grow items-center shadow-md h-full w-full mb-1">
          <img
            src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg"
            alt="Anime"
            className="w-14"
          />
          <p>Item {index + 1}</p>
        </div>
      ))}
    </div>
  );
}
