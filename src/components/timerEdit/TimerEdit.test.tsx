import {renderWithProviders} from "../../utils/tests/renderWithProviders";
import TimerEdit from "./TimerEdit";
import {defaultCurrTimerModel} from "../../models/Timer";
import {initialState} from "../../store/reducers/timer/timerReducer";

describe('TimerEdit test', () => {

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('is render ok', () => {
    const timerReducer = {...initialState, editTimerData: defaultCurrTimerModel}
    renderWithProviders(<TimerEdit />, {
      preloadedState: {
        timerReducer
      }
    });
  });
});
