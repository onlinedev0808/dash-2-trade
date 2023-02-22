import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

import WatchlistSelect from "./WatchlistSelect";

const AddToWatchlist = ({
  isOpen,
  close,
  watchlists,
  selectedToken,
  email,
}) => {
  const [selectedWatchlist, setSelectedWatchlist] = useState(watchlists[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && watchlists.length) {
      setSelectedWatchlist(watchlists[0]);
    }
  }, [isOpen]);

  const submit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`api/watchlist/token`, {
        address: email,
        id: selectedWatchlist.id,
        token: selectedToken,
      });

      if (response.data && !response.data.success) {
        toast.error("The token have already added to the watchlist");
      } else {
        toast.success("Success");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    close();
  };

  return (
    <div
      onClick={close}
      className={`fixed top-0 left-0 w-[100%] h-[100%] z-50 bg-black/50 backdrop-blur-sm ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      {/* <ToastContainer /> */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-[#383838] rounded-xl my-auto mx-auto text-white p-5 flex flex-col"
      >
        <div className="flex flex-row gap-20">
          <p className="text-base mb-10">Add to Watchlist</p>
          <button className="h-fit" onClick={close}>
            <FontAwesomeIcon icon={faXmark} className="w-4" />
          </button>
        </div>
        <div className="mx-auto mb-5">
          <p className="text-base">Watchlist</p>
          <WatchlistSelect
            selectedWatchlist={selectedWatchlist}
            setSelectedWatchlist={setSelectedWatchlist}
            watchlists={watchlists}
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="disabled:opacity-75 mx-auto bg-[#5366FF] w-fit rounded py-2 px-10"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToWatchlist;
