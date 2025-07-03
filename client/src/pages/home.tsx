import Header from "@/components/header";
import SearchInterface from "@/components/search-interface";
import QuickActions from "@/components/quick-actions";
import LoadingOverlay from "@/components/loading-overlay";
import QueryHistory from "@/components/query-history";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-4xl">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 dark:text-slate-200 mb-4">
              How can I help you today?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ask questions, analyze data, or explore insights with our intelligent search interface
            </p>
          </div>

          <SearchInterface isLoading={isLoading} setIsLoading={setIsLoading} />
          <QuickActions />
          {/* Query History */}
          <div className="mt-12">
            <QueryHistory />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Help</a>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <span>Powered by AI</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}
