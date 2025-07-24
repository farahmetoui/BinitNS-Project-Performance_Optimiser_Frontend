
  type UserDetails = {
    userName: string;  
    role: string;
 

};
export default function UserMetaCard({userName,role}: UserDetails) {
 

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-10 h-10 -mt-5 bg-morgen rounded-full flex items-center justify-center text-white font-medium">
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          }
                      </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {userName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {role}
                </p>
              
              </div>
            </div>

          </div>
        
        </div>
      </div>

    </>
  );
}
