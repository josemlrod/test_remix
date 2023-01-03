import { Theme, useTheme } from "~/utils/themeProvider";

export default function ThemeToggler() {
  const [theme, setTheme] = useTheme();
  const icon = theme === Theme.LIGHT ? "🌞" : "🌝";

  const handleOnClick = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <div
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-800"
      onClick={handleOnClick}
    >
      <span className="sr-only">Change theme</span>
      {icon}
    </div>
  );
}
