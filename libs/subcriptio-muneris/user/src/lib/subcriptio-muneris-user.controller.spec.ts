import { Test } from '@nestjs/testing';

import { SubcriptioMunerisUserController } from './subcriptio-muneris-user.controller';
import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

describe('SubcriptioMunerisUserController', () => {
  let controller: SubcriptioMunerisUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SubcriptioMunerisUserService],
      controllers: [SubcriptioMunerisUserController],
    }).compile();

    controller = module.get(SubcriptioMunerisUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
