import React from "react";

function App({ children }: AppProps) {
  return (
    // children contains the AppLayout
    <>{children}</>
  );
}

interface AppProps {
  children?: React.ReactNode;
}

export default App;
