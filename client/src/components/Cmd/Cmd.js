import React from "react";
import { observer } from "mobx-react-lite";

export const Cmd = observer((props) => {
  if (props.driver.cmd.length === 0) {
    return <></>;
  }

  return props.driver.cmd.map((item) => (
    <div dangerouslySetInnerHTML={{ __html: item }} className="cmd"></div>
  ));
});
