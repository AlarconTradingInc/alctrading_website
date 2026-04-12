"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Category = { name: string; slug: string };

export default function Navbar({ categories = [] }: { categories?: Category[] }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
    const pathname = usePathname();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        if (pathname === "/") {
            e.preventDefault();
            const target = document.getElementById(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                window.history.pushState(null, '', `/#${targetId}`);
            }
            setIsMobileMenuOpen(false);
        } else {
            setIsMobileMenuOpen(false);
        }
    };

    const productLinks = categories;

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">
                    <div className="flex-shrink-0 flex items-center relative z-20 w-[200px]">
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/logomain_transparent.png" alt="ALC Trading Logo" width={160} height={54} className="w-[140px] md:w-[160px] h-auto object-contain mix-blend-multiply" priority />
                        </Link>
                    </div>

                    {/* Desktop Menu - Centered */}
                    <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                        <div className="flex space-x-8 items-center pointer-events-auto">
                            <Link href="/#home" onClick={(e) => handleNavClick(e, 'home')} className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors">Home</Link>
                            <Link href="/#about" onClick={(e) => handleNavClick(e, 'about')} className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors">About Us</Link>

                            {/* Products Dropdown */}
                            <div className="relative group">
                                <Link href="/#products" onClick={(e) => handleNavClick(e, 'products')} className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-colors flex items-center gap-1">
                                    Products
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </Link>

                                {/* Dropdown Menu - appears on hover */}
                                <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-56 rounded-none shadow-lg bg-white border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                                    <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {productLinks.map((link) => (
                                            <Link key={link.name} href={link.slug} className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-light font-bold uppercase tracking-wider transition-colors border-b border-slate-100 last:border-0" role="menuitem">
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact - Right aligned */}
                    <div className="hidden md:flex flex-shrink-0 relative z-20 w-[200px] justify-end items-center">
                        <Link href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-gradient-to-b from-brand-light to-brand-primary text-white hover:from-white hover:to-white hover:text-brand-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors rounded-none shrink-0">Contact</Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden relative z-20">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:bg-slate-100 focus:text-slate-700 transition duration-150 ease-in-out"
                            aria-label="Main menu"
                            aria-expanded={isMobileMenuOpen ? "true" : "false"}
                        >
                            <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-7 w-7`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-slate-50 border-b border-slate-200 fixed top-20 left-0 right-0 w-full shadow-2xl z-40`}>
                <div className="px-2 pt-2 pb-3 sm:px-3 space-y-1">
                    <Link onClick={(e) => handleNavClick(e, 'home')} href="/#home" className="block px-4 py-4 rounded-none text-base font-bold text-slate-800 uppercase tracking-widest hover:text-brand-light hover:bg-slate-200 transition duration-150 ease-in-out border-b border-slate-200">
                        Home
                    </Link>
                    <Link onClick={(e) => handleNavClick(e, 'about')} href="/#about" className="block px-4 py-4 rounded-none text-base font-bold text-slate-800 uppercase tracking-widest hover:text-brand-light hover:bg-slate-200 transition duration-150 ease-in-out border-b border-slate-200">
                        About Us
                    </Link>

                    <div className="border-b border-slate-200">
                        <button
                            onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                            className="w-full flex justify-between items-center px-4 py-4 rounded-none text-base font-bold text-slate-800 uppercase tracking-widest hover:text-brand-light hover:bg-slate-200 transition duration-150 ease-in-out"
                        >
                            Products
                            <svg className={`w-5 h-5 transform transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div className={`${isMobileProductsOpen ? 'block' : 'hidden'} bg-white px-2 py-2 space-y-1 shadow-inner`}>
                            {productLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.slug}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-brand-light hover:bg-slate-50 uppercase tracking-wider transition duration-150 ease-in-out border-l-4 border-slate-300 hover:border-brand-light ml-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link onClick={(e) => handleNavClick(e, 'contact')} href="/#contact" className="block px-4 py-4 bg-gradient-to-b from-brand-light to-brand-primary text-white text-base font-bold uppercase tracking-widest hover:from-white hover:to-white hover:text-brand-primary transition duration-150 ease-in-out text-center mt-2">
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}
