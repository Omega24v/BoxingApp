import {getPhaseColor, getTotalTime} from "./common";
import {PREPARE} from "../constatns/timerDefaultValues";

const timer = {
  roundTime: {
    time: 30000
  },
  restTime: {
    time: 10000
  },
  prepareTime: {
    time: 5000
  },
  rounds: 12
}

describe('tests for common functions', () => {

  it('test for getPhaseColor', () => {
    expect(getPhaseColor(PREPARE)).toBe('__prepare');
  });

  it ('test for getTotalTime', () => {
    expect(getTotalTime(timer)).toEqual(475000)
  })
});
