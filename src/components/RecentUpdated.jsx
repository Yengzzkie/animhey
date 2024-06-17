export default function RecentUpdated() {
    return (
      <section className="container bg-cover bg-center flex flex-col items-center justify-center h-auto py-5">
        <div className="text-white">
          <h1 className="text-4xl font-bold">Recent Updated</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 w-full h-full">
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index} className="flex flex-col shadow-md h-auto w-full">
              <img
                src={`https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg`}
                alt="Anime"
                className="flex-grow"
              />
              <h2 className="mt-2 text-[#c3c3c3] text-xl font-bold">Anime Title {index + 1}</h2>
              <p className="mt-1 text-gray-600 truncate">Description of anime {index + 1}...</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  