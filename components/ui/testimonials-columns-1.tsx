
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../types";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, tag }, i) => (
                <div 
                  className="p-8 rounded-3xl border border-white/5 bg-zinc-900/50 shadow-xl shadow-purple-500/5 max-w-xs w-full backdrop-blur-sm" 
                  key={i}
                >
                  <div className="text-zinc-300 text-sm leading-relaxed italic">"{text}"</div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={44}
                      height={44}
                      src={image}
                      alt={name}
                      className="h-11 w-11 rounded-full border-2 border-purple-600 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold text-white text-sm tracking-tight leading-tight">{name}</div>
                      <div className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{tag}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
