export const getColorClass = (score: number | undefined) => {
  if (score === undefined || isNaN(score)) return 'bg-white';

  if (score >= 0.9) return 'bg-green-100 text-green-800 border-green-200';
  if (score >= 0.5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

