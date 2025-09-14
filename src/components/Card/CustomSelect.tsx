// components/Inputs/CustomSelect.tsx
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../Context/ThemeProvider";

type Option = {
  id: string;
  label: string;
};

interface CustomSelectProps {
  options: Option[];
  value: string; // selected id (or "")
  onChange: (id: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  position?:
    | "bottom"
    | "top"
    | "left"
    | "right"
    | "left-top"
    | "left-bottom"
    | "right-top"
    | "right-bottom"; // dropdown position
  blurEffect?: boolean; // apply blur effect on dropdown
}

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  disabled = false,
  position = "bottom",
  blurEffect = false,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // filter options by query
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  // current selected label
  const selected = options.find((o) => o.id === value) || null;

  // close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setHighlightIndex(0);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((x) => Math.min(x + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((x) => Math.max(x - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const opt = filtered[highlightIndex];
        if (opt) {
          onChange(opt.id);
          setOpen(false);
          setQuery("");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, highlightIndex, onChange]);
  let positionClasses = "";

  switch (position) {
    case "top":
      positionClasses = "md:bottom-full md:mb-2 md:left-0";
      break;
    case "bottom":
      positionClasses = "md:top-full md:mt-2 md:left-0";
      break;
    case "left":
      positionClasses = "md:right-full md:mr-2 md:top-1/2 md:-translate-y-1/2";
      break;
    case "right":
      positionClasses = "md:left-full md:ml-2 md:top-1/2 md:-translate-y-1/2";
      break;
    case "left-top":
      positionClasses = "md:right-full md:mr-2 md:top-0";
      break;
    case "left-bottom":
      positionClasses = "md:right-full md:mr-2 md:bottom-0";
      break;
    case "right-top":
      positionClasses = "md:left-full md:ml-2 md:top-0";
      break;
    case "right-bottom":
      positionClasses = "md:left-full md:ml-2 md:bottom-0";
      break;
    default:
      positionClasses = "md:top-full md:mt-2 md:left-0";
  }
  return (
    <>
      {open && blurEffect && (
        <div
          className={`absolute rounded-xl z-50 w-full top-0 left-0 h-full bg-black/5 backdrop-blur-sm `}
        />
      )}
      <div ref={rootRef} className={`relative ${className}`}>
        {/* Trigger */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => {
            if (disabled) return;
            setOpen((s) => !s);
            setTimeout(() => {
              // focus input when opened
              const input = rootRef.current?.querySelector("input");
              if (input) (input as HTMLInputElement).focus();
            }, 0);
          }}
          className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-customTeal transition ${
            disabled ? "opacity-60 cursor-not-allowed" : "hover:border-gray-600"
          }`}
        >
          <div className="flex flex-col items-start text-left">
            <span className="text-sm">
              {selected ? (
                selected.label
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </span>
          </div>

          <svg
            className={`w-5 h-5 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            } text-gray-300`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className={`absolute z-[99999] ${positionClasses} max-md:top-full max-md:mt-2 max-md:left-0 w-full`}
          >
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
              {/* Search */}
              <div className="p-2 border-b border-gray-800">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHighlightIndex(0);
                  }}
                  placeholder="Type to search..."
                  className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-customTeal"
                />
              </div>

              {/* Options list */}
              <ul
                role="listbox"
                aria-activedescendant={filtered[highlightIndex]?.id}
                className="max-h-56 overflow-auto  scrollbar-hide"
              >
                {filtered.length === 0 ? (
                  <li className="p-3 text-sm text-gray-400">No results</li>
                ) : (
                  filtered.map((opt, i) => {
                    const active = i === highlightIndex;
                    const selectedOpt = opt.id === value;
                    return (
                      <li
                        id={opt.id}
                        role="option"
                        key={opt.id}
                        aria-selected={selectedOpt}
                        onMouseEnter={() => setHighlightIndex(i)}
                        onClick={() => {
                          onChange(opt.id);
                          setOpen(false);
                          setQuery("");
                        }}
                        className={`flex items-center justify-between gap-3 p-3 cursor-pointer text-sm hover:bg-gray-800 ${
                          active ? "bg-gray-800" : ""
                        } ${
                          selectedOpt
                            ? "font-semibold text-customTeal"
                            : "text-white"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selectedOpt && (
                          <svg
                            className="w-4 h-4 text-customTeal"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 10L9 13L14 7"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomSelect;
