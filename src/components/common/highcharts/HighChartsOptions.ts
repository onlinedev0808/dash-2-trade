export const THEME_BASE = {
  colors: ["#5367FE", "#68dab6"],
  chart: {
    backgroundColor: "transparent",
    style: {
      fontFamily: "Poppins, sans-serif",
    },
    marginRight: 40,
  },
  yAxis: {
    gridLineColor: "#737373",
  },
  title: {
    style: {
      color: "#FFFFFF80",
      fontSize: "1.125rem",
    },
  },
  subtitle: {
    style: {
      color: "#FFFFFF80",
      fontSize: "0.75rem",
    },
  },
  legend: {
    itemStyle: {
      font: "0.75rem",
      color: "#FFFFFF80",
    },
    itemHoverStyle: {
      color: "#FFFFFF80",
    },
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    style: {
      color: "#F0F0F0",
      fontWeight: "bold",
      fontSize: "0.875rem",
    },
  },
  plotOptions: {
    candlestick: {
      lineColor: null,
      upColor: "#68dab6",
      upLineColor: "#68dab6",
    },
    errorbar: {
      color: "white",
    },
  },
  exporting: {
    buttons: {
      contextButton: {
        symbolStroke: "white",
        theme: {
          fill: "#737373",
        },
      },
    },
  },
};

export const INITIAL_OPTIONS = {
  rangeSelector: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    shape: "square",
    headerShape: "callout",
    borderWidth: 0,
    shadow: false,
  },
};
