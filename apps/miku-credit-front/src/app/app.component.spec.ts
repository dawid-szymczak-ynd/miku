import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Shallow } from 'shallow-render';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule);
  });

  it('should match snapshot', async () => {
    const { fixture } = await shallow
      .replaceModule(
        RouterModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            redirectTo: '/test',
            pathMatch: 'full',
          },
        ])
      )
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .render();

    expect(fixture).toMatchSnapshot();
  });
});
