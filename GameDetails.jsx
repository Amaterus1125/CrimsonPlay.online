import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// ✅ The Direct API Link for your new Docker Space
const API_URL = "https://amaterus-gamify-2.hf.space/recommend";

export default function GameDetails() {
  const { name } = useParams();

  // Convert URL encoded game name
  const displayName = decodeURIComponent(name);

  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameName: displayName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Backend connection failed.");
        return res.json();
      })
      .then((data) => {
        // ✅ Updated to match the FastAPI response format: { recommendations: [...] }
        if (data && Array.isArray(data.recommendations)) {
          setRecommended(data.recommendations);
        } else {
          setRecommended([]);
        }
      })
      .catch((err) => {
        console.error("Frontend Error:", err);
        setError("Something went wrong fetching recommendations.");
      })
      .finally(() => setLoading(false));
  }, [displayName]);

  return (
    <div className="bg-[#090d14] min-h-screen w-full text-white flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center w-full px-6 md:px-20 py-28">
        {/* TITLE - Stylized with Red Glow */}
        <h1 className="text-6xl valorant-font tracking-wide text-red-400 mb-4 text-center drop-shadow-[0_0_8px_#ff0000]">
          {displayName.toUpperCase()}
        </h1>

        {/* SUBTITLE - Purple Glow */}
        <h2 className="text-4xl valorant-font tracking-wide text-[#B026FF] mb-12 drop-shadow-[0_0_10px_#B026FF]">
          RECOMMENDED GAMES
        </h2>

        {/* LOADING STATE */}
        {loading && (
          <p className="text-lg opacity-70 mt-8 animate-pulse valorant-font text-[#a05ac9]">
            FINDING YOUR GAME...
          </p>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <p className="text-lg opacity-80 text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-500/50">
            {error}
          </p>
        )}

        {/* RECOMMENDATION CARDS */}
        {!loading && !error && recommended.length > 0 ? (
          <div className="flex flex-col gap-10 w-full max-w-5xl">
            {recommended.map((title, index) => {
              const steamLink = `https://steamdb.info/search/?a=all&q=${encodeURIComponent(title)}`;

              return (
                <a
                  key={index}
                  href={steamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full
                    bg-[#121823]/70
                    border border-red-500
                    rounded-3xl
                    py-10 px-10
                    shadow-[0_0_25px_rgba(255,0,0,0.3)]
                    hover:shadow-[0_0_50px_rgba(255,0,0,0.6)]
                    backdrop-blur-xl
                    transition-all duration-300
                    cursor-pointer
                    flex justify-start
                    items-center
                    group
                  "
                >
                  <h3 className="text-3xl valorant-font tracking-wide text-red-400 group-hover:text-red-300 transition-colors">
                    {title}
                  </h3>
                </a>
              );
            })}
          </div>
        ) : (
          !loading && !error && (
            <p className="text-lg opacity-50 mt-8 valorant-font">
              NO RECOMMENDATIONS FOUND IN DATABASE.
            </p>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}