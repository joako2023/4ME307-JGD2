import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Servicios } from "../interfaces/servicios.interface";

import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
    })
    export class ServiciosService{
    
    
        private storageServicios = new BehaviorSubject({ data: [], count: 0 });
        private _keyword = new BehaviorSubject('');
        private _editar=new Subject<Servicios>();
       private _guardar=new Subject<Servicios>();
       private _eliminar=new Subject<number>();
        public listaServicios  = this.storageServicios.asObservable();
        public keyword = this._keyword.asObservable();
        constructor(
          private http: HttpGenericService<any>
        ) {
          this.getAllServicios();
          this.searched();
          this.save();
          this.editar();
          this.delete();
          this.getServicios();
        }
      
        private save() {
          this._guardar.pipe(
              debounceTime(500)
          ).subscribe(resp => {
              this.http.post('/servicios', resp).subscribe(respHttp =>{
                this.getAllServicios(1)
              }
                
              );
          });
      }
      private editar(){
        this._editar.pipe(
          debounceTime(500)
      ).subscribe((resp: any) => {
          this.http.put('/servicios/'+ resp.id, resp).subscribe(respHttp =>{
            this.getAllServicios(1)
          }
            
          );
      });
      
      }
      
      
      private delete(){
      this._eliminar.pipe(debounceTime(500)
      ).subscribe((resp) =>{
        this.http.delete('/servicios/'+resp).subscribe(respHttp=>{
          console.log(respHttp)
          this.getAllServicios(1)
        })
      })
      }
      
      
      
      
        private searched() {
          this._keyword.pipe(
            debounceTime(100)
          ).subscribe(resp => {
            this.getAllServicios(1, resp);
          });
        }


        
        public getServicios() {
          return this.http.get('/servicios')
         }





        public getAllServicios(pag: number = 1, key = '') {
          const params = new HttpParams({
           fromObject:{
               keyword:key,
               page:pag+'',
               take:15+''
           }
            });
          this.http.get('/servicios/pagination/search', { params }).subscribe((resp: any) => {
            this.storageServicios.next(resp);
          });
        }
      
        searchByKeyword(keyword: string){
          this._keyword.next(keyword);
        }
        
        up(data: Servicios) {
          this._guardar.next(data);
        }
        
        upEditar(data: Servicios) {
          this._editar.next(data);
        }
        upEliminar(id: number) {
          this._eliminar.next(id);
        }
    
    
    
    }