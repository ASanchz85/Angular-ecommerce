import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { Role } from 'src/app/models/roles.type';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appRoles]',
})
export class RolesDirective implements OnInit, OnDestroy {
  @Input('appRoles') allowedRoles?: Role[];
  private sub?: Subscription;

  constructor(
    private _auth: AuthService,
    private _viewCRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.sub = this._auth.user$
      .pipe(
        map((user) =>
          Boolean(this.allowedRoles?.includes(user?.role || 'Customer'))
        ),
        tap((ifRole) =>
          ifRole
            ? this._viewCRef.createEmbeddedView(this._templateRef)
            : this._viewCRef.clear()
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
