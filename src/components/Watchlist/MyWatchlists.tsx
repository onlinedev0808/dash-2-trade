/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";
import { RotatingSquare } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import CreateWatchlist from "./CreateWatchlist";
import RenameWatchlist from "./RenameWatchlist";

import { updateWatchlists } from "../../redux/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface IWatchlist {
  id: string;
  name: string;
  Tokens: any;
}

interface IWatchlistCardProps {
  watchlist: IWatchlist;
  renameWatchlist: (watchlist: IWatchlist) => void;
  deleteWatchlist: (watchlist: IWatchlist) => void;
}

const WatchlistCard: NextPage<IWatchlistCardProps> = ({
  watchlist,
  renameWatchlist,
  deleteWatchlist,
}) => {
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const colors = ["#E3507A", "#50E3C2", "#FFAD57", "#3EDEF6", "#5367FE"];
    const icons = ["red", "green", "yellow", "teal", "blue"];
    const i = Number(watchlist.id[watchlist.id.search(/[0-9]/)]) % 5; // Generate number from 0-4 from the uuid of the watchlist
    // console.log(watchlist.id);
    setColor(colors[i]);
    setIcon(icons[i]);
  }, [watchlist.id]);

  const handleClickEdit = () => {
    renameWatchlist(watchlist);
  };

  const handleClickDelete = () => {
    deleteWatchlist(watchlist);
  };
  return (
    <Link href={`watchlists/${watchlist.id}`}>
      <div className="bg-highlight dark:bg-highlight-dark flex flex-col border border-border-primary rounded-xl p-5 hover:scale-105 transition-all cursor-pointer">
        <div className="text-sm flex justify-between">
          <FontAwesomeIcon
            icon={faEdit}
            className="w-5 h-5 text-text-primary dark:text-text-primary-dark"
            onClick={(e) => {
              e.stopPropagation();
              handleClickEdit();
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="w-5 h-5 text-text-primary dark:text-text-primary-dark"
            onClick={(e) => {
              e.stopPropagation();
              handleClickDelete();
            }}
          />
        </div>
        <Image
          className="w-24 mb-10 mx-auto"
          src={`/watchlist icons/${icon}.svg`}
          alt="Watchlist icons"
          width={96}
          height={96}
        />
        <p className="text-text-primary dark:text-text-primary-dark text-center text-lg">
          {watchlist.name}
        </p>
        <p style={{ color }} className="text-center text-lg">
          {/* {watchlist.Tokens.length} */}
        </p>
      </div>
    </Link>
  );
};

interface INewWatchlistProps {
  newWatchlist: () => void;
}

const NewWatchlist: NextPage<INewWatchlistProps> = ({ newWatchlist }) => (
  <div
    onClick={newWatchlist}
    className="bg-highlight dark:bg-highlight-dark flex flex-col border border-border-primary rounded-xl p-5 cursor-pointer opacity-50 hover:opacity-100 hover:scale-105 transition-all justify-center"
  >
    <div className="mx-auto">
      <Image
        src="/watchlist icons/new.png"
        alt="watchlist icon"
        width={96}
        height={96}
      />
    </div>

    <p className="text-text-primary dark:text-text-primary-dark text-center text-lg my-auto">
      Create Watchlist
    </p>
  </div>
);

const MyWatchlists = () => {
  const emailAddress = useAppSelector((state) => state.user.email);
  const watchlists: IWatchlist[] = useAppSelector(
    (state) => state.user.watchlists
  );

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<IWatchlist>();

  const loadWatchlists = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/watchlist/${emailAddress}`);
      const watchlistsReceived = response.data.watchlists;

      dispatch(updateWatchlists(watchlistsReceived));
    } catch (error) {
      dispatch(updateWatchlists([]));
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadWatchlists();
  }, []);

  const renameWatchlist = (value: IWatchlist) => {
    setWatchlist(value);
    setIsRenameDialogOpen(true);
  };

  const deleteWatchlist = async (value: IWatchlist) => {
    setLoading(true);
    try {
      await axios.delete(`api/watchlist/${emailAddress}`, {
        data: { id: value.id },
      });
      await loadWatchlists();
    } catch (error) {
      dispatch(updateWatchlists([]));
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-foreground dark:bg-foreground-dark grid xl:grid-cols-4 2xl:grid-cols-5 gap-10 p-10 rounded-card">
      {loading ? (
        <div className="flex flex-col text-text-primary dark:text-text-primary-dark text-center w-fit my-auto">
          <RotatingSquare ariaLabel="rotating-square" visible color="grey" />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {isDialogOpen && (
            <CreateWatchlist
              close={() => {
                setIsDialogOpen(false);
              }}
              emailAddress={emailAddress}
              loadWatchlists={loadWatchlists}
            />
          )}
          {isRenameDialogOpen && (
            <RenameWatchlist
              close={() => {
                setIsRenameDialogOpen(false);
              }}
              emailAddress={emailAddress}
              loadWatchlists={loadWatchlists}
              watchlist={watchlist}
            />
          )}
          {watchlists.map((item) => (
            <WatchlistCard
              key={uuidv4()}
              watchlist={item}
              renameWatchlist={renameWatchlist}
              deleteWatchlist={deleteWatchlist}
            />
          ))}
          <NewWatchlist
            newWatchlist={() => {
              setIsDialogOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default MyWatchlists;
