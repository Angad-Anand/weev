import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public modalRef: BsModalRef | undefined;

  constructor(private readonly bsModalService: BsModalService) { }

  openModal(
    title: string,
    message: any,
    component: any,
    className?: string): Observable<string> {
    const subject = new Subject<string>();

    this.modalRef = this.bsModalService.show(component, {

      initialState: {
        title: title,
        data: message,
      },

      class: className,

    });

    this.modalRef?.content.onClose.subscribe((result: any) => { subject.next(result); });

    return subject.asObservable();
  }
}