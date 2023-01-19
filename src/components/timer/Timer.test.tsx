import {renderWithProviders} from "../../utils/tests/renderWithProviders";
import Timer from "./Timer";
import {initialState} from "../../store/reducers/timer/timerReducer";
import {TEST_TIMER2} from "../../constatns/timerDefaultValues";
import {fireEvent, screen, within} from "@testing-library/react";

const timerReducer = {...initialState, currTimer: TEST_TIMER2, timers: [TEST_TIMER2]}

describe('test main timer functionality', () => {

  afterEach(() => {
    jest.clearAllTimers();
  });

  jest.setTimeout(23000);

  const interval:([string, number])[] = [
    ['ROUND', 6000],
    ['WARNING', 3000],
    ['REST', 2000],
    ['ROUND', 6000],
    ['WARNING', 3000],
    ['TOTAL TIME', 2000]
  ];

  it('test Timer render', async () => {

    renderWithProviders(<Timer/>, {
      preloadedState: {
        timerReducer
      }
    });

    checkIsElementOnPage('timer-big-full-time', '00:20');
    checkIsElementOnPage('timer-big-full-time', 'TOTAL TIME');

    fireEvent.click(screen.getByTestId('btn-start'));
    checkIsElementOnPage('timer-big-full-time', 'PREPARE');

    for (let i = 0; i < interval.length; i++) {
      await promiseTimeout(interval[i][1]);
      checkIsElementOnPage('timer-big-full-time', interval[i][0]);
    }

  });

  function checkIsElementOnPage(id: string, text: string) {
    expect(within(screen.getByTestId(id)).getByText(new RegExp(text, "i")));
  }

  async function promiseTimeout(ms: number) {
    await new Promise((r) => setTimeout(r, ms));
  }

});

