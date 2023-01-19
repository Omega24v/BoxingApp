import TimersList from "./TimersList";
import {renderWithProviders} from "../../utils/tests/renderWithProviders";
import {fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {initialState} from "../../store/reducers/timer/timerReducer";
import TimerEdit from "../timerEdit/TimerEdit";
import {defaultCurrTimerModel} from "../../models/Timer";

describe('timer list tests', () => {

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('is TimersList render ok', () => {
    renderWithProviders(<TimersList />);
  });

  it('test on click delete timer', async () => {

    const {container} = renderWithProviders(<TimersList />);
    const timersCount = initialState.timers.length;
    const deleteBtn = screen.getByTestId('delete-timer-1');

    checkTimersListCount(container, timersCount);
    await toggleAndCheckDeleteModal(deleteBtn, 'show');
    const closeConfirmBtn = screen.getByTestId('close-confirm-modal-btn');

    fireEvent.click(closeConfirmBtn);
    expect(await screen.findByText(/Please confirm/i)).not.toBeInTheDocument();
    checkTimersListCount(container, timersCount);

    await toggleAndCheckDeleteModal(deleteBtn, 'show');
    const deleteConfirmBtn = screen.getByTestId('delete-timer-btn');
    await toggleAndCheckDeleteModal(deleteConfirmBtn, 'close');
    checkTimersListCount(container, timersCount - 1);

  });

  it ('test on click edit timer', async () => {

    renderWithProviders(<TimersList />);
    const editBtn = screen.getByTestId('edit-timer-1');
    fireEvent.click(editBtn);
    const timerReducer = {...initialState, editTimerData: defaultCurrTimerModel}
    renderWithProviders(<TimerEdit />, {
      preloadedState: {
        timerReducer
      }
    });
    expect(await screen.findByText(/Save settings/i)).toBeInTheDocument();
  });

  async function toggleAndCheckDeleteModal(btn: HTMLElement, method: string) {

    fireEvent.click(btn);
    if (method === 'show') {
      expect(await screen.findByText(/Please confirm/i)).toBeInTheDocument();
    } else {
      expect(await screen.findByText(/Please confirm/i)).not.toBeInTheDocument();
    }
  }

  function checkTimersListCount(container: HTMLElement, count: number) {
    expect(container.getElementsByClassName('timer-list').length).toBe(count);
  }

});


