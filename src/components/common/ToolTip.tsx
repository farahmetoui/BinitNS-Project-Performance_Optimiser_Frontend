function Tooltip({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
      <div className="relative group flex items-center cursor-pointer">
        
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          {text}
        </span>
      </div>
    );
  }