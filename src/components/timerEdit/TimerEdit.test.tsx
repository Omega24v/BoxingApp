import {renderWithProviders} from "../../utils/tests/renderWithProviders";
import {fireEvent, screen} from "@testing-library/react";
import TimerEdit from "./TimerEdit";
import App from "../../App";
import '@testing-library/jest-dom'
import {defaultCurrTimerModel} from "../../models/Timer";
import {initialState} from "../../store/reducers/timer/timerReducer";

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => (document.body.innerHTML = ``));

describe('TimerEdit test', () => {

  const testTimerName1 = 'test timer name';
  const testTimerName2 = 'another timer test name';
  const testModalText = 'Circle inner alerts';

  const timerReducer = {...initialState, editTimerData: defaultCurrTimerModel}

  it('is render ok', () => {
    renderWithProviders(<TimerEdit />, {
      preloadedState: {
        timerReducer
      }
    });
  });

  it('is adding new timer works', async () => {

    renderWithProviders(<App />, {
      preloadedState: {
        timerReducer
      }
    });

    const openEditAddModalBtn = screen.getByTestId('openEditAddModalBtn');
    expect(openEditAddModalBtn).toBeInTheDocument();

    openModal(openEditAddModalBtn);
    await checkIsModalOpened(testModalText);
    let editTimerNameInput = screen.getByTestId('edit-timer-name-input');
    let saveAsNewTimerBtn = screen.getByTestId('saveAsNewTimerBtn');

    changeTimerName(editTimerNameInput, saveAsNewTimerBtn, testTimerName1);
    await checkIsTimerEdited(testTimerName1, testModalText);

    openModal(openEditAddModalBtn);
    editTimerNameInput = screen.getByTestId('edit-timer-name-input');
    saveAsNewTimerBtn = screen.getByTestId('saveAsNewTimerBtn');

    await checkIsModalOpened(testModalText);
    changeTimerName(editTimerNameInput, saveAsNewTimerBtn, testTimerName2);
    await checkIsNewTimerAdded(testTimerName1, testTimerName2, testModalText);

  });

  it('is edit timer works', async () => {

    renderWithProviders(<App />, {
      preloadedState: {
        timerReducer
      }
    });

    const openEditAddModalBtn = screen.getByTestId('openEditAddModalBtn');
    expect(openEditAddModalBtn).toBeInTheDocument();

    openModal(openEditAddModalBtn);
    let editTimerNameInput = screen.getByTestId('edit-timer-name-input');
    let saveEditTimerBtn = screen.getByTestId('saveEditTimerBtn');

    await checkIsModalOpened(testModalText);
    changeTimerName(editTimerNameInput, saveEditTimerBtn, testTimerName1);
    await checkIsTimerEdited(testTimerName1, testModalText);

  });

  function openModal(btn: HTMLElement) {
    fireEvent.click(btn);
  }

  async function checkIsModalOpened(modalText: string) {
    expect(await screen.findByText(modalText)).toBeVisible();
  }

  function changeTimerName(input: HTMLElement, btn: HTMLElement, timerName: string) {
    fireEvent.change(input, {target: {value: timerName}});
    fireEvent.click(btn);
  }

  async function checkIsTimerEdited(timerName: string, modalText: string) {
    expect(await screen.findAllByText(timerName)).toHaveLength(2);
    expect(await screen.queryByText(modalText)).toBeNull();
  }

  async function checkIsNewTimerAdded(prevTimerName: string, newTimerName: string, modalText: string) {
    expect(await screen.findAllByText(prevTimerName)).toHaveLength(1);
    expect(await screen.findAllByText(newTimerName)).toHaveLength(2);
    expect(await screen.queryByText(modalText)).toBeNull();
  }

});
