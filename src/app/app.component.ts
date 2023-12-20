import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  defaultLang: string = environment.language;
  name = '';
  message = '';

  timeOut: any;

  @ViewChild('nameCtrl') nameCtrl!: ElementRef<HTMLInputElement>;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.use(this.defaultLang);

    this.timeOut = setTimeout(() => {
      this.onTranslate();
    }, 400);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }

  onSave(): void {
    this.name = this.nameCtrl.nativeElement.value;
  }

  onTranslate() {
    this.message = this.translateService.instant('title');
    console.log(this.message);
  }
}
