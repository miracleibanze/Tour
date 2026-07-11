"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white p-6 text-center">
          <h2 className="text-xl font-bold text-red-600">Map failed to load</h2>

          <p className="mt-3 text-sm text-gray-600">
            {this.state.error?.message}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full bg-primary px-5 py-2 text-white"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
