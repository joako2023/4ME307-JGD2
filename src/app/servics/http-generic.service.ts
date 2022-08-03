import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
  export class HttpGenericService<T> {
  
    private backend = environment.backendUrl;
  
    constructor(
      private httpClient: HttpClient
    ) { }
  
    public get(url: string, options = {}) {
      return this.httpClient.get(this.backend + url, options);
    }
  
    public post(url: string, body: T, options = {}) {
      return this.httpClient.post(this.backend + url, body, options);
    }
  
    public put(url: string, body: T, options = {}) {
      return this.httpClient.put(this.backend + url, body, options);
    }
  
    public delete(url: string, options = {}) {
      return this.httpClient.delete(this.backend + url, options);
    }
    
  }