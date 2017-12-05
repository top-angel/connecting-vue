import { shallow } from 'vue-test-utils';

import Lobby from '@/components/Lobby';

const push = {
  join() { return this; },
  receive() { return this; },
};
const phoenix = {
  channel() { return push; },
};

describe('Lobby.vue', () => {
  let phoenix,
    mocks;
  beforeEach(() => {
    mocks = { $phoenix: phoenix };
  });

  it('should render correct contents', () => {
    const wrapper = shallow(Lobby, phoenix);
    expect(wrapper.find('.hello h1').textContent).toEqual('Welcome to Connect Four');
  });
});
