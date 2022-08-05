import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpGenericService } from "./http-generic.service";
import { debounceTime, tap } from "rxjs/operators";
import { Alimentos } from "../interfaces/Libreria-alimentos.interface";

@Injectable({
    providedIn: 'root'
})
export class AlimentosService {


  private storageLibreriaAlimentos = new BehaviorSubject({ data: [], count: 0 });
  private _keyword = new BehaviorSubject('');
  private _editar=new Subject<Alimentos>();
 private _guardar=new Subject<Alimentos>();
 private _eliminar=new Subject<number>();
  public listaAlimentos  = this.storageLibreriaAlimentos.asObservable();
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
        this.http.post('/alimentos', resp).subscribe(respHttp =>{
          this.getAllAlimentos(1)
        }
          
        );
    });
}
private editar(){
  this._editar.pipe(
    debounceTime(500)
).subscribe((resp: any) => {
    this.http.put('/alimentos/'+ resp.id, resp).subscribe(respHttp =>{
      this.getAllAlimentos(1)
    }
      
    );
});

}


private delete(){
this._eliminar.pipe(debounceTime(500)
).subscribe((resp) =>{
  this.http.delete('/alimentos/'+resp).subscribe(respHttp=>{
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
    this.http.get('/alimentos/pagination/search', { params }).subscribe((resp: any) => {
      this.storageLibreriaAlimentos.next(resp);
    });
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }
  
  up(data: Alimentos) {
    this._guardar.next(data);
  }
  
  upEditar(data: Alimentos) {
    this._editar.next(data);
  }
  upEliminar(id: number) {
    this._eliminar.next(id);
  }
}