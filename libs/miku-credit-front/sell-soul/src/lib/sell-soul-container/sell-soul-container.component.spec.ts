import { MikuCreditFrontSellSoulModule } from '@miku-credit/miku-credit-front/sell-soul';

import { Shallow } from 'shallow-render';

import { SellSoulContainerComponent } from './sell-soul-container.component';

describe('SellSoulContainerComponent', () => {
  let shallow: Shallow<SellSoulContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(SellSoulContainerComponent, MikuCreditFrontSellSoulModule);
  });

  it('should match snapshot', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
