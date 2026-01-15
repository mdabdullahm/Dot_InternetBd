"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickPayModal from './QuickPayModal'; 
import offersData from '@/app/offers/offersData.json'; 

const Navbar = () => {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const offerCount = offersData?.offers?.length || 0;

  // নেভিগেশন লিঙ্কগুলো
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'PRICING', href: '/pricing' },
    { name: 'COVERAGE', href: '/coverage' },
    { name: 'ERPY', href: '/erpy' },
    { name: 'PAY BILL', href: '/pay-bill' },
    { name: 'PAY SERVICE', href: '/pay-service' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <nav className="bg-[#070b14] text-white px-4 py-2 border-b border-orange-500/20 sticky top-0 z-[100] shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2">
          
          {/* ১. লোগো সেকশন */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="relative h-12 w-36 md:h-16 md:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/Navlogo/logo (2).png" 
                alt="Cyberlink Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ২. ডেক্সটপ মেনু (মাঝখানের লিঙ্কগুলো) */}
          <div className="hidden xl:flex items-center xl:gap-5 2xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              // "PAY BILL" এবং "PAY SERVICE" কে দুই লাইনে করার জন্য স্প্লিট লজিক
              const isStacked = link.name.includes("PAY");

              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-[13px] font-black tracking-tighter transition-all duration-300 hover:text-[#B8FA05] flex items-center text-center
                    ${isActive ? 'text-[#B8FA05]' : 'text-white'}
                    ${isStacked ? 'leading-[1.1] max-w-[50px]' : ''}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* ৩. OFFERS ব্যাজ */}
            <Link 
              href="/offers" 
              className={`relative flex items-center px-3 py-1.5 rounded-lg border transition-all group font-black text-[13px]
                ${pathname === '/offers' ? 'border-[#B8FA05] bg-[#B8FA05]/10 text-[#B8FA05]' : 'border-gray-800 bg-white/5 text-white'}
              `}
            >
              <span className="mr-2 uppercase tracking-tighter">OFFERS</span>
              {offerCount > 0 && (
                <span className="bg-[#E24A0E] text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full animate-pulse">
                  {offerCount}
                </span>
              )}
            </Link>
          </div>

          {/* ৪. রাইট সাইড বাটন সেকশন */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setIsPayModalOpen(true)}
              className="bg-[#FF4500] hover:bg-[#E24A0E] text-white px-5 py-3 rounded-2xl font-black text-[13px] uppercase shadow-lg active:scale-95 transition-all flex items-center leading-none text-center max-w-[80px]"
            >
              QUICK PAY
            </button>
            <Link 
              href="/selfcare" 
              className="border border-gray-600 hover:border-[#B8FA05] hover:text-[#B8FA05] text-white px-5 py-3 rounded-2xl font-black text-[13px] uppercase transition-all active:scale-95 whitespace-nowrap"
            >
              SELFCARE
            </Link>
          </div>

          {/* ৫. মোবাইল মেনু বাটন */}
          <div className="xl:hidden flex items-center gap-3">
             <button onClick={() => setIsPayModalOpen(true)} className="bg-orange-600 p-2 rounded-xl text-white">
                <Zap size={20} fill="currentColor" />
             </button>
             <button 
               className="p-1 text-[#B8FA05]"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
             </button>
          </div>
        </div>

        {/* মোবাইল স্লাইড মেনু */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[280px] bg-[#070b14] z-[150] shadow-2xl p-8 flex flex-col border-l border-white/5"
            >
              <div className="flex justify-end mb-8">
                <X onClick={() => setIsMobileMenuOpen(false)} className="text-white cursor-pointer" size={32} />
              </div>
              <div className="flex flex-col space-y-6 font-poppins uppercase tracking-wider text-sm font-black">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between ${pathname === link.href ? 'text-[#B8FA05]' : 'text-white'}`}
                  >
                    {link.name}
                    {pathname === link.href && <ChevronRight size={18} />}
                  </Link>
                ))}
                
                <Link href="/offers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-white">
                    OFFERS <span className="bg-[#E24A0E] px-2 py-0.5 rounded-full text-xs text-white">{offerCount}</span>
                </Link>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                  <button onClick={() => {setIsPayModalOpen(true); setIsMobileMenuOpen(false);}} className="w-full bg-[#FF4500] py-4 rounded-2xl text-white font-black">QUICK PAY</button>
                  <Link href="/selfcare" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 rounded-2xl border border-orange-600 text-orange-600 text-center font-black">SELFCARE</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* কুইক পে পপআপ */}
      <QuickPayModal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} />
    </>
  );
};

export default Navbar;