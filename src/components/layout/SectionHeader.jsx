export default function SectionHeader({
  index,
  title,
  subtitle,
  darkMode,
}) {
  return (
    <div className="text-center mb-16">
      {index && (
        <div
          className={`inline-block text-xs tracking-[0.3em] mb-6 ${
            darkMode ? "text-white/50" : "text-gray-900/50"
          }`}
        >
          {index} —
        </div>
      )}

      <h2 className="text-5xl lg:text-6xl font-bold">{title}</h2>

      {subtitle && (
        <p
          className={`mt-5 text-lg max-w-2xl mx-auto ${
            darkMode ? "text-white/50" : "text-gray-900/50"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
