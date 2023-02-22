import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

import Select from "./Select";
import ModalWrapper from "../../common/ModalWrapper";
import { useAppDispatch } from "../../../redux/hooks";
import { updateWatchlists } from "../../../redux/reducers/UserSlice";
import Tooltip from "../../common/Tooltip";

const AddToWatchlist = ({
                          // isOpen,
                          close,
                          watchlists,
                          selectedToken,
                          email,
                        }) => {
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNewWatchlist, setIsNewWatchlist] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");

  const dispatch = useAppDispatch();

  const submit = async () => {
    setLoading(true);
    try {
      if ((isNewWatchlist || !selectedWatchlist) && !newWatchlistName) {
        toast.error("You must enter new watchlist name");
        return;
      }
      if (isNewWatchlist || !selectedWatchlist) {
        try {
          const response = await axios.post(`/api/watchlist/${email}`, {
            name: newWatchlistName,
            tokenId: selectedToken,
          });
          dispatch(updateWatchlists(response.data.watchlists));
          toast.success("Success");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }

        close();
        return;
      }

      const response = await axios.post(`/api/watchlist/token`, {
        address: email,
        id: selectedWatchlist.id,
        token: selectedToken,
      });

      if (response.data && !response.data.success) {
        toast.error("The token have been already added to the watchlist");
      } else {
        dispatch(updateWatchlists(response.data.watchlists));
        toast.success("Success");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    close();
  };

  return (
    <ModalWrapper onClick={close}>
      {/* <ToastContainer /> */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-background dark:bg-background-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark p-5 flex flex-col"
      >
        <div className="flex flex-row justify-between">
          <p className="text-lg mb-10">Add to Watchlist</p>
          <button className="h-fit" onClick={close}>
            <FontAwesomeIcon icon={faXmark} className="w-4" />
          </button>
        </div>
        <div className="flex items-end gap-x-5 mb-5 ">
          <div>
            <span className="text-sm mb-2 flex items-center gap-2">
              Watchlist
              <Tooltip
                message="If no watchlist with the matching name exists, it will be created"
                icon
              />
            </span>
            <Select
              selectedWatchlist={selectedWatchlist}
              setSelectedWatchlist={setSelectedWatchlist}
              watchlists={watchlists}
              setIsNewWatchlist={setIsNewWatchlist}
              setNewWatchlistName={setNewWatchlistName}
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="disabled:opacity-75 mx-auto bg-button-primary w-fit rounded py-2 px-10 h-[2.875rem] text-text-primary-dark"
          >
            Add
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddToWatchlist;
