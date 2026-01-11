import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { pacerDevtoolsPlugin } from "@tanstack/react-pacer-devtools";
import React from "react";

const queryClient = new QueryClient();

function App({ children }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackDevtools
            eventBusConfig={{ debug: false }}
            plugins={[pacerDevtoolsPlugin()]}
          />
        </>
      )}
    </QueryClientProvider>
  );
}

interface AppProps {
  children?: React.ReactNode;
}

export default App;
