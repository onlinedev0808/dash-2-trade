import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NextPage } from "next";

import { updateWatchlists } from "../../../redux/reducers/UserSlice";
import { useAppDispatch } from "../../../redux/hooks";

import ModalWrapper from "../../common/ModalWrapper";

interface ICreateWatchlistProps {
  close: () => void;
  emailAddress: string;
  loadWatchlists?: () => void;
  tokenId?: number | string;
}

const CreateWatchlist: NextPage<ICreateWatchlistProps> = ({
  close,
  emailAddress,
  tokenId = "",
  // loadWatchlists
}) => {
  const [watchlistName, setWatchlistName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submit = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`/api/watchlist/${emailAddress}`, {
        name: watchlistName,
        tokenId,
      });
      dispatch(updateWatchlists(result.data.watchlists));
      // await loadWatchlists();
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
        className="bg-highlight dark:bg-highlight-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark p-5 flex flex-col"
      >
        <div className="flex flex-row gap-20">
          <p className="text-lg mb-10">Create Watchlist</p>
          <button className="h-fit" onClick={close}>
            <FontAwesomeIcon icon={faXmark} className="w-[1rem]" />
          </button>
        </div>
        <div className="mx-auto mb-5">
          <p className="text-sm mb-1">Name</p>
          <input
            onChange={(e) => {
              setWatchlistName(e.target.value);
            }}
            className="text-black px-2 py-1 rounded-lg shadow-lg border-1 border-indigo-600 ring-2 ring-indigo-600"
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="disabled:opacity-75 mx-auto bg-button-primary w-fit rounded py-2 px-10 text-white"
        >
          Add
        </button>
      </div>
    </ModalWrapper>
  );
};

export default CreateWatchlist;
