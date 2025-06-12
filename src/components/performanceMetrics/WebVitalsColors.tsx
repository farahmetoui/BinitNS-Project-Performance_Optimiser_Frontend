export const getWebVitalStyle = (name: string, value: number): { className: string; status: 'good' | 'needs-improvement' | 'poor' } => {
    const thresholds: Record<string, [number, number]> = {
      FCP: [1.8, 3.0],
      LCP: [2.5, 4.0],
      CLS: [0.1, 0.25],
      TBT: [200, 600],
      interactive: [3.8, 7.3],
      speedIndex: [3.4, 5.8],
      TTFB: [200, 600],
      FID: [100, 300],
    };
  
    const [good, average] = thresholds[name] || [0, 0];
  
    // Convert ms to seconds for specific metrics
    const convertToSeconds = ['interactive', 'speedIndex', 'FCP', 'LCP'];
    const valueInCorrectUnit = convertToSeconds.includes(name) ? value / 1000 : value;
  
    const isLowerBetter = ['CLS', 'TBT', 'FID', 'TTFB'].includes(name);
  
    const goodCondition = isLowerBetter
      ? valueInCorrectUnit <= good
      : valueInCorrectUnit <= good;
  
    const avgCondition = isLowerBetter
      ? valueInCorrectUnit <= average
      : valueInCorrectUnit <= average;
  if (goodCondition) {
     return {
      className: 'bg-green-100 text-green-800 border-green-200',
      status: 'good',
    };}
  if (avgCondition) {
    return {
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      status: 'needs-improvement',
    };
  }
   return {
    className: 'bg-red-100 text-red-800 border-red-200',
    status: 'poor',
  };
  };
  

  export const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100"
      case "needs-improvement":
        return "bg-yellow-100"
      case "poor":
        return "bg-red-100"
      default:
        return "bg-gray-200"
    }
  }
