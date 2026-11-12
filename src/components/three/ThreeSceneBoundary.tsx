import React, { Component, type ReactNode } from 'react';

interface ThreeSceneBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  sceneName?: string;
}

interface ThreeSceneBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ThreeSceneBoundary extends Component<ThreeSceneBoundaryProps, ThreeSceneBoundaryState> {
  constructor(props: ThreeSceneBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ThreeSceneBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.warn(`[ThreeSceneBoundary] WebGL rendering error in ${this.props.sceneName || '3D Scene'}:`, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
