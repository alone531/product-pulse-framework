
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Search...",
  className,
  onSearch,
  value: externalValue,
  onChange,
}: SearchBarProps) {
  const [value, setValue] = useState(externalValue || "");
  const [isFocused, setIsFocused] = useState(false);

  // Handle controlled component
  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setValue("");
    if (onChange) {
      onChange("");
    }
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div
      className={cn(
        "relative group",
        className
      )}
    >
      <Search
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
          isFocused ? "text-primary" : "text-muted-foreground"
        )}
      />
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "pl-10 pr-8 bg-background transition-all h-10",
          isFocused && "border-primary ring-1 ring-primary/30"
        )}
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          type="button"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
    </div>
  );
}
