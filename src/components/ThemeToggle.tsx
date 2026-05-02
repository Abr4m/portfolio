import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full w-10 h-10 transition-colors hover:bg-primary/10"
      title="Toggle theme"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'} text-foreground`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'} text-foreground`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
