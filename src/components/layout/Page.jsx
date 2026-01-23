export default function Page({ children, className = "", locked = false }) {
  return (
    <div
      className={`
        min-h-screen w-full overflow-x-hidden
        font-sans transition-colors duration-500
        ${locked ? "h-screen overflow-hidden" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
