import Logo from "@/components/common/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[420px] bg-[#1a1d2e] flex-col justify-between p-10 shrink-0">
        <Logo variant="light" size="md" />

        <div>
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-bold leading-snug mb-3">
            Track every step of your job search
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Manage applications, schedule interviews, and monitor your pipeline — all in one place.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: "2.4k+", label: "Jobs tracked" },
              { value: "89%",   label: "Offer rate" },
              { value: "14d",   label: "Avg. to offer" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3">
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-5">
          <p className="text-gray-300 text-sm leading-relaxed italic">
            &ldquo;JobTracker helped me land my dream job at Google. I had 148 applications tracked and always knew exactly where I stood.&rdquo;
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
              DZ
            </div>
            <div>
              <p className="text-white text-xs font-medium">Denys Z.</p>
              <p className="text-gray-500 text-xs">Frontend Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        {children}
      </div>
    </div>
  );
}
