import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getCurrentUser(); // We will check this method in AuthService next
        // Or check token presence
        if (localStorage.getItem('token')) {
            // Logged in so return true
            return true;
        }

        // Not logged in so redirect to login page with the return url
        this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
