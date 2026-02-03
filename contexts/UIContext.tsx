
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;

  activeServiceId: string | null;
  openServiceDetail: (id: string) => void;
  closeServiceDetail: () => void;

  isAssessmentOpen: boolean;
  openAssessment: () => void;
  closeAssessment: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const openAssessment = () => setIsAssessmentOpen(true);
  const closeAssessment = () => setIsAssessmentOpen(false);

  const openServiceDetail = (id: string) => setActiveServiceId(id);
  const closeServiceDetail = () => setActiveServiceId(null);

  return (
    <UIContext.Provider value={{
      isBookingOpen,
      openBooking,
      closeBooking,
      activeServiceId,
      openServiceDetail,
      closeServiceDetail,
      isAssessmentOpen,
      openAssessment,
      closeAssessment
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
