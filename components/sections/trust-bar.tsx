"use client";



const partners = [
  { name: "Partner 1", id: "p1" },
  { name: "Partner 2", id: "p2" },
  { name: "Partner 3", id: "p3" },
  { name: "Partner 4", id: "p4" },
  { name: "Partner 5", id: "p5" },
  { name: "Partner 6", id: "p6" },
];

export default function TrustBar() {
  return (
    <section className="bg-bg py-16 border-y border-primary/5">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <p className="flex-shrink-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-primary/40">
            Trusted by industry leaders
          </p>
          
          <div className="relative w-full overflow-hidden lg:max-w-2xl">
            {/* Simple CSS marquee for mobile, static flex for lg */}
            <div className="flex animate-marquee items-center gap-12 lg:animate-none lg:justify-end">
              {[...partners, ...partners].map((partner, i) => (
                <div 
                  key={`${partner.id}-${i}`}
                  className="flex h-8 w-24 flex-shrink-0 items-center justify-center rounded bg-primary/5 grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100"
                >
                  <span className="text-[10px] font-bold text-primary italic uppercase tracking-tighter">Logo {partner.name.split(' ')[1]}</span>
                </div>
              ))}
            </div>
            
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent lg:hidden" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent lg:hidden" />
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @media (min-width: 1024px) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
