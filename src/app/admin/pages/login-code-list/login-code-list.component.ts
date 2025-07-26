import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ILoginCodeListItem } from '../../models/ILoginCodeListItem';
import { LoginCodeQueryParameters } from '../../models/ILoginCodeQueryParameters';
import { CommonHttpService } from '../../services/common-http.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-login-code-list',
  templateUrl: './login-code-list.component.html',
  styleUrl: './login-code-list.component.css'
})
export class LoginCodeListComponent implements OnInit {
  Messages = Messages;
  loginCodes: ILoginCodeListItem[] = [];
  totalCount = 0;
  filters: LoginCodeQueryParameters = new LoginCodeQueryParameters();

  selectedProjectCategory?: ILoginCodeListItem;
  constructor(private commonHttpService: CommonHttpService,
    private toastr: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadLoginCodes();
  }

  loadLoginCodes() {
    this.loadingService.show();
    this.commonHttpService.getPagedLoginCodes(this.filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.loginCodes = response.data.items;
          this.totalCount = response.data.totalCount;
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  onPageChange(page: any) {
    this.filters.pageNumber = page;
    this.loadLoginCodes();
  }
}
