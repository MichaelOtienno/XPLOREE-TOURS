import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SupervisorService } from '../services/supervisor.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
})
export class SupervisorComponent {

  //projects
  projects: any[] = [];
  filteredProjects: any[] = [];
  private userInformation: any[] = [];
  private perfectMatch: string[] = [];

  //forms
  showProjectForm: boolean = false;
  showUpdateForm: boolean = false;
  showAcceptanceForm: boolean = false

  //projectForm types
  projectForm: {
    projectName: string;
    projectDescription: string;
    projectEndDate: string;
    employeeEmail: string;
    employeeName: string;
  } = {
      projectName: '',
      projectDescription: '',
      projectEndDate: '',
      employeeEmail: '',
      employeeName: '',
    };
  employeeEmails: { email: string; name: string }[] = [];


  //error/update responses
  errorResponse!: any
  mainError!: any
  updateResponse!: any
  projectD!: any
  isCompleted: boolean = false
  isCompletedr: boolean = true
  isWhichError: boolean = false
  filteredEmployeee!: string
  successResponse: string = ''
  successAssign: string = ''
  noneCompleted:boolean = false

  //authentication
  email: string = '';
  password: string = '';
  loginError: string = '';
  assignableEmployees: string[] = []

  projctID: any;

  constructor(private http: HttpClient, private supervisorService: SupervisorService) { }

  //fetch all projects
 
  fetchProjects() {
    this.supervisorService.fetchProjects().subscribe((data: any) => {
      this.projects = data;
      this.filteredProjects = [...this.projects];
      this.userInformation = this.projects.map(project => {
        return {
          AssignedUserName: project.AssignedUserName,
          AssignedUserEmail: project.AssignedUserEmail,
          projectStatus: project.projectStatus
        };
      });
      this.perfectMatch = this.userInformation
      this.perfectMatch = this.userInformation.map(user => user.AssignedUserEmail);

    });
  }

  //view completed projects
  viewCompletedProjects() {
    this.filteredProjects = this.projects.filter((project) => project.projectStatus == 'completed');
    
  //  this.noneCompleted = true
    
  }

  //get unassigned users
  filterEMail() {
    this.filteredProjects = this.projects.filter((project) => project.isAssigned == false);

  }

  //view uncompleted projects
  viewIncompleteProjects() {
    this.filteredProjects = this.projects.filter((project) => project.projectStatus !== 'completed');
    
  }

  //show add project form
  addProject() {
    this.showProjectForm = true;
    this.updateResponse = ''
  }
  //close the add project form
  closeProject() {
    this.showProjectForm = false
  }

  //update project details
  projectDetails(project: any) {
    this.projctID = project.projectID;
    this.projectForm = {
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      projectEndDate: project.endDate,
      employeeEmail: project.AssignedUserEmail,
      employeeName: project.AssignedUserName,
    };
    this.successResponse = ''
    this.updateResponse = ''
    this.showUpdateForm = true;
  }

  // Update project form
  updateProjectForm() {
    const projectData = {
      projectID: this.projctID,
      projectName: this.projectForm.projectName,
      projectDescription: this.projectForm.projectDescription,
      endDate: this.projectForm.projectEndDate,
      AssignedUserEmail: this.projectForm.employeeEmail,
      AssignedUserName: this.projectForm.employeeName,
    };
    // console.log(projectData);
    this.supervisorService.updateProject(projectData).subscribe(
      (response: any) => {
        this.successResponse = 'project updated successfully'
        this.fetchProjects();
        setTimeout(() => {
          this.showUpdateForm = false;

        }, 3000);
        this.fetchProjects()
      },
      (error) => {
        if (error instanceof ErrorEvent) {
          // Client-side error
          this.updateResponse += ` Client-side error: ${error.message}`;
          setTimeout(() => {
            this.updateResponse = ''
          }, 3000);
        } else if (error instanceof HttpErrorResponse) {
          // Server-side error
          if (error.error && error.error.error) {
            this.updateResponse += `   ${error.statusText} - ${error.error.error}`;
            setTimeout(() => {
              this.updateResponse = ''
            }, 3000);
          } else {
            this.updateResponse += ` Server-side error: ${error.status} - ${error.statusText}`;
          }
        }

        console.error('Error updating project:', error);
      }
    );
  }

