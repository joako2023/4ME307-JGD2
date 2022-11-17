import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpGenericService } from "./http-generic.service";
import { debounceTime, tap } from "rxjs/operators";
import { Nutriologos } from "../interfaces/nutriolg.interface";
@Injectable({
    providedIn: 'root'
})
export class NutriologoService {


  private storageNutriologo = new BehaviorSubject({ data: [], count: 0 });
  private _keyword = new BehaviorSubject('');
  private _editar=new Subject<Nutriologos>();
 private _guardar=new Subject<FormData>();
 private _eliminar=new Subject<number>();
  public listaNutriologos  = this.storageNutriologo.asObservable();
  public keyword = this._keyword.asObservable();
  constructor(
    private http: HttpGenericService<any>
  ) {
    this.getAllNutriologos();
    this.searched();
    this.save();
    this.editar();
    this.delete();
  }

  private save() {
    this._guardar.pipe(
        debounceTime(500)
    ).subscribe(resp => {
        this.http.post('/nutriologo', resp).subscribe(respHttp =>{
          this.getAllNutriologos(1)
        }
          
        );
    });
}
private editar(){
  this._editar.pipe(
    debounceTime(500)
).subscribe((resp: any) => {
    this.http.put('/nutriologo/'+ resp.id, resp).subscribe(respHttp =>{
      this.getAllNutriologos(1)
    }
      
    );
});

}


private delete(){
this._eliminar.pipe(debounceTime(500)
).subscribe((resp) =>{
  this.http.delete('/nutriologo/'+resp).subscribe(respHttp=>{
    console.log(respHttp)
    this.getAllNutriologos(1)
  })
})
}




  private searched() {
    this._keyword.pipe(
      debounceTime(100)
    ).subscribe(resp => {
      this.getAllNutriologos(1, resp);
    });
  }

  public getAllNutriologos(pag: number = 0, key = '') {
    const params = new HttpParams({
     fromObject:{
         keyword:key,
         page:pag+'',
         take:15+''
     }
      });
    this.http.get('/nutriologo/pagination/search', { params }).subscribe((resp: any) => {
      this.storageNutriologo.next(resp);
    });
  }

  searchByKeyword(keyword: string){
    this._keyword.next(keyword);
  }
  
  up(data: FormData) {
    this._guardar.next(data);
  }
  
  upEditar(data: Nutriologos) {
    this._editar.next(data);
  }
  upEliminar(id: number) {
    this._eliminar.next(id);
  }
}