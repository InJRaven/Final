import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./views/App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppProvider from "./context/AppContext.jsx";
import "./assets/scss/index.scss";
import SettingProvider from "./context/SettingContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SettingProvider>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </SettingProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
