import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '@miku-credit/api-interfaces';

import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  public getUserProfile(): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>('/api/auth/profile', { withCredentials: true });
  }
}
