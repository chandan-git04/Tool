import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Database, FileText, Link, ChevronDown, X } from "lucide-react";

interface DataSourceSelectorProps {
  onDataSourceChange: (selectedSources: string[]) => void;
}

export default function DataSourceSelector({ onDataSourceChange }: DataSourceSelectorProps) {
  const [selectedPrimarySources, setSelectedPrimarySources] = useState<string[]>([]);
  const [selectedSecondarySource, setSelectedSecondarySource] = useState<string>("");

  // Primary data sources (dropdown)
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
        {/* Primary Data Sources - Multi-Select Dropdown */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Primary Sources (Select multiple)
          </h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-left font-normal"
              >
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>
                    {selectedPrimarySources.length === 0
                      ? "Choose primary data sources..."
                      : `${selectedPrimarySources.length} source${selectedPrimarySources.length > 1 ? 's' : ''} selected`}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <div className="p-2 space-y-1">
                {primarySources.map((source) => {
                  const IconComponent = source.icon;
                  const isSelected = selectedPrimarySources.includes(source.id);
                  return (
                    <div
                      key={source.id}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                      onClick={() => handlePrimarySourceChange(source.id, !isSelected)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => {}} // Handled by parent click
                      />
                      <div className="flex items-center space-x-2 flex-1">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm font-medium">{source.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
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