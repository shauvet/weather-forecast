import React, { useState, useEffect, FC } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface Option {
  value: string;
  label: string;
}

interface AsyncSelectProps {
  placeholder?: string;
  onFocus?: () => void;
  debounceTimeout?: number;
  onChange: (value: Option | null) => void;
  loadOptions: (inputValue: string) => Promise<Option[]>;
  className?: string;
}

export const AsyncSelect: FC<AsyncSelectProps> = ({
  placeholder = '',
  onFocus,
  debounceTimeout = 300,
  onChange,
  loadOptions,
  className,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, debounceTimeout);

  useEffect(() => {
    if (debouncedSearchTerm) {
      loadOptions(debouncedSearchTerm).then((results) => {
        setOptions(results);
        setIsDropdownVisible(true);
      });
    } else {
      setOptions([]);
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchTerm, loadOptions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setInputValue(option.label);
    setIsDropdownVisible(false);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type='text'
        className='h-8 w-full sm:w-full mx-auto'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {isDropdownVisible && !!options.length && (
        <div className='absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded'>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className='cursor-pointer hover:bg-gray-200 p-2'
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
