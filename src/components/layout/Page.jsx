export default function Page({ children, darkMode, locked }) {
  return (
    <div
      className={[
        "min-h-screen w-full transition-colors duration-300",
        darkMode ? "bg-black text-white" : "bg-white text-gray-900",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
