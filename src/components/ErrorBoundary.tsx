import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      let debugInfo = null;

      try {
        const parsed = JSON.parse(this.state.error?.message || "");
        if (parsed.error) {
          errorMessage = parsed.error;
          debugInfo = parsed;
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="fixed inset-0 z-[9999] bg-blue-600 text-white p-10 font-mono flex flex-col items-center justify-center text-center">
          <div className="text-9xl mb-8">:(</div>
          <h1 className="text-2xl mb-4 uppercase tracking-widest">System Error</h1>
          <p className="max-w-xl mb-8 opacity-80">
            Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
          </p>
          <div className="bg-black/20 p-6 rounded-lg text-left max-w-2xl w-full overflow-auto max-h-[40vh]">
            <p className="text-blue-200 font-bold mb-2">Stop Code: {errorMessage}</p>
            {debugInfo && (
              <pre className="text-[10px] opacity-60">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            )}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 border border-white/40 hover:bg-white/10 transition-colors rounded"
          >
            Restart Now
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
