import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Check } from 'lucide-react';

export const CRSCalculator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(300); // Base mock score

  const handleOptionSelect = (points: number) => {
    setScore(prev => prev + points);
    setStep(prev => prev + 1);
  };

  const reset = () => {
    setStep(0);
    setScore(300);
  };

  const steps = [
    {
      question: "What is your marital status?",
      options: [
        { label: "Single", points: 50 },
        { label: "Married", points: 40 },
      ]
    },
    {
      question: "What is your highest level of education?",
      options: [
        { label: "Bachelor's Degree", points: 110 },
        { label: "Master's Degree", points: 135 },
        { label: "PhD", points: 150 },
      ]
    },
    {
      question: "Years of Canadian work experience?",
      options: [
        { label: "None", points: 0 },
        { label: "1 Year", points: 40 },
        { label: "2+ Years", points: 80 },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-accent-cyan">
          <Calculator size={20} />
          <span className="text-sm font-mono tracking-wider">CRS ESTIMATOR</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          V.2.4
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step < steps.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-light text-white leading-tight">
                {steps[step].question}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleOptionSelect(opt.points)}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent-cyan/30 transition-all group text-left"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">{opt.label}</span>
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-cyan" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-accent-emerald/20 flex items-center justify-center mx-auto text-accent-emerald mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-gray-400 font-medium">Estimated Score</h3>
              <div className="text-6xl font-bold text-white tracking-tighter tabular-nums">
                {score}
              </div>
              <p className="text-sm text-gray-500 max-w-[80%] mx-auto">
                Based on 2026 draw cut-offs, you have a <span className="text-accent-emerald">High Probability</span> of receiving an ITA.
              </p>
              <button 
                onClick={reset}
                className="mt-6 text-xs text-gray-500 hover:text-white underline decoration-gray-700"
              >
                Recalculate
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-emerald"
            initial={{ width: 0 }}
            animate={{ width: `${((step) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};