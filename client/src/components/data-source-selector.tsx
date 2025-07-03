import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, FileText, Link } from "lucide-react";

interface DataSourceSelectorProps {
  onDataSourceChange: (selectedSources: string[]) => void;
}

export default function DataSourceSelector({ onDataSourceChange }: DataSourceSelectorProps) {
  const [selectedPrimarySources, setSelectedPrimarySources] = useState<string[]>([]);
  const [selectedSecondarySource, setSelectedSecondarySource] = useState<string>("");

  // Primary data sources (checkboxes)
  const primarySources = [
    { id: "sierra", name: "Sierra", icon: Database },
    { id: "cree", name: "Cree", icon: Database },
    { id: "cslink", name: "CSLink", icon: Link }
  ];

  // Secondary data sources (dropdown)
  const secondarySources = [
    { id: "jira", name: "Jira" },
    { id: "confluence", name: "Confluence" },
    { id: "brd", name: "BRD" },
    { id: "fr", name: "FR" }
  ];

  const handlePrimarySourceChange = (sourceId: string, checked: boolean) => {
    let updatedSources;
    if (checked) {
      updatedSources = [...selectedPrimarySources, sourceId];
    } else {
      updatedSources = selectedPrimarySources.filter(id => id !== sourceId);
    }
    setSelectedPrimarySources(updatedSources);
    
    // Combine with secondary source
    const allSelected = selectedSecondarySource 
      ? [...updatedSources, selectedSecondarySource]
      : updatedSources;
    onDataSourceChange(allSelected);
  };

  const handleSecondarySourceChange = (sourceId: string) => {
    setSelectedSecondarySource(sourceId);
    
    // Combine with primary sources
    const allSelected = [...selectedPrimarySources, sourceId];
    onDataSourceChange(allSelected);
  };

  const clearSelection = () => {
    setSelectedPrimarySources([]);
    setSelectedSecondarySource("");
    onDataSourceChange([]);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="w-5 h-5" />
          Select Data Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Data Sources - Checkboxes */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Primary Sources (Select multiple)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {primarySources.map((source) => {
              const IconComponent = source.icon;
              return (
                <div
                  key={source.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Checkbox
                    id={source.id}
                    checked={selectedPrimarySources.includes(source.id)}
                    onCheckedChange={(checked) => handlePrimarySourceChange(source.id, checked as boolean)}
                  />
                  <label
                    htmlFor={source.id}
                    className="flex items-center space-x-2 text-sm font-medium cursor-pointer flex-1"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{source.name}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Data Sources - Dropdown */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Additional Source (Select one)
          </h4>
          <Select value={selectedSecondarySource} onValueChange={handleSecondarySourceChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose additional data source..." />
            </SelectTrigger>
            <SelectContent>
              {secondarySources.map((source) => (
                <SelectItem key={source.id} value={source.id}>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>{source.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Sources Summary */}
        {(selectedPrimarySources.length > 0 || selectedSecondarySource) && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              Selected Sources:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPrimarySources.map((sourceId) => {
                const source = primarySources.find(s => s.id === sourceId);
                return (
                  <span
                    key={sourceId}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                  >
                    {source?.name}
                  </span>
                );
              })}
              {selectedSecondarySource && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs rounded-full">
                  {secondarySources.find(s => s.id === selectedSecondarySource)?.name}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="mt-2 text-xs"
            >
              Clear Selection
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}