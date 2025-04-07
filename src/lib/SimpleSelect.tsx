import { useEffect, useRef, useState } from 'react';
import ChevronDown from './components/ChevronDown';
import './SimpleSelect.scss';

export interface Option {
  label: string;
  value: string;
  Icon?: React.ReactElement;
}

export interface SimpleSelectProps {
  options: Option[] | (() => Promise<Option[]>);
  multiple?: boolean;
  onChange?: (selected: Option | Option[]) => void;
  placeholder?: string;
  className?: string;
}

export default function SimpleSelect({
  options,
  multiple = false,
  onChange,
  placeholder = 'Select...',
  className = '',
  ...rest
}: SimpleSelectProps) {
  const [selected, setSelected] = useState<Option | Option[] | null>(
    multiple ? [] : null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [fetchedOptions, setFetchedOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof options === 'function') {
      setLoading(true);
      options()
        .then((fetched) => {
          setFetchedOptions(fetched);
          setError(null);
        })
        .catch(() => {
          setError('Failed to load options');
          setFetchedOptions([]);
        })
        .finally(() => setLoading(false));
    } else {
      setFetchedOptions(options);
    }
  }, [options]);

  const handleSelect = (option: Option) => {
    const newValue = multiple
      ? Array.isArray(selected)
        ? selected.some((o) => o.value === option.value)
          ? selected.filter((o) => o.value !== option.value)
          : [...selected, option]
        : [option]
      : option;

    setSelected(newValue);
    if (typeof onChange === 'function') onChange(newValue);
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((prev) =>
          prev < fetchedOptions.length - 1 ? prev + 1 : prev
        );

        if (scrollRef.current) {
          const itemHeight = 44;
          const scrollThreshold = 6 * itemHeight;
          if (
            scrollRef.current.scrollTop + scrollThreshold <
            (focusedIndex + 1) * itemHeight
          ) {
            scrollRef.current.scrollTop += itemHeight;
          }
        }

        e.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        if (scrollRef.current) {
          scrollRef.current.scrollTop -= 25;
        }
        e.preventDefault();
        break;
      case 'Enter':
        if (focusedIndex >= 0) handleSelect(fetchedOptions[focusedIndex]);
        setIsOpen(false);
        e.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        const foundIndex = fetchedOptions.findIndex((o) =>
          o.label.toLowerCase().startsWith(e.key.toLowerCase())
        );
        if (foundIndex !== -1) setFocusedIndex(foundIndex);
    }
  };

  return (
    <div
      ref={ref}
      className={`nx-simple-select ${isOpen ? 'open' : ''} ${className}`}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={0}
      {...rest}
    >
      {/* Selected Option(s) */}
      <div
        className={`selected ${
          Array.isArray(selected) && selected.length > 1 ? 'multiple' : ''
        }`}
      >
        {selected === null ||
        (Array.isArray(selected) && selected.length === 0) ? (
          <span className="placeholder">{placeholder}</span>
        ) : Array.isArray(selected) ? (
          selected.map((s) => (
            <div key={s.value}>
              {s.Icon}
              <span>{s.label}</span>
            </div>
          ))
        ) : (
          <div>
            {selected.Icon}
            <span>{selected.label}</span>
          </div>
        )}
      </div>

      {/* Select Icon */}
      <ChevronDown className="select-icon" />

      {/* Options */}
      {isOpen && (
        <div ref={scrollRef} className="options" role="listbox" tabIndex={0}>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            fetchedOptions.map((option, index) => (
              <div
                key={option.value}
                className={`option ${
                  optionIsSelected(selected, option) ? 'active' : ''
                } ${index === focusedIndex ? 'focused' : ''}`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={optionIsSelected(selected, option)}
              >
                {option.Icon && option.Icon}
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Helper Function to Check if an Option is selected
function optionIsSelected(selected: Option | Option[] | null, option: Option) {
  return Array.isArray(selected)
    ? selected.some((s) => s.value === option.value)
    : selected?.value === option.value;
}
