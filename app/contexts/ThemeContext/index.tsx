import React from "react";

type State = {
  darkMode: boolean;
};

type ThemeReducerType = "LIGHTMODE" | "DARKMODE";

export const ThemeContext = React.createContext<{ darkMode: boolean } | null>(
  null
);
export const ThemeContextDispatcher = React.createContext<React.Dispatch<{
  type: ThemeReducerType;
}> | null>(null);

const ThemeReducer = (state: State, { type }: { type: ThemeReducerType }) => {
  switch (type) {
    case "LIGHTMODE": {
      return { darkMode: false };
    }
    case "DARKMODE": {
      return { darkMode: true };
    }
    default: {
      throw Error(`Unknown type: ${type}`);
    }
  }
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const [theme, dispatch] = React.useReducer(ThemeReducer, {
    darkMode: darkThemeMq ? true : false,
  });

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeContextDispatcher.Provider value={dispatch}>
        {children}
      </ThemeContextDispatcher.Provider>
    </ThemeContext.Provider>
  );
}
