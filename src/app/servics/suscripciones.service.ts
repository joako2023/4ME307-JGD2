import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AlimentosSugeridos } from "../interfaces/alimentos-sugeridos.interface";
import { Suscripcion } from "../interfaces/suscripcion.interface";
import { HttpGenericService } from "./http-generic.service";



@Injectable({
    providedIn:'root'
    })
    export class SuscripcionesService{
    
    
        private storageSuscripcion = new BehaviorSubject({ data: [], count: 0 });
        private _keyword = new BehaviorSubject('');
        private _editar=new Subject<Suscripcion>();
       private _guardar=new Subject<Suscripcion>();
       private _eliminar=new Subject<number>();
        public listaSuscripcion  = this.storageSuscripcion.asObservable();
        public keyword = this._keyword.asObservable();
        constructor(
          private http: HttpGenericService<any>
        ) {
          this.getAllSuscripciones();
          this.searched();
          this.save();
          this.editar();
          this.delete();
        }
      
        private save() {
          this._guardar.pipe(
              debounceTime(500)
          ).subscribe(resp => {
              this.http.post('/suscripciones', resp).subscribe(respHttp =>{
                this.getAllSuscripciones(1)
              }
                
              );
          });
      }
      private editar(){
        this._editar.pipe(
          debounceTime(500)
      ).subscribe((resp: any) => {
          this.http.put('/suscripciones/'+ resp.id, resp).subscribe(respHttp =>{
            this.getAllSuscripciones(1)
          }
            
          );
      });
      
      }
      
      
      private delete(){
      this._eliminar.pipe(debounceTime(500)
      ).subscribe((resp) =>{
        this.http.delete('/suscripciones/'+resp).subscribe(respHttp=>{
          console.log(respHttp)
          this.getAllSuscripciones(1)
        })
      })
      }
      
      
      
      
        private searched() {
          this._keyword.pipe(
            debounceTime(100)
          ).subscribe(resp => {
            this.getAllSuscripciones(1, resp);
          });
        }
      
        public getAllSuscripciones(pag: number = 0, key = '') {
          const params = new HttpParams({
           fromObject:{
               keyword:key,
               page:pag+'',
               take:15+''
           }
            });
          this.http.get('/suscripciones/pagination/search', { params }).subscribe((resp: any) => {
            this.storageSuscripcion.next(resp);
          });
        }
      
        searchByKeyword(keyword: string){
          this._keyword.next(keyword);
        }
        
        up(data: Suscripcion) {
          this._guardar.next(data);
        }
        
        upEditar(data: Suscripcion) {
          this._editar.next(data);
        }
        upEliminar(id: number) {
          this._eliminar.next(id);
        }
    
    
    
    }