import { Test } from '@nestjs/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { ApiPaybackService } from './api-payback.service';

describe('ApiPaybackService', () => {
  const clientKafkaMock = {
    send: jest.fn().mockImplementationOnce(() => of({})),
  };
  let service: ApiPaybackService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ApiPaybackService,
        {
          provide: 'CALCULATION_SERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    service = module.get(ApiPaybackService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should have calculatePaybackPlan() which returns paybackPlan', () => {
    const { send } = clientKafkaMock;
    const result$ = service.calculatePaybackPlan({
      startDate: '123',
      amount: 100,
      months: 8,
      loanId: 1,
      scoring: 10,
    });
    const expected$ = cold('(a|)', {
      a: {},
    });

    expect(result$).toBeObservable(expected$);
    expect(send).toBeCalledWith('payback.calculate', {
      startDate: '123',
      amount: 100,
      months: 8,
      loanId: 1,
      scoring: 10,
    });
  });
});
