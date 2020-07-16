import { MikuCreditFrontHomepageModule } from '@miku-credit/miku-credit-front/homepage';

import { Shallow } from 'shallow-render';

import { HomepageContainerComponent } from './homepage-container.component';

describe('HomepageContainerComponent', () => {
  let shallow: Shallow<HomepageContainerComponent>;

  beforeEach(() => {
    shallow = new Shallow(HomepageContainerComponent, MikuCreditFrontHomepageModule);
  });

  it('should match snapshot', async () => {
    const { fixture } = await shallow.render();

    expect(fixture).toMatchSnapshot();
  });
});
