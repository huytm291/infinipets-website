import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounce from '@/hooks/use-debounce';

interface SearchCommandProps {
  placeholder?: string;
  onSearch: (query: string) => Promise<SearchResult[]>;
  onSelect: (item: SearchResult) => void;
}

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
}

export default function SearchCommand({ placeholder = 'Search...', onSearch, onSelect }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    onSearch(debouncedQuery)
      .then((res) => {
        setResults(res);
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery, onSearch]);

  // Mở command khi input focus
  const handleFocus = () => setIsOpen(true);
  // Đóng command khi click ra ngoài hoặc nhấn ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        ref={inputRef}
        type="search"
        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] dark:focus:ring-[#4ade80] transition"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        aria-label="Search"
        autoComplete="off"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute z-50 mt-2 w-full max-h-72 overflow-y-auto rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
            role="listbox"
          >
            {loading && (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400 select-none">Loading...</li>
            )}

            {!loading && results.length === 0 && query.trim() !== '' && (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400 select-none">No results found.</li>
            )}

            {!loading &&
              results.map((item) => (
                <li
                  key={item.id}
                  role="option"
                  tabIndex={0}
                  className="cursor-pointer px-4 py-3 hover:bg-[#14b8a6]/10 dark:hover:bg-[#4ade80]/20 transition rounded-lg"
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(item);
                      setIsOpen(false);
                      setQuery('');
                    }
                  }}
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</p>
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{item.description}</p>
                  )}
                </li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}