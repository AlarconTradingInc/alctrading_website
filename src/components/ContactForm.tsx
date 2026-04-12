"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail, type FormState } from "@/app/(site)/actions/sendEmail";
import toast from "react-hot-toast";

const initialState: FormState = {
    success: false,
};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
            const form = document.getElementById("contact-form") as HTMLFormElement;
            if (form) form.reset();

            if (typeof window !== "undefined" && typeof (window as any).gtag_report_conversion === "function") {
                (window as any).gtag_report_conversion();
            }
        } else if (state.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form id="contact-form" action={formAction} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
                    <input name="name" type="text" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" required disabled={isPending} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Organization</label>
                    <input name="organization" type="text" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" disabled={isPending} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">E-mail</label>
                    <input name="email" type="email" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" required disabled={isPending} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input name="phone" type="tel" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" disabled={isPending} />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address Line</label>
                <input name="address" type="text" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" disabled={isPending} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                    <input name="city" type="text" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" disabled={isPending} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">State</label>
                    <input name="state" type="text" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" disabled={isPending} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Zip</label>
                    <input name="zip" type="text" className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" disabled={isPending} />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea name="subject" rows={4} className="w-full bg-white text-slate-900 border border-slate-300 px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-none" required disabled={isPending}></textarea>
            </div>

            <div className="pt-2">
                <button type="submit" disabled={isPending} className="w-full bg-gradient-to-b from-brand-light to-brand-primary text-white font-bold py-4 uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-brand-primary transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    {isPending ? "Sending Inquiry..." : "Submit Inquiry"}
                </button>
            </div>
        </form>
    );
}
