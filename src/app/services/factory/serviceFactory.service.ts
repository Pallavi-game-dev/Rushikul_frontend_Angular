import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceFactoryService {

  activeElm: any;

  constructor() { }
  msgPop(msg: any, type: any) {
    ////
    Swal.fire({
      buttonsStyling: false,
      allowOutsideClick: false,
      showCloseButton: false,
      customClass: {
        container: 'modal-yes-no swal-msg-type',
        popup: 'modalBG',
        actions: 'modal-btn-yes-no mb-4',
        closeButton: 'btn-modal-dismiss',
        icon: 'modal-icon-top',
        confirmButton: 'mat-raised-button mat-button-base mat-primary',
      },
      title: type,
      html: msg,
      icon: type,
    })
  }

  //    ========================= loader ==========================
  loadingStart(elm: any, msg: string, btn: string) {
    //
    let ifLoading = document.querySelector('#loading-' + elm.slice(1) + '-overlay');
    if (ifLoading != null) {
      ifLoading.remove();
    }
    let target = document.querySelector(elm);
    if (target != null) {
      target.style.position = "relative";
      var wrapper = document.createElement('div');
      wrapper.className = 'loading-overlay-wrapper';
      wrapper.id = 'loading-' + elm.slice(1) + '-overlay';

      var container = document.createElement('div');
      container.className = 'loading-container';
      container.innerHTML = msg;
      wrapper.appendChild(container);

      var icon = document.createElement('i');
      icon.className = 'loading-spinner';
      container.appendChild(icon);

      target.appendChild(wrapper);
    }


  }

  loadingStop(elm: string, btn: string) {
    //
    let removeElm = document.querySelector('#loading-' + elm.slice(1) + '-overlay');
    if (removeElm != null) {
      removeElm.remove();
    }

  }
  //  ====================== loder end ==========================
  // # Region notification
  notification(message: string, type: any, time?: any) {
    this.activeElm = document.activeElement;
    let messageType: any
    if (type == true) {
      messageType = 'success';
    } else if (type == false) {
      messageType = 'error';
    } else {
      messageType = type
    }

    // messageType = (type ? 'success' : 'error');
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: messageType,
      title: message,
      showConfirmButton: false,
      // allowOutsideClick:false,
      customClass: {
        container: 'notification',
        popup: messageType,
      },
      timer: time ? time : 3000
    });
    //debugger
    if (this.activeElm && this.activeElm != null) {
      this.activeElm.focus()
    }

  }
  //# End - Region notification

  // Logout
  logout(message: string = '') {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      title: message ? message : 'Logout Successful',
      icon: message ? 'error' : 'success',
      timer: 1500,
      allowOutsideClick: false,
      showConfirmButton: false,

      customClass: {

        container: 'notification',
        popup: message ? 'error' : 'success',
      },
    }).then(() => {
      window.location.href = 'http://localhost:4200/login';// Redirect after 2 seconds
    })
  }

}
