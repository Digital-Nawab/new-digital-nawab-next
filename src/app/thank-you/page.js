export const metadata = {
  title: "Thank You | Digital Nawab - Digital Marketing Agency",
  description: "Thank you for getting in touch with Digital Nawab. Our team will contact you shortly.",
  robots: {
    index: false,
    follow: true,
  },
};

import Link from "next/link";
import { CheckCircle2, Phone, Mail, ArrowLeft, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#070512] text-white flex flex-col justify-center items-center px-4 py-16 sm:py-24 relative overflow-hidden selection:bg-[#e60067] selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#e60067]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        {/* Animated Checkmark Badge */}
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-tr from-[#e60067]/20 to-emerald-500/20 border border-emerald-500/30 mb-8 shadow-2xl shadow-emerald-500/20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-black stroke-[2.5]" />
          </div>
        </div>

        {/* Heading */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enquiry Received Successfully</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
          Thank You for Connecting with{" "}
          <span className="bg-gradient-to-r from-[#e60067] via-[#eb1c78] to-cyan-400 bg-clip-text text-transparent">
            Digital Nawab
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          We have received your enquiry. Our senior marketing & tech strategist is already reviewing your details and will get in touch with you within <span className="text-white font-semibold">24 hours</span>.
        </p>

        {/* Reassurance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Quick Response Guaranteed</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Our team typically responds in under 2 hours during active business hours.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">100% Confidential</h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">Your contact details and business requirements remain completely secure with us.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Immediate Assistance Box */}
        <div className="bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-slate-900/60 border border-pink-500/20 rounded-2xl p-6 mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">Need Immediate Assistance?</h4>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Feel free to call our direct customer helpline right now.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919936663337"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#e60067] hover:bg-[#d81b60] text-white text-sm font-bold shadow-md shadow-pink-600/30 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>+91 99366 63337</span>
            </a>
            <a
              href="mailto:wedigitalnawab@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white !text-slate-950 font-extrabold text-sm sm:text-base hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4 !text-slate-950 stroke-[2.5]" style={{ color: "#000000" }} />
            <span className="!text-slate-950 font-extrabold" style={{ color: "#000000" }}>Back to Home</span>
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
