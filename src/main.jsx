import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./views/App.jsx";
import AppProvider from "./context/AppContext.jsx";
import "./assets/scss/index.scss";
import SettingProvider from "./context/SettingContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <SettingProvider>
        <AppProvider>
          <LoadingProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LoadingProvider>
        </AppProvider>
      </SettingProvider>
    </HelmetProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
