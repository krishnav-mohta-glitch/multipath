import React from 'react';
import type { DifficultyLevel } from '../../types/topic';
import type { SubjectId } from '../../types/subject';
import { SUBJECTS } from '../../data/subjects';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'info' | 'outline' | 'lime';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';

  const variantClasses = {
    default: 'bg-[#19211C]/06 text-[#171C18] border border-[#19211C]/12',
    neutral: 'bg-[#E8EAE1] text-[#19211C] border border-[#19211C]/15',
    success: 'bg-[#C8F36B]/20 text-[#19211C] border border-[#C8F36B]/50 font-semibold',
    warning: 'bg-[#faeac3]/50 text-[#854d0e] border border-[#faeac3]',
    info: 'bg-[#CFDDD1] text-[#1D2A22] border border-[#8DA391]/40',
    outline: 'bg-transparent text-[#19211C] border border-[#19211C]/20',
    lime: 'bg-[#C8F36B] text-[#111714] font-bold shadow-xs',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-mono font-medium ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: DifficultyLevel }> = ({ difficulty }) => {
  const map: Record<DifficultyLevel, { variant: 'success' | 'info' | 'warning'; label: string }> = {
    Foundational: { variant: 'success', label: 'Foundational' },
    Intermediate: { variant: 'info', label: 'Intermediate' },
    Advanced: { variant: 'warning', label: 'Advanced' },
  };

  const { variant, label } = map[difficulty];
  return <Badge variant={variant} size="sm">{label}</Badge>;
};

export const SubjectBadge: React.FC<{ subjectId: SubjectId }> = ({ subjectId }) => {
  const subj = SUBJECTS.find((s) => s.id === subjectId);
  if (!subj) return <Badge variant="neutral" size="sm">{subjectId}</Badge>;

  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold bg-[#111714] text-[#F3F4EC] border border-[#19211C]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C8F36B]" />
      <span>{subj.name}</span>
    </span>
  );
};
