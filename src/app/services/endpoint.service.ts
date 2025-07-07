import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EndpointService {
  isLoading = false;
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setBaseUrl(url: string) {
    this.BASE_URL = url;
  }

  getData<T>(
    endpoint: string,
    id?: string,
    params?: Record<string, any>
  ): Observable<T> {
    this.isLoading = true;
    let url = `${this.BASE_URL}/${endpoint}/`;
    if (id) url += id;
    return this.http.get<T>(url, { params }).pipe(
      finalize(() => (this.isLoading = false)),
      catchError(this.handleError)
    );
  }

  postData<TResponse, TRequest = any>(
    endpoint: string,
    data: TRequest
  ): Observable<TResponse> {
    this.isLoading = true;
    const url = `${this.BASE_URL}/${endpoint}/`;
    return this.http.post<TResponse>(url, data).pipe(
      finalize(() => (this.isLoading = false)),
      catchError(this.handleError)
    );
  }

  putData<T>(endpoint: string, id: string, data: T): Observable<T> {
    this.isLoading = true;
    const url = `${this.BASE_URL}/${endpoint}/${id}`;
    return this.http.put<T>(url, data).pipe(
      finalize(() => (this.isLoading = false)),
      catchError(this.handleError)
    );
  }

  deleteData(endpoint: string, id: string): Observable<void> {
    this.isLoading = true;
    const url = `${this.BASE_URL}/${endpoint}/${id}`;
    return this.http.delete<void>(url).pipe(
      finalize(() => (this.isLoading = false)),
      catchError(this.handleError)
    );
  }

  uploadFiles<TResponse = any>(
    endpoint: string,
    formData: FormData
  ): Observable<TResponse> {
    this.isLoading = true;
    const url = `${this.BASE_URL}/${endpoint}/upload`;
    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    return this.http.post<TResponse>(url, formData, { headers }).pipe(
      finalize(() => (this.isLoading = false)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
