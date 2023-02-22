import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import { ColorsEnum } from "../../theme";

const geoUrl = "/data.json";
// "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const STATUSES = {
  0: "No data",
  1: "Permissive",
  2: "Contentious",
  3: "Contentious",
  4: "Hostile",
};

const PresaleWorldMap = () => {
  const [geoData, setGeoData] = useState([]);

  const ref = useRef(null);
  const [tooltipTitle, setTooltipTitle] = useState("Title");
  const [tooltipMessage, setTooltipMessage] = useState("Message");

  const [isActive, setIsActive] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const fetchGeoData = async () => {
    const result = await axios.get("/api/backend/map");
    setGeoData(result.data.data);
  };

  useEffect(() => {
    fetchGeoData();
  }, []);

  return (
    <div className="control-panel relative" data-tip="">
      <div className="absolute" ref={ref}>
        {isActive || isFixed ? (
          <div
            className="
        px-5 py-2
        text-sm
        text-text-primary dark:text-text-primary-dark whitespace-no-wrap bg-white dark:bg-black shadow-lg rounded-md
        "
          >
            <button
              className="tooltip-close absolute right-5 top-5 cursor-pointer text-lg leading-none"
              onClick={() => {
                setIsFixed(false);
              }}
            >
              &times;
            </button>
            <div className="pr-[6.25rem] whitespace-nowrap font-bold">
              {tooltipTitle}
            </div>
            <div>{tooltipMessage}</div>
            <div className="w-0 h-0 border-l-[0.625rem] border-l-transparent border-b-[0.75rem] border-b-white dark:border-b-black border-r-[0.625rem] border-r-transparent absolute bottom-0 translate-x-[50%] rotate-180 translate-y-[100%]" />
          </div>
        ) : null}
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
          rotate: [0, 0, 0],
          center: [10, 10],
        }}
      >
        <Graticule stroke="transparent" />
        {geoData.length > 0 && (
          <Geographies
            geography={geoUrl}
            fill="#CCCCCC"
            stroke="#ffffff"
            strokeWidth={0.5}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = geoData.find(
                  (s) => s.country === geo.properties.name
                );
                let fillingColour = "";

                if (typeof d !== "undefined") {
                  switch (d.status) {
                    case 0:
                    case "0":
                      fillingColour = ColorsEnum.Gray;
                      break;
                    case 1:
                    case "1":
                      fillingColour = ColorsEnum.MapGreen;
                      break;
                    case 2:
                    case "2":
                      fillingColour = ColorsEnum.MapYellow;
                      break;
                    case 3:
                    case "3":
                      fillingColour = ColorsEnum.MapOrange;
                      break;
                    case 4:
                    case "4":
                      fillingColour = ColorsEnum.MapRed;
                      break;
                    default:
                      fillingColour = ColorsEnum.Gray;
                  }
                }

                const showTooltip = (e) => {
                  const parentBox = document
                    .querySelector(".rsm-geographies")
                    .getBoundingClientRect();

                  setTooltipTitle(geo.properties.name);
                  setTooltipMessage(d?.status ? STATUSES[d.status] : "No data");

                  ref.current.style.top = `${e.clientY - parentBox.y - 60}px`;
                  ref.current.style.left = `${e.clientX - parentBox.x}px`;
                };

                const handleMouseEnter = (e) => {
                  if (isFixed) return;
                  setIsActive(true);
                  showTooltip(e);
                };

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillingColour}
                    onMouseEnter={handleMouseEnter}
                    onTouchStart={handleMouseEnter}
                    onClick={(e) => {
                      setIsFixed(true);
                      showTooltip(e);
                    }}
                    onMouseLeave={() => {
                      setIsActive(false);
                    }}
                    style={{
                      default: {
                        outline: "none",
                      },
                      hover: {
                        fill: ColorsEnum.Primary,
                        outline: "none",
                      },
                      pressed: {
                        fill: ColorsEnum.Primary,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
};

export default PresaleWorldMap;
