import {Injectable, Pipe, PipeTransform} from "@angular/core";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'imagequery'
})
export class ImageQueryPipe implements PipeTransform {
  transform(value: string): any {
    return environment.backendUrl + '/uploads/' + value;
  }
}