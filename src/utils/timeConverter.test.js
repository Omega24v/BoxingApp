import {getMinAndSecFromMs, getMsFromMinAndSec, msToHMS, msToMAS} from "./timeConverter";


describe('test for timeConverter', () => {
  it('test msToHMS HHMMSS', () => {
    expect((msToHMS(10000000))).toBe('2:46:40');
  });

  it('test msToHMS MMSS', () => {
    expect((msToHMS(100000))).toBe('01:40');
  });

  it('test msToMAS', () => {
    expect((msToMAS(10000))).toBe('0:10');
  });

  it('test getMinAndSecFromMs', () => {
    expect((getMinAndSecFromMs(70000))).toEqual({min: 1, sec: 10});
  });

  it('test getMsFromMinAndSec', () => {
    expect((getMsFromMinAndSec(1, 10))).toBe(70000);
  });
})
