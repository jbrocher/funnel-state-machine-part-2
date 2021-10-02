import React, { useContext } from "react";
import { StateMachine, State } from "xstate";
import { useMachine } from "@xstate/react";

// We use a generic type to be able to handle
// any shape of context with type checking
interface FunnelProviderProps<TContext> {
  stateMachine: StateMachine<TContext, any, any>;
  children: React.ReactNode;
}

interface FunnelContextValue {
  currentState: State<any>;
  send: (state: string) => void;
}

const FunnelContext = React.createContext({} as FunnelContextValue);

function FunnelProvider<TContext>({
  stateMachine,
  children,
}: FunnelProviderProps<TContext>): React.ReactElement {
  const [current, send] = useMachine(stateMachine);
  return (
    <FunnelContext.Provider value={{ currentState: current, send }}>
      {children}
    </FunnelContext.Provider>
  );
}

export const useFunnel = () => useContext(FunnelContext);

export default FunnelProvider;
