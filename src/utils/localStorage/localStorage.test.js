import {loadData, setData} from "./localStorage";

describe('test localstorage functions', () => {

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('test set and load localstorage data', () => {
    const mockId = 'testId';
    const mockData = {data: 'test data'};

    setData(mockData, mockId);

    expect(loadData(mockId)).toEqual(mockData)
  });
});
