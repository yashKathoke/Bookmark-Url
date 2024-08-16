import { nanoid } from '@reduxjs/toolkit';
import React, { useState, useRef } from 'react';
import { Controller } from 'react-hook-form';

function SelectTag({ tags = [], control }) {
  const [filteredTags, setFilteredTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const suggestionsRef = useRef(null);

  const handleInputChange = (value) => {
    if (value) {
      const filtered = tags.filter((tag) =>
        tag.tag?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTags(filtered);
      setShowSuggestions(true);
      setCurrentFocus(-1);
    } else {
      setFilteredTags([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (value, onChange) => {
    onChange(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e, onChange) => {
    const suggestionElements = suggestionsRef.current?.querySelectorAll('li');
    if (suggestionElements) {
      if (e.keyCode === 40) { // Arrow Down
        setCurrentFocus((prev) => (prev + 1) % suggestionElements.length);
        e.preventDefault();
      } else if (e.keyCode === 38) { // Arrow Up
        setCurrentFocus((prev) => (prev - 1 + suggestionElements.length) % suggestionElements.length);
        e.preventDefault();
      } else if (e.keyCode === 13) { // Enter
        e.preventDefault();
        if (currentFocus > -1 && currentFocus < suggestionElements.length) {
          suggestionElements[currentFocus].click();
        }
      }
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full sm:w-auto">
      <Controller
        name="tag"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <input
              type="text"
              id="tag"
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                handleInputChange(e.target.value);
              }}
              onKeyDown={(e) => handleKeyDown(e, onChange)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              placeholder="Type to search or select a tag"
            />
            {showSuggestions && filteredTags.length > 0 && (
              <ul
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {filteredTags.map((tag, index) => (
                  <li
                    key={nanoid()}
                    onClick={() => {
                        
                        handleSelectSuggestion(tag.tag, onChange)}}
                    className={`cursor-pointer text-white px-3 py-2 hover:bg-gray-700 hover:text-white ${
                      index === currentFocus ? 'bg-gray-600' : ''
                    }`}
                  >
                    {tag.tag}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      />
    </div>
  );
}

export default SelectTag;
