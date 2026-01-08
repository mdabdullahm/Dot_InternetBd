"use client";
import React from 'react';
import { motion } from 'framer-motion';
import offersData from './offersData.json';

export default function OffersPage() {
    return (
        <div className="min-h-screen bg-orange-100 text-slate-800 font-hind pb-24">

            {/* ১. হেডার সেকশন - অরেঞ্জ গ্রাডিয়েন্ট ওভারলেসহ */}
            <section className="relative h-[350px] lg:h-[450px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={offersData.header.bgImage}
                        alt="Offers Background"
                        className="w-full h-full object-cover"
                    />
                    {/* অরেঞ্জ থিমের সাথে মেলানো ওভারলে */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-orange-800/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-100"></div>
                </div>

                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl lg:text-8xl font-black mb-6 text-white font-poppins tracking-tighter uppercase drop-shadow-2xl">
                            {offersData.header.title}
                        </h1>
                        <p className="text-orange-50 text-lg lg:text-xl leading-relaxed font-medium opacity-90 drop-shadow-md">
                            {offersData.header.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ২. অফার কার্ড গ্রিড - হোয়াইট থিম */}
            <div className="container mx-auto px-6 lg:px-10 -mt-12 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offersData.offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            // কার্ড এখন সাদা এবং বর্ডার অরেঞ্জ-২০০
                            className="bg-white border border-orange-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(124,45,18,0.1)] flex flex-col group h-full"
                        >
                            {/* ইমেজ এরিয়া */}
                            <div className="relative h-52 sm:h-56 lg:h-64 w-full overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* ইমেজের ওপর হালকা শাইন */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            {/* কন্টেন্ট এরিয়া */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors font-hind leading-tight uppercase tracking-tight">
                                    {offer.title}
                                </h3>

                                {/* অরেঞ্জ এনিমেটেড আন্ডারলাইন */}
                                <div className="w-12 h-1 bg-orange-500 mb-6 group-hover:w-full transition-all duration-700 rounded-full"></div>

                                <p className="text-slate-600 text-base leading-relaxed mb-8 flex-grow line-clamp-3 font-hind font-medium">
                                    {offer.description}
                                </p>

                                {/* বাটন/লিংক */}
                                <div className="mt-auto">
                                    <a
                                        href={offer.link}
                                        className="bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-2xl font-black text-base flex items-center justify-center gap-2 group/btn transition-all duration-300 shadow-sm hover:shadow-orange-200"
                                    >
                                        <span className="uppercase tracking-wider text-xs font-poppins">Learn More</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-transform group-hover/btn:translate-x-1"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}