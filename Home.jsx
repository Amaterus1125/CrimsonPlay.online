import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  // Load all games from backend
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Backend Error:", err));
  }, []);

  // Live search
  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFiltered([]);
      return;
    }

    const results = games.filter((game) =>
      game.title.toLowerCase().includes(query)
    );

    setFiltered(results.slice(0, 8)); // limit to 8 suggestions
  }, [search, games]);

  // Navigate to Game Details Page
  const goToGamePage = (title) => {
    const encoded = encodeURIComponent(title.trim());
    navigate(`/game/${encoded}`);
  };

  return (
    <div
      className="
        relative w-full min-h-screen 
        text-white 
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: "url('/backgroundimage.webp')" }}
    >
      <Navbar />

      <main className="relative z-[3] px-6 md:px-20 py-20 min-h-screen flex flex-col items-center">

        {/* homey */}
        <div
          className="
            bg-[#0d111a]/40 
            backdrop-blur-xl 
            border border-red-500 
            shadow-[0_0_25px_rgba(255,0,0,0.8)]
            rounded-3xl 
            px-10 py-6 
            mb-10
          "
        >
          <h1 className="text-6xl valorant-font tracking-wide text-[#FF4655]">
            HOME
          </h1>
        </div>

        {/* description title */}
        <div
          className="
            max-w-3xl
            bg-[#0d111a]/40 
            backdrop-blur-xl 
            border border-red-500 
            shadow-[0_0_18px_rgba(255,0,0,0.7)]
            rounded-2xl 
            p-8 
            text-center 
            mb-16
          "
        >
          <p className="opacity-90 text-xl leading-relaxed text-[#9A00FF] valorant-font">
            Search for a game and press ENTER to see recommended games.
            <br />
            Or pick a suggestion from the list as you type.
          </p>
        </div>

        {/* search sections */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-16 relative">

          {/* search input */}
          <div
            className="
              relative w-full rounded-2xl p-[3px] 
              bg-gradient-to-r from-red-600 to-red-900 
              shadow-[0_0_20px_rgba(255,0,0,0.9)]
            "
          >
            <div className="rounded-2xl bg-[#121823]/90 backdrop-blur-xl">
              <input
                type="text"
                placeholder="TYPE THE GAME NAME YOU WANT TO SEE"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    goToGamePage(search);
                  }
                }}
                className="
                  w-full px-6 py-4 rounded-2xl bg-transparent 
                  text-white text-xl valorant-font tracking-wide
                  focus:outline-none
                "
              />
            </div>
          </div>

          {/* live suggestion dropdown */}
          {filtered.length > 0 && (
            <ul
              className="
                absolute top-full mt-3 w-full
                bg-[#1b2433]/90 backdrop-blur-xl
                rounded-xl shadow-xl 
                border border-red-600/40
                overflow-hidden
                z-50
              "
            >
              {filtered.map((game) => (
                <li
                  key={game.id}
                  className="
                    px-6 py-4 cursor-pointer valorant-font transition
                    hover:bg-[#273244]/70
                  "
                  onClick={() => {
                    goToGamePage(game.title);
                    setFiltered([]); // close dropdown
                  }}
                >
                  <span className="text-red-400 font-bold">{game.title}</span>
                  <span className="opacity-60 ml-2 text-sm">({game.genre})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

