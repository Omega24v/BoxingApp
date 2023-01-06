import App from "./App";
import {renderWithProviders} from "./utils/tests/renderWithProviders";

it('is app render ok', () => {
  renderWithProviders(<App/>)
});
