export default function FullBleed({ children }) {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative mx-auto max-w-[2400px]">
        {children}
      </div>
    </div>
  );
}
