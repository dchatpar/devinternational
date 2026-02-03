import { ReactNode } from 'react';

export type SpanType = 4 | 6 | 8 | 12;

export interface BentoItem {
  id: string;
  span: SpanType;
  title: string;
  subtitle?: string;
  type: 'stat' | 'feature' | 'tool' | 'image' | 'list';
  content?: ReactNode;
  bgImage?: string;
  accent?: 'cyan' | 'emerald' | 'amber';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CRSFactor {
  id: string;
  label: string;
  maxPoints: number;
  currentPoints: number;
}