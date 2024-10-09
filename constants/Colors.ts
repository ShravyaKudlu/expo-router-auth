type ColorsType = {
  light: {
    background: string;
    text: string;
    tint: string;
    separator: string; // Added separator color
  };
  dark: {
    background: string;
    text: string;
    tint: string;
    separator: string; // Added separator color
  };
};

const Colors: ColorsType = {
  light: {
    background: "#ffffff",
    text: "#000000",
    tint: "#6200ee",
    separator: "#dddddd", // Light gray for separator in light mode
  },
  dark: {
    background: "#000000",
    text: "#ffffff",
    tint: "#bb86fc",
    separator: "#444444", // Dark gray for separator in dark mode
  },
};

export default Colors;
