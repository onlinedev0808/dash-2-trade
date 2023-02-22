import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import SelectBox from "./common/SelectBox";

const address = "0x69";

interface IWatchlist {
  id: number | string;
  lablel: string;
}

const WatchlistsCRUDTest = () => {
  const tokens = [
    { label: "Token1" },
    { label: "Token2" },
    { label: "Token3" },
    { label: "Token4" },
    { label: "Token5" },
  ];

  const [token, setToken] = useState(tokens[0]);

  const [watchlist, setWatchlist] = useState<IWatchlist>();
  const [watchlists, setWatchlists] = useState([]);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

  const loadWatchlists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`api/watchlist/${address}`);

      setWatchlists(response.data.watchlists.filter((item) => item));
    } catch (error) {
      setWatchlist(null);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWatchlists();
  }, []);

  const deleteWatchlist = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`api/watchlist/${address}`, { data: { id } });
      await loadWatchlists();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addWatchlist = async () => {
    if (!newName) return;
    setLoading(true);
    try {
      await axios.post(`api/watchlist/${address}`, { name: newName });
      await loadWatchlists();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renameWatchlist = async () => {
    if (!name || !watchlist) return;
    setLoading(true);
    try {
      await axios.post(`api/watchlist/${address}`, { id: watchlist.id, name });
      await loadWatchlists();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteTokenFromWatchlist = async (item) => {
    setLoading(true);
    try {
      await axios.delete(`api/watchlist/token`, {
        data: {
          address,
          id: watchlist.id,
          tokens: [item],
        },
      });
      await loadWatchlists();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addTokenToWatchlist = async () => {
    if (!watchlist) return;
    setLoading(true);
    try {
      await axios.post(`api/watchlist/token`, {
        address,
        id: watchlist.id,
        token: token.label,
      });
      await loadWatchlists();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="">
      <div className="flex justify-center">{loading && "Loading..."}</div>
      <div className="flex justify-center gap-[10px]">
        <input
          type="text"
          className="rounded-[8px] border-[0.5px] border-[#C0C6C9] p-[10px] outline-0 text-sm leading-[12px] text-black"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button
          onClick={addWatchlist}
          className="text-white text-sm leading-[18px] px-[20px] py-[8px] bg-[#5366FF] hover:bg-highlight-button-primary rounded-[5px]"
        >
          Add New
        </button>
      </div>
      <div className="flex justify-center gap-[10px] m-[10px]">
        <input
          type="text"
          className="rounded-[8px] border-[0.5px] border-[#C0C6C9] p-[10px] outline-0 text-sm leading-1 text-black"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          onClick={renameWatchlist}
          className="text-white text-sm leading-[18px] px-[20px] py-[8px] bg-[#5366FF] hover:bg-highlight-button-primary rounded-[5px]"
        >
          Rename
        </button>
      </div>
      <div className="flex justify-center gap-[10px] m-[10px]">
        <SelectBox
          options={tokens}
          value={token}
          onChange={(value) => setToken(value)}
        />
        <button
          className="text-white text-sm leading-[18px] px-[20px] py-[8px] bg-[#5366FF] hover:bg-highlight-button-primary rounded-[5px]"
          onClick={addTokenToWatchlist}
        >
          Add
        </button>
      </div>
      <div className="flex w-100 flex-wrap justify-center">
        {watchlists.map((wl) => (
          <div
            onClick={() => {
              setWatchlist({ id: wl.id, lablel: wl.name });
              setName(wl.name);
            }}
            key={wl.id}
            className={`p-[10px] w-[300px] m-[10px] rounded-[10px] border-2 cursor-pointer ${
              watchlist && watchlist.id === wl.id
                ? "border-[#ff0000]"
                : "border-black"
            }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-base">{wl.name}</h1>
              <button
                onClick={() => {
                  deleteWatchlist(wl.id);
                }}
              >
                <FontAwesomeIcon icon={faXmark} className="w-[16px]" />
              </button>
            </div>
            <div className="mt-[10px] flex justify-center">
              {wl.Tokens &&
                wl.Tokens.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 rounded-[20px] p-[4px] border-black flex items-center m-[4px]"
                  >
                    {item}
                    <button
                      onClick={() => {
                        deleteTokenFromWatchlist(item);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="w-[10px] m-[5px]"
                      />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistsCRUDTest;
