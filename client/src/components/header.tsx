import { Lightbulb, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";

export default function Header() {
    const { theme, toggleTheme } = useTheme();
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">REG AI Insight</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Intelligent Search & Analysis</p>
            </div>
          </div>
          
          {/* Theme Toggle and User Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </Button>

            {/* User Profile Section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Chandan Panigrahi</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Java developer</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">CP</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
