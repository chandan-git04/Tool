import { Lightbulb } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">REG AI Insight</h1>
              <p className="text-sm text-slate-500">Intelligent Search & Analysis</p>
            </div>
          </div>
          
          {/* User Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">John Smith</p>
              <p className="text-xs text-slate-500">Data Analyst</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-slate-600">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
