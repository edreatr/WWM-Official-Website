export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`py-24 sm:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
