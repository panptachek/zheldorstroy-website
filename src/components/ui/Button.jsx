export function Button({ children, variant = 'solid' }) {
  const ghost = variant === 'ghost';

  return (
    <button
      type="button"
      className="btn"
      style={{
        background: ghost ? 'transparent' : 'linear-gradient(90deg, var(--primary-red-900), var(--primary-red-500))',
        border: ghost ? '1px solid rgba(255,255,255,.35)' : '1px solid rgba(255,255,255,.15)'
      }}
    >
      {children}
    </button>
  );
}
