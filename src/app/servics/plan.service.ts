import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Plan } from "../interfaces/plan.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
    })
    export class PlanService{
    
    
        private storagePlan = new BehaviorSubject({ data: [], count: 0,servicios:[]});
        private _keyword = new BehaviorSubject('');
        private _editar=new Subject<Plan>();
       private _guardar=new Subject<Plan>();
       private _eliminar=new Subject<number>();
        public listaPlanes  = this.storagePlan.asObservable();
        public keyword = this._keyword.asObservable();
        constructor(
          private http: HttpGenericService<any>
        ) {
          this.getAllPlanes();
          this.searched();
          this.save();
          this.editar();
          this.delete();
        }
      
        private save() {
          this._guardar.pipe(
              debounceTime(500)
          ).subscribe(resp => {
              this.http.post('/plan', resp).subscribe(respHttp =>{
                this.getAllPlanes(1)
              }
                
              );
          });
      }
      private editar(){
        this._editar.pipe(
          debounceTime(500)
      ).subscribe((resp: any) => {
          this.http.put('/plan/'+ resp.id, resp).subscribe(respHttp =>{
            this.getAllPlanes(1)
          }
            
          );
      });
      
      }
      
      
      private delete(){
      this._eliminar.pipe(debounceTime(500)
      ).subscribe((resp) =>{
        this.http.delete('/plan/'+resp).subscribe(respHttp=>{
          console.log(respHttp)
          this.getAllPlanes(1)
        })
      })
      }
      
      
      
      
        private searched() {
          this._keyword.pipe(
            debounceTime(100)
          ).subscribe(resp => {
            this.getAllPlanes(1, resp);
          });
        }
      
        public getAllPlanes(pag: number = 0, key = '') {
          const params = new HttpParams({
           fromObject:{
               keyword:key,
               page:pag+'',
               take:15+''
           }
            });
          this.http.get('/plan/pagination/search', { params }).subscribe((resp: any) => {
            this.storagePlan.next(resp);
          });
        }
      
        searchByKeyword(keyword: string){
          this._keyword.next(keyword);
        }
        
        up(data: Plan) {
          this._guardar.next(data);
        }
        
        upEditar(data: Plan) {
          this._editar.next(data);
        }
        upEliminar(id: number) {
          this._eliminar.next(id);
        }
    
    
    
    }