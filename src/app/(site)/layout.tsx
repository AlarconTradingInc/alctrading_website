import Image from "next/image";
import Link from "next/link";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Toaster } from "react-hot-toast";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarWrapper />
            <Toaster position="bottom-right" />

            <main className="flex-grow overflow-x-hidden">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-brand-light to-brand-primary text-white py-16 border-t-[6px] border-brand-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-stretch">
                        {/* Brand */}
                        <div className="text-left flex flex-col items-start justify-between h-full gap-4">
                            <div className="p-1 mb-2">
                                <Image src="/logomain_white_footer.png" alt="ALC Trading Logo" width={160} height={54} className="w-[140px] md:w-[160px] h-auto object-contain" priority />
                            </div>
                            <div>
                                <span className="font-bold text-2xl tracking-tighter text-white block mb-2">ALC TRADING INC.</span>
                                <p className="text-sm">&copy; 1998 &ndash; {new Date().getFullYear()} Alarcon Trading Inc. All rights reserved.</p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="text-left text-sm flex flex-col items-start justify-start space-y-3 h-full pt-12 md:pl-8">
                            <p className="font-bold text-white uppercase tracking-widest mb-4">Contact Info</p>
                            <p>309E 76TH ST SUITE 5FW<br />NEW YORK, NY 10021 USA</p>
                            <p>PHONE: +1 212 717 6039<br />FAX: +1 212 396 3460</p>
                            <p><a href="mailto:info@alctrading.com" className="hover:text-brand-light transition-colors">info@alctrading.com</a></p>
                        </div>

                        {/* Certifications */}
                        <div className="text-left text-sm flex flex-col items-start justify-between h-full">
                            <div className="flex flex-col items-start">
                                <p className="uppercase tracking-wider text-slate-300 mb-2">U.S. State Department (D.D.T.C) Registered</p>
                                <p className="uppercase tracking-wider text-slate-300">ISO 9001: 2015 Registered</p>
                                <div className="relative w-32 h-32 md:w-36 md:h-36">
                                    <Image
                                        src="/ISO9001.jpg"
                                        alt="ISO 9001:2015 Registered"
                                        fill
                                        sizes="(max-width: 768px) 128px, 144px"
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-mono text-white font-bold text-xl tracking-widest mt-2">CAGE: 1H9R6</p>
                            </div>
                        </div>
                    </div>

                    {/* Arty Digital Credit */}
                    <div className="pt-8 border-t border-brand-dark flex justify-center items-center">
                        <p className="text-sm flex items-center gap-2">
                            <span>Design & Developed by</span>
                            <a
                                href="https://www.artydigital.com.tr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-widest flex items-center gap-1 group"
                            >
                                Arty Digital
                                <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">→</span>
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
