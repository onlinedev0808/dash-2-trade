import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";

import Drawer, { PositionEnum } from "../common/Drawer/Drawer";

interface IDropDownItem {
  id: number;
  title: string;
  description: string;
  time: string;
  tags?: string[];
  isRead: boolean;
}

interface IBadge {
  children: React.ReactNode;
}

const TYPES = {
  message: {
    id: 1,
    title: "message",
  },
  notification: {
    id: 2,
    title: "notification",
  },
  event: {
    id: 3,
    title: "event",
  },
};

const TagItem = ({ tag }) => {
  return (
    <span className="mx-1 bg-button-primary text-xs py-0.5 px-1 rounded">
      {tag}
    </span>
  );
};

const MessageItem = ({
  message,
  onChange,
}: {
  message: IDropDownItem;
  onChange: () => void;
}) => {
  const { id, title, description, time, tags, isRead } = message;

  const [isLoading, setIsLoading] = useState(false);
  const [read, setRead] = useState(isRead);

  const handleClick = async (messageId) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.put("/api/message/read", { id: messageId });
      setRead(true);
      onChange();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => setRead(isRead), [isRead]);

  return (
    <div
      className={`hover:opacity-80 text-text-primary dark:text-text-primary-dark group w-full p-4 border-b-1 border-background dark:border-background-dark cursor-pointer last:border-none ${
        read
          ? "bg-white dark:bg-foreground-dark"
          : "bg-highlight dark:bg-foreground-secondary-dark"
      }`}
    >
      <div className="flex justify-between overflow-hidden">
        <div className="flex flex-col pr-2">
          <p className="font-semibold pb-1">
            {title.length > 30 ? title.slice(0, 30) + "..." : title}
          </p>
          <p className="pl-2 text-sm">
            {description.length > 120
              ? description.slice(0, 120) + "..."
              : description}
          </p>
          {tags ? (
            <p className="my-2">
              {tags.map((tag, i) => (
                <TagItem tag={tag} key={i} />
              ))}
            </p>
          ) : null}
        </div>
        <div className="min-w-fit text-right text-text-secondary dark:text-text-secondary-dark text-sm whitespace-nowrap">
          {time}
        </div>
      </div>
      {!read && (
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs underline text-button-primary "
            onClick={handleClick.bind(null, id)}
          >
            {isLoading ? "..." : ""} Mark As Read
          </button>
        </div>
      )}
    </div>
  );
};

const convertTime = (t: number) => {
  const time = Math.floor((Date.now() - t) / 3600000);
  if (time < 1) return "Now";
  if (time < 24) return `${time} h ago`;
  if (time < 720) return `${Math.floor(time / 24)}d ago`;
  return `${Math.floor(time / 720)}m ago`;
};

const Badge = ({ children }: IBadge) => {
  return (
    <div className="absolute left-4 bottom-4 w-5 h-5 rounded-full bg-red text-white">
      {children}
    </div>
  );
};

const Message = ({ notification = false }) => {
  const messageType = notification ? TYPES.notification.id : TYPES.message.id;

  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(0);
  const [isInit, setIsInit] = useState(true);
  const initRef = useRef<any>(null);
  initRef.current = isInit;

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const msgText = (title: string) => (
    <div onClick={handleOpen}>
      {`There is a new ${notification ? "notification" : "message"}.`}
      <p className="pl-3 font-bold">{title}</p>
    </div>
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `/api/message/message?type=${messageType}`
      );

      if (!response?.data) return;

      const newS = response.data;

      const unreadCount = newS.filter(
        (item: any) => Boolean(item.is_read) === false
      ).length;

      setUnread(unreadCount);

      setMessages((s) => {
        if (newS[0]?.is_read || (!unreadCount && initRef.current)) return newS;
        if (JSON.stringify(s) !== JSON.stringify(newS)) {
          if (!notification) toast.success(msgText(newS[0].title));
          else toast.info(msgText(newS[0].title));
        }
        return newS;
      });

      if (initRef.current) setIsInit(false);
    } catch (error) {
      console.log(error);
    }
  }, [notification, messageType]);

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => fetchData(), 15000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleReadAll = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      await axios.put("/api/message/message", { typeId: messageType });
      setUnread(0);
      setMessages((messages) =>
        messages.map((message) => ({ ...message, is_read: true }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  /*useEffect(() => {
    const markAsRead = async () => {
      try {
        await axios.put("/api/message/read", { typeId: messageType });
        setUnread(0);
      } catch (error) {
        console.log(error);
      }
    };

    if (unread && isOpen) markAsRead();
  }, [isOpen, unread, messageType]);*/

  const handleMessageChange = () => {
    setUnread((oldState) => {
      if (oldState === 0) return oldState;
      return oldState - 1;
    });
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="relative flex w-full justify-center rounded-md text-sm text-text-primary dark:text-text-primary-dark hover:bg-opacity-30 focus:outline-none"
          onClick={handleOpen}
        >
          <FontAwesomeIcon
            icon={!notification ? faEnvelope : faBell}
            className="fa-regular w-6 h-6"
          />
          {unread ? <Badge>{unread}</Badge> : ""}
        </button>
      </div>
      <Drawer
        position={PositionEnum.Right}
        isOpen={isOpen}
        onClose={handleClose}
        className="bg-white dark:bg-foreground-dark w-[90%] md:w-[40%] lg:w-[30%]  xl:w-[20%]"
      >
        <div>
          <div className="flex items-center h-14 text-black dark:text-white px-6 justify-between">
            {notification ? "Notifications" : "Messages"}
            <button type="button" onClick={handleClose} className="underline">
              Close
            </button>
          </div>
          {unread ? (
            <button
              className="px-6 text-button-primary underline"
              type="button"
              onClick={handleReadAll}
            >
              Read All {isProcessing ? "..." : ""}
            </button>
          ) : null}
          <div className="px-1 py-1 text-base overflow-y-auto bg-background dark:bg-background-dark bg-opacity-50">
            {messages.length ? (
              messages.map((item, index) => (
                <MessageItem
                  key={item.id}
                  message={{
                    id: item.id,
                    time: convertTime(item.timestamp),
                    title: item.title,
                    description: item.description,
                    tags: item.tags?.split(";"),
                    isRead: item.is_read,
                  }}
                  onChange={handleMessageChange}
                />
              ))
            ) : (
              <p className="pl-5">No items to display</p>
            )}
          </div>
          <div className="flex items-center justify-center h-12 text-base text-black underline dark:text-white cursor-pointer">
            {notification ? "Go to notifications" : "Go to messages"}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Message;
