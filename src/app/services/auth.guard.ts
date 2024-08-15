import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const isAdmin = false; // Hardcoded role check
  
  if (isAdmin) {
    return true; // Allow access
  } else {
    router.navigate(['/page']); // Redirect to login if not authorized
    return false; // Deny access
  }
};
