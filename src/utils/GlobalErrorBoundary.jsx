
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const GlobalErrorBoundary = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-center p-6 z-50">
              <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold mb-2">Oops! Something went wrong.</h1>
                <p>{error?.message || "An unexpected error occurred."}</p>
                <button
                  onClick={resetErrorBoundary}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default GlobalErrorBoundary;
