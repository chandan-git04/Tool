import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Mic, Send, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useVoiceRecognition } from "@/hooks/use-voice-recognition";
import DataSourceSelector from "./data-source-selector";
interface SearchInterfaceProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function SearchInterface({ isLoading, setIsLoading }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { 
    isListening, 
    startListening, 
    stopListening, 
    transcript,
    isSupported 
  } = useVoiceRecognition();

  // Update query when voice transcript changes
  if (transcript && transcript !== query) {
    setQuery(transcript);
  }

  const submitQueryMutation = useMutation({
    mutationFn: async (queryData: { query: string; isVoiceInput: boolean; dataSources: string[] }) => {
      const response = await apiRequest("POST", "/api/queries", {
        sessionId: 1, // Default session
        query: queryData.query,
        isVoiceInput: queryData.isVoiceInput,
        dataSources: queryData.dataSources,
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Query processed successfully",
        description: "Your question has been analyzed by REG AI Insight.",
      });
      setQuery("");
      queryClient.invalidateQueries({ queryKey: ["/api/queries"] });
    },
    onError: (error) => {
      toast({
        title: "Error processing query",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/queries");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "History cleared",
        description: "All chat history has been cleared successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/queries"] });
    },
    onError: () => {
      toast({
        title: "Error clearing history",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const exportChatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reg-ai-insight-export.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onSuccess: () => {
      toast({
        title: "Export successful",
        description: "Your chat history has been downloaded.",
      });
    },
    onError: () => {
      toast({
        title: "Export failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
   if (!query.trim()) {
      toast({
        title: "Empty query",
        description: "Please enter a question to search.",
        variant: "destructive",
      });
      return;
    }

    if (selectedDataSources.length === 0) {
      toast({
        title: "No data sources selected",
        description: "Please select at least one data source to search.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    submitQueryMutation.mutate({
      query: query.trim(),
      isVoiceInput: false,
      dataSources: selectedDataSources,
    });
    
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setQuery("");
    }
  };

  const toggleVoice = () => {
    if (!isSupported) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your chat history?')) {
      setIsLoading(true);
      clearHistoryMutation.mutate();
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleExportChat = () => {
    setIsLoading(true);
    exportChatMutation.mutate();
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="mb-8">
      {/* Data Source Selection */}
      <DataSourceSelector onDataSourceChange={setSelectedDataSources} />
      {/* Main Search Box */}
      <div className="relative mb-6">
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl search-shadow hover:search-shadow-hover transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary border border-slate-200 dark:border-slate-700">
          <Input
            type="text"
            placeholder="Ask anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-6 py-5 text-lg bg-transparent rounded-2xl border-0 focus-visible:ring-0 pr-32"
            disabled={isLoading}
          />
          
          {/* Right Side Controls */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            
            {/* Microphone Button with Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoice}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    isListening 
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  disabled={isLoading}
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isListening ? 'Stop voice mode' : 'Use voice mode'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Send Button */}
            <Button
              onClick={handleSubmit}
              disabled={!query.trim() || isLoading}
              className="p-3 bg-primary hover:bg-primary-dark rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="ghost"
          onClick={handleClearHistory}
          disabled={isLoading}
         className="flex items-center space-x-2 px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
        >
          <Trash2 className="w-5 h-5" />
          <span>Clear History</span>
        </Button>

        <Button
          variant="ghost"
          onClick={handleExportChat}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          <span>Export Chat</span>
        </Button>
      </div>
    </div>
  );
}
