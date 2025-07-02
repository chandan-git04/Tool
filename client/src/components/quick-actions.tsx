import { BarChart3, Search, Zap } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-medium text-slate-800 dark:text-slate-200">Data Analysis</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Analyze trends, patterns, and insights from your data</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
            <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-medium text-slate-800 dark:text-slate-200">Smart Search</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Find information quickly with intelligent search</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-medium text-slate-800 dark:text-slate-200">AI Insights</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Get intelligent recommendations and insights</p>
      </div>
    </div>
  );
}
