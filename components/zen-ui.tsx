import "@/assets/tailwind.css";
import { useState } from "react";

function ZenUI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchQuery.trim()) {
        setError("Please enter a search term");
        return;
      }
      setError("");
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        searchQuery
      )}`;
      window.location.href = searchUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] font-roboto flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700 text-zinc-50">
      <h1 className="text-[32px] font-light mb-[24px] text-center tracking-wide">
        What are you curious about?
      </h1>
      <div className="w-full max-w-[672px] px-[16px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onKeyDown={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-[24px] py-[16px] text-[16px] rounded-full border border-zinc-600 bg-zinc-700 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all"
        />
        {error && (
          <div
            className="text-red-500 mt-[16px] text-[14px] text-center transition-opacity opacity-100 duration-300"
            role="alert"
            id="error-message"
            aria-live="assertive"
          >
            <span className="mr-2">&#9888;</span> {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ZenUI;
