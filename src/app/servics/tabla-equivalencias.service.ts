import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Equivalencias } from "../interfaces/equivalencias.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
    })
    export class EquivalenciasService{
    
    
        private storageEquivalencias = new BehaviorSubject({ data: [], count: 0 });
        private _keyword = new BehaviorSubject('');
        private _editar=new Subject<Equivalencias>();
       private _guardar=new Subject<Equivalencias>();
       private _eliminar=new Subject<number>();
        public listaEquivalencias = this.storageEquivalencias.asObservable();
        public keyword = this._keyword.asObservable();
        constructor(
          private http: HttpGenericService<any>
        ) {
          this.getAllEquivalencias();
          this.searched();
          this.save();
          this.editar();
          this.delete();
        }
      
        private save() {
          this._guardar.pipe(
              debounceTime(500)
          ).subscribe(resp => {
              this.http.post('/equivalencias', resp).subscribe(respHttp =>{
                this.getAllEquivalencias(1)
              }
                
              );
          });
      }
      private editar(){
        this._editar.pipe(
          debounceTime(500)
      ).subscribe((resp: any) => {
          this.http.put('/equivalencias/'+ resp.id, resp).subscribe(respHttp =>{
            this.getAllEquivalencias(1)
          }
            
          );
      });
      
      }
      
      
      private delete(){
      this._eliminar.pipe(debounceTime(500)
      ).subscribe((resp) =>{
        this.http.delete('/equivalencias/'+resp).subscribe(respHttp=>{
          console.log(respHttp)
          this.getAllEquivalencias(1)
        })
      })
      }
      
      
      
      
        private searched() {
          this._keyword.pipe(
            debounceTime(100)
          ).subscribe(resp => {
            this.getAllEquivalencias(1, resp);
          });
        }
      
        public getAllEquivalencias(pag: number = 0, key = '') {
          const params = new HttpParams({
           fromObject:{
               keyword:key,
               page:pag+'',
               take:15+''
           }
            });
          this.http.get('/equivalencias/pagination/search', { params }).subscribe((resp: any) => {
            this.storageEquivalencias.next(resp);
          });
        }
      
        searchByKeyword(keyword: string){
          this._keyword.next(keyword);
        }
        
        up(data: Equivalencias) {
          this._guardar.next(data);
        }
        
        upEditar(data: Equivalencias) {
          this._editar.next(data);
        }
        upEliminar(id: number) {
          this._eliminar.next(id);
        }
    
    
    
    }