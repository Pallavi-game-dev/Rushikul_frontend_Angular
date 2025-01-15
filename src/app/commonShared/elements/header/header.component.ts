import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenu) menu!: MatMenu;
  menuLink: any = [];
  role: any = '';
  mobileView: boolean = false;
  activeUser: string | undefined;
  username: string = 'John Doe'
  @Input() isOpened: boolean = false;
  time: any // global variable for string interpolation on html

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    let rushikul_data= this.cookieService.get('rushikul_data');
    console.log(rushikul_data);
    if(rushikul_data !=''){
    let userdata = JSON.parse(this.cookieService.get('rushikul_data') ?? '');

      this.role = userdata.role;
      this.username = userdata.name
    }

    // let userData = this.commonService.getCurrentUser();
    // this.activeUser = userData.activeRole;
    this.getMenuList();
  }


  @Output() sidebarToggle: EventEmitter<void> = new EventEmitter<void>();

  emitSidebarToggle() {
    this.sidebarToggle.emit();
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe(data => {
        if (data.matches) {
          this.mobileView = true;

        } else {
          this.mobileView = false;

        }
      });
    this.getCurrentDate();
  }


  getMenuList() {
    this.menuLink.push(

      {
        title: 'Directors',
        url: '/employee/directors',
        icon: 'fa-solid fa-user',
        active: false,
      },
      {
        title: 'Customer',
        url: '/employee/customer',
        icon: 'fas fa-tasks',
        active: false,
      },
      {
        title: 'Agent',
        url: '/employee/agents',
        icon: 'fa-solid fa-user',
        active: false,
      },
      {
        title: 'Loan',
        url: '/employee/loan',
        icon: 'fas fa-share',
        active: false,

      },
      {
        title: 'Deposite',
        url: '/employee/deposite',
        icon: 'fas fa-share',
        active: false,

      }

    );
  }




  menuOpened() {

    let profile_name = document.querySelector('.profile_name')?.classList
    if (profile_name) {
      profile_name.add('profile_active');
    }

  }
  menuClosed() {

    let profile_name = document.querySelector('.profile_name')?.classList
    if (profile_name) {
      profile_name.remove('profile_active');
    }
  }

  // ******* logout *********
  logout(url: any) {
    // Swal.fire({
    //   title: 'Logout',
    //   html: 'Are you sure you want to logout?',
    //   icon: 'question',
    //   iconColor: '#E66565',
    //   color: '#E66565',
    //   backdrop: true,
    //   allowOutsideClick: false,
    //   width: '36em',
    //   showCloseButton: true,
    //   buttonsStyling: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Logout',
    //   cancelButtonText: 'Cancel',
    //   confirmButtonColor: '2A62D6',
    //   cancelButtonColor: '#E66565'
    // }).then((data: any) => {
    //   ////
    //   if (data.value) {
    //     // this.userlogin.logout(url);
    //   }
    // });
  }
  // ******** logout end *******

  getCurrentDate() {
    setInterval(() => {
      this.time = new Date(); //set time variable with current date
      // this.time = moment(this.time).format("Do MMM YYYY  HH:mm")
    }, 1000); // set it every one seconds}
  }
}
