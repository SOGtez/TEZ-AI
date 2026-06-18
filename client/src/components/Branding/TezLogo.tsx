import { cn } from '~/utils';

/**
 * TEZ✦ wordmark — matches the TEZ Creations brand lockup exactly:
 * Space Grotesk 700, letter-spacing 0.02em, "TEZ" in mint-white (#eaf2ec),
 * and the ✦ star (U+2726) in bright green (#4ade80). The "TEZ" text adapts to
 * a near-black tone in light mode for legibility; the star stays green.
 */
export default function TezLogo({ className = '' }: { className?: string }) {
  return (
    <span
      aria-label="TEZ AI"
      className={cn(
        'select-none whitespace-nowrap font-display font-bold tracking-[0.02em] text-[#0a0f0b] dark:text-[#eaf2ec]',
        className,
      )}
    >
      TEZ<span className="text-[#4ade80]">✦</span>
    </span>
  );
}
