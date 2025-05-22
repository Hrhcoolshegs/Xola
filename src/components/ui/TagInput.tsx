import { useState, useRef, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

interface TagInputProps {
  label: string;
  value: string[];
  suggestions: string[];
  placeholder?: string;
  onChange: (values: string[]) => void;
  onAddCustom?: (value: string) => void;
}

export const TagInput = ({
  label,
  value,
  suggestions,
  placeholder = 'Type to search or add new...',
  onChange,
  onAddCustom
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      if (!value.includes(inputValue)) {
        onChange([...value, inputValue]);
        if (onAddCustom && !suggestions.includes(inputValue)) {
          onAddCustom(inputValue);
        }
      }
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemove = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!value.includes(suggestion)) {
      onChange([...value, suggestion]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="relative">
        <div className="flex flex-wrap gap-2 p-2 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#0073b9] focus-within:border-transparent min-h-[42px]">
          {value.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
              className="flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => handleRemove(tag)}
                className="ml-1 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="flex-1 min-w-[200px] outline-none bg-transparent"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={value.length === 0 ? placeholder : ''}
          />
        </div>

        {showSuggestions && inputValue && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredSuggestions.length > 0 ? (
              <ul className="py-1">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-sm text-gray-500">
                <p>No matches found.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  icon={<Plus size={16} />}
                  onClick={() => {
                    if (inputValue.trim()) {
                      handleSuggestionClick(inputValue.trim());
                      if (onAddCustom && !suggestions.includes(inputValue.trim())) {
                        onAddCustom(inputValue.trim());
                      }
                    }
                  }}
                >
                  Add "{inputValue}"
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};