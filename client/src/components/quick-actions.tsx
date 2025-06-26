import { BarChart3, Search, Zap } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-medium text-slate-800">Data Analysis</h3>
        </div>
        <p className="text-sm text-slate-600">Analyze trends, patterns, and insights from your data</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
            <Search className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-medium text-slate-800">Smart Search</h3>
        </div>
        <p className="text-sm text-slate-600">Find information quickly with intelligent search</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-medium text-slate-800">AI Insights</h3>
        </div>
        <p className="text-sm text-slate-600">Get intelligent recommendations and insights</p>
      </div>
    </div>
  );
}
