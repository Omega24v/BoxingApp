import {render} from "@testing-library/react";
import TimerInfo from "./TimerInfo";
import React from "react";

it('is TimerInfo render ok', () => {
  render(<TimerInfo type='warning' label='prepareTime' time={10} />)
});
