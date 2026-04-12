import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { getAllCategories } from "@/lib/sanity";

export default async function Home() {
  let categories: { name: string; slug: string; desc: string }[] = [];
  try {
    const all = await getAllCategories();
    categories = all.map((c) => ({ name: c.title, slug: c.slug, desc: c.description }));
  } catch {
    // Sanity unavailable
  }
  return (
    <>
      {/* Home/Hero Section */}
      <section id="home" className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-brand-primary"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-lg md:text-xl font-medium tracking-[0.2em] text-slate-300 mb-4 uppercase">Welcome to alctrading.com</h2>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.1] mb-8 drop-shadow-lg">
            A Trusted Supply Partner for Military, Aerospace and Government Procurement
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-slate-200 font-light tracking-wide max-w-3xl mx-auto uppercase drop-shadow">
            OEM Parts • Chemicals • Metals • Parachute Materials • DualMirror II Fabrics
          </p>
          <div className="mt-12">
            <Link href="/#about" className="inline-block bg-white text-brand-primary font-bold px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-light hover:text-white transition-colors shadow-xl">Read More</Link>
          </div>
        </div>
      </section >

      {/* About Us Section */}
      < section id="about" className="py-24 bg-white relative" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl uppercase mb-4">About Us</h2>
            <div className="w-16 h-1 bg-gradient-to-b from-brand-light to-brand-primary mx-auto"></div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
              <p>
                Alarcon Trading Inc. is a U.S.-based supplier of military, aerospace, and specialized industrial products serving government agencies, defense contractors, and industrial partners worldwide. Through long-standing relationships with leading manufacturers, the company provides approved military specification parts, materials, and chemicals to government organizations in the United States and allied nations, particularly within NATO countries.
              </p>
              <p>
                Founded in 1998, Alarcon Trading Inc. was established to supply military components to government organizations within NATO countries. Over the years, the company has expanded its international supply network and developed strong partnerships supporting defense and industrial sectors across allied markets.
              </p>
              <p>
                Through decades of experience and close collaboration with manufacturers, Alarcon has developed expertise in strategic supply categories including metals, chemicals, parachute spare parts, and specialized technical materials used in demanding operational environments. These capabilities allow the company to support complex procurement requirements for defense and government programs.
              </p>
              <p>
                In addition to traditional military supply operations, Alarcon Trading provides access to advanced thermal protection materials and high-temperature technical fabrics designed for extreme heat and hazardous environments. These engineered materials are used in applications where radiant heat, molten metal exposure, and high-temperature conditions require specialized protection systems.
              </p>
              <p>
                These advanced aluminized and high-temperature fabrics are widely used in the production of molten metal protective apparel, proximity firefighting suits, high-temperature industrial safety equipment, and thermal protection systems used in aerospace and defense applications.
              </p>
              <p>
                Manufactured in the United States using specialized weaving, coating, and lamination technologies, these materials are engineered to meet internationally recognized performance standards, including ISO 11612 and NFPA heat and flame protection requirements. The materials are designed to provide enhanced radiant heat reflection, molten metal protection, and durability in demanding environments.
              </p>
              <p>
                With more than two decades of experience supporting government procurement programs and international defense supply chains, Alarcon Trading Inc. remains committed to delivering reliable sourcing, technical expertise, and high-quality materials for mission-critical applications worldwide.
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* Products Section */}
      <section id="products" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl uppercase mb-4">Our Products</h2>
            <div className="w-16 h-1 bg-gradient-to-b from-brand-light to-brand-primary mx-auto mb-4"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our comprehensive range of high-performance military and aerospace supplies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((product, idx) => (
              <Link href={`/products/${product.slug}`} key={idx} className="bg-white border border-slate-200 p-8 hover:shadow-xl hover:border-brand-primary transition-all group flex flex-col justify-between block relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[120px] -z-10 group-hover:bg-brand-primary/5 transition-colors"></div>
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-gradient-to-b from-brand-light to-brand-primary text-white flex items-center justify-center font-mono text-xl font-bold shadow-md">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide group-hover:text-brand-primary transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{product.desc}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-brand-primary transition-colors">
                  <span className="text-sm font-bold uppercase tracking-wider">View Details</span>
                  <span className="text-xl transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      < section id="contact" className="py-24 bg-white relative" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl uppercase mb-4">Contact Us</h2>
              <div className="w-16 h-1 bg-gradient-to-b from-brand-light to-brand-primary mb-8"></div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 bg-slate-100 text-brand-primary flex items-center justify-center text-sm font-bold font-mono">HQ</div>
                  <div className="ml-5 text-slate-600">
                    <p className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-1">Headquarters</p>
                    <p>309E 76TH ST SUITE 5FW</p>
                    <p>NEW YORK, NY 10021 USA</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 bg-slate-100 text-brand-primary flex items-center justify-center text-sm font-bold font-mono">PH</div>
                  <div className="ml-5 text-slate-600">
                    <p className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-1">Phone & Fax</p>
                    <p>PHONE: +1 212 717 6039</p>
                    <p>FAX: +1 212 396 3460</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 bg-slate-100 text-brand-primary flex items-center justify-center text-sm font-bold font-mono">EM</div>
                  <div className="ml-5 text-slate-600">
                    <p className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-1">Email</p>
                    <a href="mailto:info@alctrading.com" className="hover:text-brand-light transition-colors font-medium">info@alctrading.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-slate-50 p-8 sm:p-10 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">Send an Inquiry</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
