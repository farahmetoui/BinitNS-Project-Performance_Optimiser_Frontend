export const getWebVitalStyle = (name: string, value: number) => {
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
  
    if (goodCondition) return 'bg-success';
    if (avgCondition) return 'bg-yellow-200';
    return 'bg-morgen';
  };
  