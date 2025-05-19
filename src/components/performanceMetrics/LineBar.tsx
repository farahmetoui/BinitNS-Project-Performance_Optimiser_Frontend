interface LineBarProps {
  treatedUrlIndex: number;
  urls: string[];
}

export default function LineBar({ treatedUrlIndex, urls }: LineBarProps) {
  return (
    <ol className="flex items-center w-full relative">
      {Array.from({ length: urls.length }).map((_, index) => {
        const isTreated = index <= treatedUrlIndex;
        const tooltip = urls[index] || `Step ${index + 1}`;

        return (
          <li
            key={index}
            className={`group relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
              isTreated
                ? "text-green-600 dark:text-green-500 after:border-green-100 dark:after:border-green-800"
                : "text-red-600 dark:text-red-500 after:border-red-100 dark:after:border-red-800"
            }`}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                isTreated
                  ? "bg-green-100 dark:bg-green-800"
                  : "bg-red-100 dark:bg-red-800"
              }`}
            >
              {isTreated ? (
                <svg
                  className="w-3.5 h-3.5 text-green-600 lg:w-4 lg:h-4 dark:text-green-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-morgen"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 010 5.656l-3.535 3.536a4 4 0 01-5.656-5.656l1.414-1.415
                     M10.172 13.828a4 4 0 010-5.656l3.535-3.536a4 4 0 015.657 5.657l-1.415 1.414"
                  />
                </svg>
              )}
            </span>

            <div className="absolute bottom-full mb-2 left-0 group-hover:flex hidden px-3 py-1 text-sm text-white bg-gray-800 rounded-md shadow-md z-10 max-w-[400px] w-max whitespace-pre-wrap break-words">
  {tooltip}
</div>
          </li>
        );
      })}
    </ol>
    
  );
}
