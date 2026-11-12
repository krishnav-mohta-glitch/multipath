import React from 'react';
import type { DifficultyLevel } from '../../types/topic';
import type { SubjectId } from '../../types/subject';
import { SUBJECTS } from '../../data/subjects';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const variantClasses = {
    default: 'bg-brand-50 text-brand-700 border border-brand-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${sizeClasses} ${variantClasses} ${className}`}>
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
  return <Badge variant={variant}>{label}</Badge>;
};

export const SubjectBadge: React.FC<{ subjectId: SubjectId }> = ({ subjectId }) => {
  const subj = SUBJECTS.find((s) => s.id === subjectId);
  if (!subj) return <Badge variant="neutral">{subjectId}</Badge>;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${subj.color.bg} ${subj.color.text} border ${subj.color.border}`}>
      {subj.name}
    </span>
  );
};
