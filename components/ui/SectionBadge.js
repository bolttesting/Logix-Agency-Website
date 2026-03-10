export default function SectionBadge({ children, center = false, animate = false }) {
  return (
    <div className={`inline-flex items-center gap-2 bg-[#0062a2]/10 border border-[#0062a2]/30 text-[#0062a2] font-bold uppercase text-xs tracking-widest px-4 py-2 rounded-full ${center ? 'mx-auto' : ''}`}>
      <span className={`w-2 h-2 bg-[#0062a2] rounded-full ${animate ? 'animate-pulse' : ''}`}></span>
      {children}
    </div>
  );
}
