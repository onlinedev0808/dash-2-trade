/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { DropdownArrow } from "../../CommonSvg";

const Option = ({
  watchlist = null,
  setSelectedWatchlist = null,
  setWatchlistName = null,
  selectedWatchlist = null,
  setIsNewWatchlist = null,
}) => {
  const handleOptionClick = () => {
    // timeout is used to prevent modal close
    setTimeout(() => {
      setIsNewWatchlist();
      setSelectedWatchlist(watchlist);
      setWatchlistName(watchlist.name);
    }, 150);
  };
  return (
    <li
      className={`relative cursor-pointer select-none py-2 pl-10 pr-4
                  text-text-primary dark:text-text-primary-dark
                `}
      onMouseDown={handleOptionClick}
      onTouchStart={handleOptionClick}
    >
      <span className="block truncate">{watchlist.name}</span>
      {selectedWatchlist && selectedWatchlist.id === watchlist.id ? (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary dark:text-primary-dark">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </li>
  );
};

const WatchlistSelect = ({
  selectedWatchlist,
  setSelectedWatchlist,
  watchlists,
  setIsNewWatchlist,
  setNewWatchlistName,
}) => {
  const [watchlistName, setWatchlistName] = useState("");
  const [watchlistList, setWatchlistList] = useState([...watchlists] || []);

  useEffect(() => {
    setWatchlistList(
      watchlists.filter((watchlist) => watchlist.name.includes(watchlistName))
    );
    setNewWatchlistName(watchlistName);
  }, [watchlistName, watchlists]);

  const [isWatchlistListOpened, setIsWatchlistListOpened] = useState(false);

  return (
    <div className="z-50 relative">
      <input
        className="border-1 border-solid border-border-primary h-[2.875rem] w-full text-sm rounded-lg px-3.5 bg-highlight dark:bg-selector outline-none placeholder:text-text-secondary placeholder:dark:text-text-secondary-dark"
        type="text"
        placeholder="Watchlist Name"
        value={watchlistName}
        onChange={(e) => {
          setWatchlistName(e.target.value);
        }}
        onFocus={() => setIsWatchlistListOpened(true)}
        onBlur={() =>
          setTimeout(() => {
            setIsWatchlistListOpened(false);
          }, 100)
        }
      />
      <span
        className={`absolute right-1 top-2 text-text-secondary dark:text-text-secondary-dark ${
          isWatchlistListOpened && "-scale-100"
        }`}
        onClick={() => {
          setIsWatchlistListOpened((prev) => !prev);
        }}
      >
        <DropdownArrow />
      </span>

      {isWatchlistListOpened && (
        <div>
          <ul
            className="absolute max-h-48 w-full mt-1 overflow-auto whitespace-normal
          rounded-md bg-highlight dark:bg-selector text-base
           shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {watchlistList.map((watchlist) => (
              <Option
                key={watchlist.id}
                watchlist={watchlist}
                setSelectedWatchlist={setSelectedWatchlist}
                setWatchlistName={setWatchlistName}
                selectedWatchlist={selectedWatchlist}
                setIsNewWatchlist={setIsNewWatchlist}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default WatchlistSelect;
