type ColorsType = {
  light: {
    background: string;
    text: string;
    tint: string;
    separator: string; // Separator color
    primary: string; // Primary color
    secondary: string; // Secondary color
    error: string; // Error color
    warning: string; // Warning color
    success: string; // Success color
    info: string; // Info color
    hover: string; // Hover color
    focus: string; // Focus color
  };
  dark: {
    background: string;
    text: string;
    tint: string;
    separator: string; // Separator color
    primary: string; // Primary color
    secondary: string; // Secondary color
    error: string; // Error color
    warning: string; // Warning color
    success: string; // Success color
    info: string; // Info color
    hover: string; // Hover color
    focus: string; // Focus color
  };
};

const Colors: ColorsType = {
  light: {
    background: "#ffffff",
    text: "#000000",
    tint: "#6200ee",
    separator: "#dddddd", // Light gray for separator in light mode
    primary: "#6200ee", // Primary color
    secondary: "#03dac6", // Secondary color
    error: "#b00020", // Error color
    warning: "#fbc02d", // Warning color
    success: "#4caf50", // Success color
    info: "#2196f3", // Info color
    hover: "#f5f5f5", // Hover color
    focus: "#e0e0e0", // Focus color
  },
  dark: {
    background: "#000000",
    text: "#ffffff",
    tint: "#bb86fc",
    separator: "#444444", // Dark gray for separator in dark mode
    primary: "#bb86fc", // Primary color
    secondary: "#03dac6", // Secondary color
    error: "#cf6679", // Error color
    warning: "#ffb300", // Warning color
    success: "#81c784", // Success color
    info: "#64b5f6", // Info color
    hover: "#424242", // Hover color
    focus: "#616161", // Focus color
  },
};

export default Colors;
