import {getPhaseColor, getTotalTime} from "./common";
import {PREPARE, TEST_TIMER} from "../constatns/timerDefaultValues";

describe('tests for common functions', () => {

  it('test for getPhaseColor', () => {
    expect(getPhaseColor(PREPARE)).toBe('__prepare');
  });

  it ('test for getTotalTime', () => {
    expect(getTotalTime(TEST_TIMER)).toEqual(475000);
  });
});
