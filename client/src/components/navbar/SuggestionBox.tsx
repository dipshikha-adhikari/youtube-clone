import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchType } from '../../../types';

const SuggestionBox = ({
  setShowSuggestionBox,
  showSuggestionBox,
  data,
}: any) => {
  

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [showSuggestionBox]);

  const handleClick = (e: MouseEvent) => {
    if (showSuggestionBox) {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLElement && !target.className.includes("search"))
        setShowSuggestionBox(false);
    }
  };

  if (!showSuggestionBox) return null;

  return (
      <div className={`grid font-semibold search_results absolute left-0 overflow-y-scroll max-h-[90vh] dark:bg-stone-900 p-2 sm:p-4 h-fit   gap-4 top-12 bg-white rounded-md w-full z-50 `}>
        {data !== undefined ? (
          data.items.map((s: SearchType) => {
            return (
              <Link
                to={`/results?search_query=${encodeURIComponent(
                  s.snippet.title
                )}`}
                key={s.etag}
                onClick={() => {
                  setShowSuggestionBox(false);
                }}
              >
                {s.snippet.title}
              </Link>
            );
          })
        ) : (
          <div className="text-center">No results found </div>
        )}
      </div>
  );
};

export default SuggestionBox;
