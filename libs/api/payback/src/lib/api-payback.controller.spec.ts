import { Test } from '@nestjs/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { ApiPaybackController } from './api-payback.controller';
import { ApiPaybackService } from './api-payback.service';

describe('ApiPaybackController', () => {
  const paybackServiceMock = {
    calculatePaybackPlan: jest.fn(() => of({})),
  };
  const kafkaClientMock = {
    subscribeToResponseOf: jest.fn(),
  };
  let controller: ApiPaybackController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: ApiPaybackService, useValue: paybackServiceMock },
        { provide: 'CALCULATION_SERVICE', useValue: kafkaClientMock },
      ],
      controllers: [ApiPaybackController],
    }).compile();

    controller = module.get(ApiPaybackController);
  });

  it('should be defined', () => {
    const { subscribeToResponseOf } = kafkaClientMock;
    const subscribeCount = 1;

    controller.onModuleInit();

    expect(controller).toBeTruthy();
    expect(subscribeToResponseOf).toBeCalledTimes(subscribeCount);
  });

  it('should have getLoansPage() which returns loans', () => {
    const { calculatePaybackPlan } = paybackServiceMock;
    const result$ = controller.calculatePaybackPlan({
      amount: 100,
      loanId: 1,
      months: 10,
      scoring: 10,
      startDate: '123',
    });
    const expected$ = cold('(a|)', {
      a: {},
    });

    expect(result$).toBeObservable(expected$);
    expect(calculatePaybackPlan).toBeCalledWith({
      amount: 100,
      loanId: 1,
      months: 10,
      scoring: 10,
      startDate: '123',
    });
  });
});
