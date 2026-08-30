import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//  Router
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "@/components/shared/themes/theme-provider";

export function Providers() {
  return (
    <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {import.meta.env.VITE_APP_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
