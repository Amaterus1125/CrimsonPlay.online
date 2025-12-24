import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Categories() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        const uniqueGenres = [...new Set(data.map((g) => g.genre))];
        setGenres(uniqueGenres);
      });
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="bg-[#090d14] min-h-screen text-white">
      <Navbar />

      <main className="px-6 md:px-20 py-28 text-center">
        <h1 className="text-5xl valorant-font text-red-400 mb-10 tracking-wide">
          SELECT GENRES
        </h1>

        {/* all genres in vertical column */}
        <div className="flex flex-col items-center space-y-5">
          {genres.map((genre) => (
            <label
              key={genre}
              className="flex items-center space-x-4 text-2xl valorant-font cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="
                  h-6 w-6 cursor-pointer 
                  accent-red-600 
                  border-red-500 
                  focus:ring-red-500
                "
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>

        {/* sshow button */}
        <button
          disabled={selectedGenres.length === 0}
          onClick={() =>
            navigate(`/genre/${selectedGenres.join(",")}`)
          }
          className="
            mt-12 px-7 py-3 bg-red-600 hover:bg-red-700 transition 
            rounded-xl text-xl valorant-font tracking-wide 
            shadow-[0_0_12px_rgba(255,0,0,0.7)]
            disabled:bg-gray-500 disabled:cursor-not-allowed
          "
        >
          SHOW RESULTS
        </button>
      </main>

      <Footer />
    </div>
  );
}
