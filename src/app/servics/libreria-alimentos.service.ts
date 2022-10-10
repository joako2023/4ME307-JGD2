import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpGenericService } from "./http-generic.service";
import { debounceTime, tap } from "rxjs/operators";
import { LibreriaAlimentos } from "../interfaces/Libreria-alimentos.interface";

@Injectable({
    providedIn: 'root'
})
export class LibreriaAlimentosService {


  private storageLibreriaAlimentos = new BehaviorSubject({ data: [], count: 0 });
  private _keyword = new BehaviorSubject('');
  private _editar=new Subject<LibreriaAlimentos>();
 private _guardar=new Subject<LibreriaAlimentos>();
 private _eliminar=new Subject<number>();
  public listaAlimentos  = this.storageLibreriaAlimentos.asObservable();
  public keyword = this._keyword.asObservable();
  constructor(
    private http: HttpGenericService<any>
  ) {
    this.getAllLibreriaAlimentos();
    this.searched();
    this.save();
    this.editar();
    this.delete();
  }

  private save() {
    this._guardar.pipe(
        debounceTime(500)
    ).subscribe(resp => {
        this.http.post('/Libreria-alimentos', resp).subscribe(respHttp =>{
          this.getAllLibreriaAlimentos(1)
        }
          
        );
    });
}
private editar(){
  this._editar.pipe(
    debounceTime(500)
).subscribe((resp: any) => {
    this.http.put('/Libreria-alimentos/'+ resp.id, resp).subscribe(respHttp =>{
      this.getAllLibreriaAlimentos(1)
    }
      
    );
});

}


private delete(){
this._eliminar.pipe(debounceTime(500)
).subscribe((resp) =>{
  this.http.delete('/Libreria-alimentos/'+resp).subscribe(respHttp=>{
    console.log(respHttp)
    this.getAllLibreriaAlimentos(1)
  })
})
}




  private searched() {
    this._keyword.pipe(
      debounceTime(100)
    ).subscribe(resp => {
      this.getAllLibreriaAlimentos(1, resp);
    });
  }

  public getAllLibreriaAlimentos(pag: number = 0, key = '') {
    const params = new HttpParams({
     fromObject:{
         keyword:key,
         page:pag+'',
         take:15+''
     }
      });
    this.http.get('/Libreria-alimentos/pagination/search', { params }).subscribe((resp: any) => {
      this.storageLibreriaAlimentos.next(resp);
    });
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }
  
  up(data: LibreriaAlimentos) {
    this._guardar.next(data);
  }
  
  upEditar(data: LibreriaAlimentos) {
    this._editar.next(data);
  }
  upEliminar(id: number) {
    this._eliminar.next(id);
  }
}