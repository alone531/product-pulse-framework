
import { useState } from "react";
import { Check, Filter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterPopoverProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export default function FilterPopover({
  filters,
  selectedFilters,
  onFilterChange,
}: FilterPopoverProps) {
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>(selectedFilters);
  const [isOpen, setIsOpen] = useState(false);

  const totalActiveFilters = Object.values(selectedFilters).reduce(
    (count, items) => count + items.length,
    0
  );

  const handleSelectFilter = (groupId: string, optionId: string) => {
    setLocalFilters((prev) => {
      const updatedFilters = { ...prev };
      
      if (!updatedFilters[groupId]) {
        updatedFilters[groupId] = [];
      }
      
      if (updatedFilters[groupId].includes(optionId)) {
        updatedFilters[groupId] = updatedFilters[groupId].filter(
          (id) => id !== optionId
        );
      } else {
        updatedFilters[groupId] = [...updatedFilters[groupId], optionId];
      }
      
      if (updatedFilters[groupId].length === 0) {
        delete updatedFilters[groupId];
      }
      
      return updatedFilters;
    });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  const cancelChanges = () => {
    setLocalFilters(selectedFilters);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "flex items-center h-10",
            totalActiveFilters > 0 && "border-primary/50 bg-primary/5 text-primary"
          )}
        >
          <Filter className="mr-2 h-4 w-4" />
          <span>Filter</span>
          {totalActiveFilters > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-primary text-primary-foreground font-normal py-0 px-1.5 h-5"
            >
              {totalActiveFilters}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filters</h3>
            {Object.keys(localFilters).length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={resetFilters}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div className="max-h-[350px] overflow-auto p-4 space-y-5">
          {filters.map((group) => (
            <div key={group.id} className="space-y-2">
              <h4 className="text-sm font-medium">{group.label}</h4>
              <div className="space-y-1">
                {group.options.map((option) => {
                  const isSelected = localFilters[group.id]?.includes(option.id);
                  
                  return (
                    <div 
                      key={option.id} 
                      className={cn(
                        "flex items-center space-x-2 p-1.5 text-sm rounded-md cursor-pointer",
                        isSelected
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50"
                      )}
                      onClick={() => handleSelectFilter(group.id, option.id)}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 border rounded flex items-center justify-center",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="p-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={cancelChanges}
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
