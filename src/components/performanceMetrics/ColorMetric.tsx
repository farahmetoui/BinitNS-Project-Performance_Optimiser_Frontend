export const getColorClass = (score: number | undefined) => {
  if (score === undefined || isNaN(score)) return 'bg-white';

  if (score >= 0.9) return 'bg-success';
  if (score >= 0.5) return 'bg-yellow-200';
  return 'bg-morgen';
};

