import { Test } from '@nestjs/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { ApiLoanService } from './api-loan.service';

describe('ApiLoanService', () => {
  const clientKafkaMock = {
    send: jest.fn().mockImplementation(() => of([{ name: 'mockName' }])),
  };
  let service: ApiLoanService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ApiLoanService,
        {
          provide: 'CALCULATION_SERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    service = module.get(ApiLoanService);
  });

  it('should have getLoans() which returns loans', () => {
    const { send } = clientKafkaMock;
    const result$ = service.getLoans(1);
    const expected$ = cold('(a|)', {
      a: [{ name: 'mockName' }],
    });

    expect(result$).toBeObservable(expected$);
    expect(send).toBeCalledWith('loans.getChunk', {
      take: 10,
      skip: 10,
    });
  });

  it('should have getLoans() which returns loans with default parameter', () => {
    const { send } = clientKafkaMock;
    const result$ = service.getLoans();
    const expected$ = cold('(a|)', {
      a: [{ name: 'mockName' }],
    });

    expect(result$).toBeObservable(expected$);
    expect(send).toBeCalledWith('loans.getChunk', {
      take: 10,
      skip: 0,
    });
  });
});
