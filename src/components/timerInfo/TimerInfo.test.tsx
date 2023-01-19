import {render, screen} from "@testing-library/react";
import TimerInfo from "./TimerInfo";
import React from "react";

describe('tests for TimerInfo component', () => {

  it('is TimerInfo render ok', () => {
    render(<TimerInfo type='warning' label='PREPARE TIME' time={10000} />);
    expect(screen.getByText('PREPARE TIME'));
    expect(screen.getByText('00:10'));
  });
});
