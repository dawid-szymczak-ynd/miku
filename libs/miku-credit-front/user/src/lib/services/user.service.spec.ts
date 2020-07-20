import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(() => of({})),
          },
        },
      ],
    });

    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should have getUserProfile() which returns profile of the user', () => {
    const { get } = httpClient;
    const result$ = service.getUserProfile();
    const expected$ = cold('(a|)', { a: {} });

    expect(result$).toBeObservable(expected$);
    expect(get).toBeCalledWith('/api/auth/profile', { withCredentials: true });
  });
});
