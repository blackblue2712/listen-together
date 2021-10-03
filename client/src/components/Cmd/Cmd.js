import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

export const Cmd = observer((props) => {
  useEffect(() => {
    document.querySelector(".termi-content").scrollBy(0, 120);
  }, [props.driver.cmd.length]);

  if (props.driver.cmd.length === 0) {
    return <></>;
  }

  return (
    <>
      {props.driver.cmd.map((item) => (
        <div dangerouslySetInnerHTML={{ __html: item }} className="cmd"></div>
      ))}
    </>
  );
});
