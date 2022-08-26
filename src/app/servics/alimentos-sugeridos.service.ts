import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { AlimentosSugeridos } from "../interfaces/alimentos-sugeridos.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
providedIn:'root'
})
export class AlimentosSugeridosService{


    private storageAlimentosSugeridos = new BehaviorSubject({ data: [], count: 0 });
    private _keyword = new BehaviorSubject('');
    private _editar=new Subject<AlimentosSugeridos>();
   private _guardar=new Subject<AlimentosSugeridos>();
   private _eliminar=new Subject<number>();
    public listaAlimentosSugeridos  = this.storageAlimentosSugeridos.asObservable();
    public keyword = this._keyword.asObservable();
    constructor(
      private http: HttpGenericService<any>
    ) {
      this.getAllAlimentos();
      this.searched();
      this.save();
      this.editar();
      this.delete();
    }
  
    private save() {
      this._guardar.pipe(
          debounceTime(500)
      ).subscribe(resp => {
          this.http.post('/alimentos-sugeridos', resp).subscribe(respHttp =>{
            this.getAllAlimentos(1)
          }
            
          );
      });
  }
  private editar(){
    this._editar.pipe(
      debounceTime(500)
  ).subscribe((resp: any) => {
      this.http.put('/alimentos-sugeridos/'+ resp.id, resp).subscribe(respHttp =>{
        this.getAllAlimentos(1)
      }
        
      );
  });
  
  }
  
  
  private delete(){
  this._eliminar.pipe(debounceTime(500)
  ).subscribe((resp) =>{
    this.http.delete('/alimentos-sugeridos/'+resp).subscribe(respHttp=>{
      console.log(respHttp)
      this.getAllAlimentos(1)
    })
  })
  }
  
  
  
  
    private searched() {
      this._keyword.pipe(
        debounceTime(100)
      ).subscribe(resp => {
        this.getAllAlimentos(1, resp);
      });
    }
  
    public getAllAlimentos(pag: number = 0, key = '') {
      const params = new HttpParams({
       fromObject:{
           keyword:key,
           page:pag+'',
           take:15+''
       }
        });
      this.http.get('/alimentos-sugeridos/pagination/search', { params }).subscribe((resp: any) => {
        this.storageAlimentosSugeridos.next(resp);
      });
    }
  
    searchByKeyword(keyword: string){
      this._keyword.next(keyword);
    }
    
    up(data: AlimentosSugeridos) {
      this._guardar.next(data);
    }
    
    upEditar(data: AlimentosSugeridos) {
      this._editar.next(data);
    }
    upEliminar(id: number) {
      this._eliminar.next(id);
    }



}