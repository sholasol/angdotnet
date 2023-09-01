import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/services/auth.service'; // Replace 'path-to-auth-service' with the actual path to your AuthService
import {inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const isLoggedInGuard = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ):boolean => {

        const auth = inject(AuthService);
        const toast = inject(NgToastService);
        const router = inject(Router);
        //return auth.isLoggedIn()
        if(auth.isLoggedIn()){
            router.navigate(['dashboard'])
            return false;
        }else{
            return true;
        }
    };
