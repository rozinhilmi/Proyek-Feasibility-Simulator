import { extendTheme } from "@chakra-ui/react";

const currentTheme = () => {
  try {
    return JSON.parse(localStorage.currentTheme);
  } catch (error) {
    localStorage.currentTheme = true;
    return true;
  }
};

export const primaryColor = () => {
  return "#42AA58";
};

export const secondaryColor = () => {
  return "#FF9228";
};
export const backgroundColor = () => {
  if (currentTheme()) {
    return "#1B2627";
  } else {
    return "#F8F9FA";
  }
};
export const primaryTextColor = () => {
  if (currentTheme()) {
    return "#FFFFFF";
  } else {
    return "#2D3748";
  }
};
export const primaryTextTitleColor = () => {
  return "rgb(55, 158, 104)";
};
export const secondaryTextColor = () => {
  // return "#FF9228";
  return "#A0AEC0";
};

export const backgroundContainer = () => {
  if (currentTheme()) {
    return "#202C2D";
  } else {
    return "#FFFFFF";
  }
};
export const backgroundContainer2 = () => {
  if (currentTheme()) {
    return "rgba(37, 53, 54, 1)";
  } else {
    return "rgba(233, 237, 247, 1)";
  }
};

export const selectedItem = () => {
  if (currentTheme()) {
    return "rgba(66, 170, 88, 0.05)";
  } else {
    // return "#E8F2EA";
    return "#F8F9FA";
  }
  // return "#E8F2EA";
};
export const borderColor = () => {
  if (currentTheme()) {
    return "#2C3D3F";
  } else {
    return "#A0AEC0";
  }
};
export const customBorder = () => {
  if (currentTheme()) {
    return "1px solid #253536";
  } else {
    return "1px solid #E9EDF7";
  }
};
export const borderWhite = () => {
  return "1px solid #E9EDF7";
};
export const inputColor = () => {
  if (currentTheme()) {
    return "#FFFFFF";
  } else {
    return "#2D3748";
  }
};
export const inputBackgroundColor = () => {
  if (currentTheme()) {
    return "#1B2627";
  } else {
    return "#F8F9FA";
  }
};
export const primaryButtonColor = () => {
  return "#42AA58";
};

export const gradientColor = () =>
  "linear-gradient(90deg, #3EA955 50%, #D8F285 126.52%)";
export const borderRadius = () => "14px";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: "14px",
      },
    },
  },
  colors: {
    green: {
      500: "#42AA58",
    },
    red: {
      500: "rgba(221, 114, 114, 1)",
    },
  },
  fonts: {
    heading: "Lato",
    body: "Lato",
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: borderRadius(),
      },
      sizes: {
        md: {
          fontSize: "14px",
        },
      },
      defaultProps: {
        colorScheme: "green",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: borderRadius(),
        },
      },
      defaultProps: {
        focusBorderColor: primaryColor(),
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: borderRadius(),
        },
      },
      defaultProps: {
        focusBorderColor: primaryColor(),
      },
    },
    Modal: {
      defaultProps: {
        size: "xl",
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: "green",
      },
    },
  },
});
