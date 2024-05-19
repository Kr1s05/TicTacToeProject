export const Circle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="white"
      strokeWidth="10"
    />
  </svg>
);

export const X = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
  >
    <line x1="10" y1="10" x2="90" y2="90" stroke="white" strokeWidth="10" />
    <line x1="10" y1="90" x2="90" y2="10" stroke="white" strokeWidth="10" />
  </svg>
);
