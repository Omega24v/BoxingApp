import TimersList from "./TimersList";
import {renderWithProviders} from "../../utils/tests/renderWithProviders";
import {fireEvent, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {initialState} from "../../store/reducers/timer/timerReducer";
import TimerEdit from "../timerEdit/TimerEdit";
import {defaultCurrTimerModel} from "../../models/Timer";

describe('timer list tests', () => {

  it('is TimersList render ok', () => {
    renderWithProviders(<TimersList />);
  });

  it('test on click delete timer', async () => {

    const {container} = renderWithProviders(<TimersList />);
    const timersCount = initialState.timers.length;
    const deleteBtn = screen.getByTestId('delete-timer-1');

    // click on cross-delete btn on timer
    expect(container.getElementsByClassName('timer-list').length).toBe(timersCount);
    fireEvent.click(deleteBtn);
    expect(await screen.findByText(/Please confirm/i)).toBeInTheDocument();
    const closeConfirmBtn = screen.getByTestId('close-confirm-modal-btn');

    // click on close btn in delete timer modal
    fireEvent.click(closeConfirmBtn);
    expect(await screen.findByText(/Please confirm/i)).not.toBeInTheDocument();
    expect(container.getElementsByClassName('timer-list').length).toBe(timersCount);

    // click on cross-delete btn on timer and then click delete timer
    fireEvent.click(deleteBtn);
    const deleteConfirmBtn = screen.getByTestId('delete-timer-btn');
    fireEvent.click(deleteConfirmBtn);
    expect(await screen.findByText(/Please confirm/i)).not.toBeInTheDocument();
    expect(container.getElementsByClassName('timer-list').length).toBe(timersCount - 1);

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
});


