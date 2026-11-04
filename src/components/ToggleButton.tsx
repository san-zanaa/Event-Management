
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const ToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-11" />;
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun
        size={17}
        className={!isDark ? "text-amber-500" : "text-gray-400"}/>

      <Switch
        checked={isDark}
        onCheckedChange={(checked) =>
          setTheme(checked ? "dark" : "light")
        }
        aria-label="Toggle dark mode"
        className="data-[state=checked]:bg-cyan-600 data-[state=unchecked]:bg-gray-300"/>

      <Moon
        size={17}
        className={isDark ? "text-cyan-500" : "text-gray-400"}/>
    </div>
  );
};

export default ToggleButton;
