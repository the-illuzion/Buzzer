import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  host(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'host',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  b(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'buzzed',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  close(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'close',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }
  redirect(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'red',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  delete(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'delete_player',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  update_score(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'update_score',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  save_score(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'save_score',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  close_leaderboard(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'close_leaderboard',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }
  get_score(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'send_score',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }
  delete_session(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'delete_session',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  verify(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'verify',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  enable(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'enable',frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

  buzz(frmdata) {
    return new Promise((resolve, reject) => {
      // this.showloader()
      this.http.post(environment.URL+'buzz', frmdata)

        .subscribe((success: any) => {
          // this.hideloader()
          return resolve(success);
        }, error => {
          return reject(error);
        });
    });
  }

}
