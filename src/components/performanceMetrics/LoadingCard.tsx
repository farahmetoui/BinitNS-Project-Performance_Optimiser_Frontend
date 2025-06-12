export const getLoadingCard = () => {
 return(
    
  <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm bg-black/20">
    <text>waiting to generate a report for you</text>
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-morgen animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-morgen animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-morgen animate-bounce [animation-delay:-.5s]"></div>
    </div>
  </div>

 )
};
