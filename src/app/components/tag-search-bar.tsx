import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface TagSearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  availableTags: Tag[];
  placeholder?: string;
  className?: string;
}

export function TagSearchBar({
  value,
  onValueChange,
  selectedTags,
  onTagsChange,
  availableTags,
  placeholder = 'ค้นหา...',
  className = '',
}: TagSearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter tags based on search value
  const filteredTags = availableTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(value.toLowerCase()) &&
      !selectedTags.find((t) => t.id === tag.id)
  );

  const handleTagSelect = (tag: Tag) => {
    onTagsChange([...selectedTags, tag]);
    onValueChange('');
    setShowSuggestions(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  const handleTagRemove = (tagId: string) => {
    onTagsChange(selectedTags.filter((t) => t.id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredTags.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleTagSelect(filteredTags[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedIndex(-1);
    } else if (e.key === 'Backspace' && value === '' && selectedTags.length > 0) {
      // Remove last tag when backspace on empty input
      onTagsChange(selectedTags.slice(0, -1));
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input with Tags */}
      <div className="relative flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
        
        {/* Selected Tags */}
        <div className="flex flex-wrap items-center gap-1 flex-1">
          {selectedTags.map((tag) => (
            <div
              key={tag.id}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              style={
                tag.color
                  ? {
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      borderColor: `${tag.color}40`,
                    }
                  : undefined
              }
            >
              <span>{tag.name}</span>
              <button
                type="button"
                onClick={() => handleTagRemove(tag.id)}
                className="hover:bg-black/10 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onValueChange(e.target.value);
              setShowSuggestions(true);
              setFocusedIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={selectedTags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
          />
        </div>

        {/* Clear All Button */}
        {(selectedTags.length > 0 || value) && (
          <button
            type="button"
            onClick={() => {
              onTagsChange([]);
              onValueChange('');
            }}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Tag Suggestions Dropdown */}
      {showSuggestions && value && filteredTags.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">
              แท็ก
            </div>
            {filteredTags.map((tag, index) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagSelect(tag)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  index === focusedIndex
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tag.color || '#7BC9A6' }}
                />
                <span className="flex-1 text-left">{tag.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