  //close the update project form
  closeUpdate() {
    this.showUpdateForm = false
  }

  //fetch all employee emails
  fetchEmployeeEmails() {
    const apiUrl = 'http://localhost:4600/user/';
    const token = localStorage.getItem('token');

    if (!token) {
      return;

    }

    this.http
      .get(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'token': token,
        },
      })
      .subscribe(
        (data: any) => {
          if (data && Array.isArray(data.users)) {
            // console.log(data);

            this.employeeEmails = data.users
              .filter((user: { role: string; email: string; }) => user.role !== 'admin' && !this.perfectMatch.includes(user.email))
              .map((user: any) => ({
                email: user.email,
                name: user.userName,
              }));

          } else {
            this.mainError = 'we will be back soon';
            console.error('Data is not in the expected format:', data);
          }
        },
        (error) => {
          if (error.name === 'TokenExpiredError') {
            console.error('Token has expired');
            this.errorResponse = 'expired token please refresh';
            setTimeout(() => {
              this.errorResponse = '';
              window.location.href = '/signin';
            }, 5000);
          } else {
            console.error('Error fetching employee emails:', error);
          }
        }
      );
  }

  //update the employee name based on the fecthed email
  updateEmployeeName() {
    const selectedEmail = this.projectForm.employeeEmail;
    const selectedEmployee = this.employeeEmails.find((employee) => employee.email === selectedEmail);
    if (selectedEmployee) {
      this.projectForm.employeeName = selectedEmployee.name;
    } else {
      this.projectForm.employeeName = '';
    }
  }


  //assign project
  submitProjectForm() {
    this.fetchProjects()
    const projectData = {
      projectName: this.projectForm.projectName,
      projectDescription: this.projectForm.projectDescription,
      endDate: this.projectForm.projectEndDate,
      AssignedUserEmail: this.projectForm.employeeEmail,
      AssignedUserName: this.projectForm.employeeName,
    };
    this.supervisorService.assignProject(projectData).subscribe(
      (response: any) => {
        this.fetchProjects()
        this.successAssign = 'project assigned successfully'
        setTimeout(() => {
          this.errorResponse = '';
          this.showProjectForm = false;
        }, 2500);
      },
      (error) => {
        this.errorResponse = this.supervisorService.errorResponses();
        setTimeout(() => {
          this.errorResponse = ''

        }, 2500);
        this.updateResponse = this.supervisorService.updateResponses();

        console.error('Error updating project:', error);
      }
    );
  }

  //dateFormat
  formatDate(endDate: string) {
    const formattedEndDate = new Date(endDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    return formattedEndDate.toLocaleDateString('en-US');
  }


  ngOnInit() {
    this.fetchProjects();
    this.fetchEmployeeEmails();
  }


  deleteProject() {
    this.showAcceptanceForm = true
    this.showUpdateForm = false
    setTimeout(() => {
      this.supervisorService.deleteProject(this.projctID).subscribe(
        (data: any) => {
          this.updateResponse = 'deleted successfully'
          this.showAcceptanceForm = false
          setTimeout(() => {
            this.fetchProjects()
          }, 2500);

        },
        (error) => {
          console.error('Error updating project:', error);
        }

      );
    }, 3000);
  }

  //delete Authorization
  acceptDelete() {
    this.deleteProject()
    this.showAcceptanceForm = false
  }

  closeAuth() {
    this.showAcceptanceForm = false
  }

  clearRegisterError(delay: number) {
    setTimeout(() => {
      this.loginError = '';
    }, delay);
  }

  search(){
    

  }
 

}

