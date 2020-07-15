import { Test } from '@nestjs/testing';

import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

describe('SubcriptioMunerisUserService', () => {
  let service: SubcriptioMunerisUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SubcriptioMunerisUserService],
    }).compile();

    service = module.get(SubcriptioMunerisUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
