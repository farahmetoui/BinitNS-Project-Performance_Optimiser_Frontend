
interface LineBarProps {
    loadingdivRef: any;
    progressRingRef: any;
    percentageRef:any
  }

export default function Percentage ({ loadingdivRef, progressRingRef,percentageRef }: LineBarProps ){
    return(
        <div className="flex items-center justify-center ">
        <div className="relative">
            <div
                className="relative w-32 h-32 animate-spin"
                ref={loadingdivRef}
                style={{ animationDuration: "3s", animationDirection: "reverse" }}
            >
                <svg
                    className="absolute w-full h-full"
                    viewBox="0 0 120 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#fc3c61", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#ffd0d0", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    <circle
                        cx="60"
                        cy="60"
                        r="55"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="3"
                        fill="transparent"
                    />

                    <circle
                        ref={progressRingRef}
                        cx="60"
                        cy="60"
                        r="55"
                        stroke="url(#progress-gradient)"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray="345"
                        strokeDashoffset="345"
                    />
                </svg>
            </div>

            <span
                ref={percentageRef}
                className="absolute inset-0 flex items-center justify-center text-[#ff9696] font-bold text-lg"
            >
                0%
            </span>

            <div
                className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
            ></div>
        </div>
    </div>
    )
}