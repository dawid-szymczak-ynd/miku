import { Test } from '@nestjs/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { ApiLoanController } from './api-loan.controller';
import { ApiLoanService } from './api-loan.service';

describe('ApiLoanController', () => {
  const loanServiceMock = {
    getLoans: jest.fn(() => of([{}])),
  };
  const kafkaClientMock = {
    subscribeToResponseOf: jest.fn(),
  };
  let controller: ApiLoanController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ApiLoanService,
          useValue: loanServiceMock,
        },
        {
          provide: 'CALCULATION_SERVICE',
          useValue: kafkaClientMock,
        },
      ],
      controllers: [ApiLoanController],
    }).compile();

    controller = module.get(ApiLoanController);
  });

  it('should be defined', () => {
    const { subscribeToResponseOf } = kafkaClientMock;
    const subscribeCount = 1;

    controller.onModuleInit();

    expect(controller).toBeTruthy();
    expect(subscribeToResponseOf).toBeCalledTimes(subscribeCount);
  });

  it('should have getLoansPage() which returns loans', () => {
    const { getLoans } = loanServiceMock;
    const result$ = controller.getLoansPage({ page: 1 });
    const expected$ = cold('(a|)', {
      a: [{}],
    });

    expect(result$).toBeObservable(expected$);
    expect(getLoans).toBeCalledWith(1);
  });
});
