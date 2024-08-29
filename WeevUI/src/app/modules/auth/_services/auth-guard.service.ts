import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  Router, 
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {  

   constructor(private router: Router) { }

 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
        // logged in so return true
        return true;
    } else {
      this.router.navigate(['/']);
    }

    // not logged in so redirect to login page with the return url
    //this.router.navigate(['Login'], { queryParams: { returnUrl: state.url }});
    return false;
}
}
