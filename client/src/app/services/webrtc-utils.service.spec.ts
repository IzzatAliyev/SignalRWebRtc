import { TestBed } from '@angular/core/testing';

import { WebrtcUtilsService } from './webrtc-utils.service';

describe('WebrtcUtilsService', () => {
  let service: WebrtcUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrtcUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
