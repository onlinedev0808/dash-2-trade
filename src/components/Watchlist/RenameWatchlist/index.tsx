import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ModalWrapper from "../../common/ModalWrapper";

const RenameWatchlist = ({
  close,
  emailAddress,
  loadWatchlists,
  watchlist,
}) => {
  const [watchlistName, setWatchlistName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!watchlist) return;
    setWatchlistName(watchlist.name);
  }, [watchlist]);

  const submit = async () => {
    setLoading(true);

    try {
      await axios.post(`/api/watchlist/${emailAddress}`, {
        id: watchlist.id,
        name: watchlistName,
      });
      await loadWatchlists();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    close();
  };

  return (
    <ModalWrapper onClick={close}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-highlight dark:bg-highlight-dark rounded-xl my-auto mx-auto text-white p-5 flex flex-col"
      >
        <div className="flex flex-row gap-20">
          <p className="text-lg mb-10">Rename Watchlist</p>
          <button className="h-fit" onClick={close}>
            <FontAwesomeIcon icon={faXmark} className="w-[1rem]" />
          </button>
        </div>
        <div className="mx-auto mb-5">
          <p className="text-sm">Name</p>
          <input
            onChange={(e) => {
              setWatchlistName(e.target.value);
            }}
            value={watchlistName}
            className="text-black px-2 py-1 rounded shadow-lg"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="disabled:opacity-75 mx-auto bg-button-primary w-fit rounded py-2 px-10"
        >
          Save
        </button>
      </div>
    </ModalWrapper>
  );
};

export default RenameWatchlist;
