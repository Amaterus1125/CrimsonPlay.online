import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function GenrePage() {
  const { genre } = useParams();
  const navigate = useNavigate();

  const [allGames, setAllGames] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // currently selected genres from URL
  const selectedGenres = genre.split(",");

// load all games
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setAllGames(data);

        // extract unique genres dynamically
        const genres = [...new Set(data.map((g) => g.genre))].sort();
        setAllGenres(genres);
      });
  }, []);


  // apply filtering when genre from URL changes

  useEffect(() => {
    if (allGames.length === 0) return;

    const matches = allGames.filter((g) =>
      selectedGenres.includes(g.genre)
    );

    setFiltered(matches);
  }, [genre, allGames]);


  // handle clicking a genre radio button
  
  const handleGenreClick = (g) => {
    // update URL to /genres/<genre>
    navigate(`/genres/${g}`);
  };

  return (
    <div className="bg-[#090d14] min-h-screen text-white">
      <Navbar />

      <main className="px-6 md:px-20 py-28 flex flex-col items-center text-center">

        {/* title */}
        <h1 className="text-5xl valorant-font mb-6 text-red-400 tracking-wide drop-shadow-[0_0_8px_#ff0000]">
          {selectedGenres.join(" + ").toUpperCase()}
        </h1>

        <h2 className="text-3xl valorant-font mb-12 text-red-400 drop-shadow-[0_0_10px_#ff0000]">
          Select a Genre
        </h2>

      
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-8 w-full max-w-5xl">

            {filtered.map((game) => {
              const steamLink = `https://steamdb.info/search/?a=all&q=${encodeURIComponent(
                game.title
              )}`;

              return (
                <a
                  key={game.id}
                  href={steamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    bg-[#121823]/60
                    border border-red-500
                    rounded-2xl
                    p-6
                    shadow-[0_0_20px_rgba(255,0,0,0.7)]
                    hover:shadow-[0_0_40px_rgba(255,0,0,1)]
                    backdrop-blur-xl
                    transition-all duration-300
                    cursor-pointer
                    flex flex-col md:flex-row
                    justify-between
                    items-start md:items-center
                  "
                >
                  {/* left game title card position */}
                  <h3 className="text-3xl valorant-font tracking-wide text-red-400">
                    {game.title}
                  </h3>

                  {/* right genre card position */}
                  <p className="text-lg opacity-80 mt-2 md:mt-0">
                    <span className="text-red-400 font-semibold tracking-wide">
                      Genre:
                    </span>{" "}
                    {game.genre}
                  </p>
                </a>
              );
            })}

          </div>
        ) : (
          <p className="text-xl opacity-70 mt-10">No games found.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

