import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

export class BaseComponent {
  user: any;

  constructor(protected localStorageService: LocalStorageService,
    protected router: Router) {
    let token = this.localStorageService.get('authorization');
    if (token) {
      this.user = this.localStorageService.get('user');
      if (this.router.url === '/login') {
        this.router.navigate(['/questions']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
