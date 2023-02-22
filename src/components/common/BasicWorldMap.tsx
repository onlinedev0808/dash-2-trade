import { NextPage } from "next";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps";

import Flag from "./Flag";

interface IMarker {
  markerOffset: number;
  coordinates: [number, number];
  country?: string;
}

const WORLD_MAP_COLOR = "#73737380";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const BasicWorldMap: NextPage = () => {
  const markers: IMarker[] = [
    { markerOffset: 0, country: "China", coordinates: [104.1954, 35.8617] },
    {
      markerOffset: 0,
      country: "Canada",
      coordinates: [-116.907484, 57.254024],
    },
    { markerOffset: 0, country: "Germany", coordinates: [10.4515, 51.1657] },
  ];

  return (
    <div className="control-panel">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale: 155,
          rotate: [-20, 0, 0],
          center: [10, 10],
        }}
      >
        <Graticule stroke="transparent" />
        <Geographies
          geography={geoUrl}
          fill={WORLD_MAP_COLOR}
          stroke={WORLD_MAP_COLOR}
          strokeWidth={0.5}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>

        {markers.map(({ country, coordinates }) => (
          <Marker key={country} coordinates={coordinates}>
            <rect
              y="-8"
              x="-18"
              rx="5"
              ry="5"
              width="13"
              height="35"
              fill="white"
            />
            <Flag location={country} />
            <text
              x={28}
              y={13}
              fill="#000"
              fontSize={16}
              style={{ fontWeight: "600", fontSize: "15px" }}
            >
              {country}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default BasicWorldMap;
