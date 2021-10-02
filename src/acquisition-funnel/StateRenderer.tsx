import React from "react";
import { useFunnel } from "./FunnelProvider";

interface StateProps {
  state: string;
  children: (send: any) => React.ReactNode;
}

const StateRenderer: React.FunctionComponent<StateProps> = ({
  state,
  children,
}) => {
  const { currentState, send } = useFunnel();

  return currentState.matches(state) ? (
    <div>{children(send)}</div>
  ) : (
    <div></div>
  );
};

export default StateRenderer;
