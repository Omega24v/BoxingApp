import {renderWithProviders} from "../../../utils/tests/renderWithProviders";
import Switcher from "./Switcher";

describe('tests for switcher', () => {

  const fn = jest.fn()

  it('test true check', () => {
    const type = 'test'
    const {getByTestId} = renderWithProviders(<Switcher isChecked={true} toggle={fn} type={type}/>);
    const switcher = getByTestId(`sd-switch-${type}`) as HTMLInputElement;
    expect(switcher.checked).toEqual(true);
  })
})
