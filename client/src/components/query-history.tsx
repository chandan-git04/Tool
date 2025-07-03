import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { MessageCircle, Database, Mic } from "lucide-react";
import type { Query } from "@shared/schema";

export default function QueryHistory() {
  const { data: queries, isLoading } = useQuery<Query[]>({
    queryKey: ["/api/queries"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Recent Queries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!queries || queries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Recent Queries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No queries yet</p>
            <p className="text-sm">Start by asking a question using the search box above</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Recent Queries ({queries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {queries
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((query, index) => (
                <div key={query.id}>
                  <div className="space-y-3">
                    {/* Query Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Query #{query.id}
                          </span>
                          {query.isVoiceInput && (
                            <Badge variant="secondary" className="text-xs">
                              <Mic className="w-3 h-3 mr-1" />
                              Voice
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(query.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Data Sources */}
                    {query.dataSources && query.dataSources.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Database className="w-4 h-4 text-slate-500" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">Sources:</span>
                        {query.dataSources.map((source) => (
                          <Badge key={source} variant="outline" className="text-xs capitalize">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Question */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Question:
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {query.query}
                      </p>
                    </div>

                    {/* Response */}
                    {query.response && (
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Response:
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {query.response}
                        </p>
                      </div>
                    )}
                  </div>

                  {index < queries.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}