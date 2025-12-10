import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const queryClient = new QueryClient();

function App({ children }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

interface AppProps {
  children?: React.ReactNode;
}

export default App;
