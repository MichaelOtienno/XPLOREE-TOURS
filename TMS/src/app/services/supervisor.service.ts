import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SupervisorService {

  private updateResponse: string = '';
  private errorResponse: string = '';

  private apiUrl = 'http://localhost:4600/project';

  private assignProjectUrl = 'http://localhost:4600/project/assignProject';

  private deleteUrl = 'http://localhost:4600/project/deleteProject';

  constructor(private http: HttpClient) { }


  //fetchProject Service
  fetchProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  //updateProject Service
  updateProject(projectData: any): Observable<any> {
    const updateProjectUrl = `${this.apiUrl}/changeProject`;

    return this.http.post(updateProjectUrl, projectData);
  }

  //asignProject Service
  assignProject(projectData: any): Observable<any> {
    this.updateResponse = '';
    return this.http.post(this.assignProjectUrl, projectData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof ErrorEvent) {
          // Client error
          this.updateResponse += 'fill all fields';
          setTimeout(() => {
            this.errorResponse = ''
          }, 3000);
        } else if (error instanceof HttpErrorResponse) {
          // Server error
          if (error.error && error.error.error) {
            this.errorResponse += `   ${error.statusText} - ${error.error.error}`;
            setTimeout(() => {
              this.errorResponse = ''
            }, 3000);
          } else {
            this.errorResponse += ` Server-side error: ${error.status} - ${error.statusText}`;
          }
        }

        throw error;
      })

    )
  }

  updateResponses(): string {
    return this.updateResponse;
  }
  errorResponses(): string {
    return this.errorResponse;
  }


  //deleteProject Service
  deleteProject(projectID: string): Observable<any> {
    const deleteData = {
      projectID: projectID
    };

    return this.http.delete(this.deleteUrl, { body: deleteData }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<never> {
    if (error instanceof ErrorEvent) {
      // Client-side error
      const errorMessage = `Client-side error: ${error.message}`;
      console.error(errorMessage);
      return throwError(errorMessage);
    } else if (error instanceof HttpErrorResponse) {
      // Server-side error
      let errorMessage = `Server-side error: ${error.status} - ${error.statusText}`;

      if (error.error && error.error.error) {
        errorMessage += ` - ${error.error.error}`;
      }

      console.error(errorMessage);
      return throwError(errorMessage);
    } else {
      // Unknown error
      const errorMessage = 'An unknown error occurred';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }

}
