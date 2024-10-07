import { Coach } from './coach';

describe('Coach', () => {
  it('should create an instance', () => {
    expect(new Coach(0, '', '', '', 0, '', '')).toBeTruthy();
  });
});
