import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DOCUMENT } from '@angular/common';

declare var gtag;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public name = '';
  public finalName = '';
  public show: boolean = false;
  public showName: boolean = false;
  public send: boolean = false;
  public showDiv: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((param) => {
      if (param['name']) {
        this.finalName = param['name'];
        this.showName = true;
      } else {
        this.router.navigate(['']);
        //this.show = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onEnterNameClick() {
    this.finalName = this.name;
    this.show = true;
    this.showName = true;
    this.send = true;
    gtag('event', 'NAME_BUTTON_CLICK', {
      event_category: 'BUTTON_CLICK',
      event_label: 'Enter Name Button Click',
      value: 'Enter Name Button Click',
    });
    this.router.navigate(['/home'], { queryParams: { name: this.name } });
  }

  onSendClick() {
    gtag('event', 'WHATSAPP_SEND_BUTTON_CLICK', {
      event_category: 'BUTTON_CLICK',
      event_label: 'WhatsApp Send Button Click',
      value: 'WhatsApp Send Button Click',
    });

    if (navigator.userAgent.match(/iPhone|Android/i)) {
      this.document.location.href =
        'whatsapp://send?l=en&text=' +
        this.name +
        ' ने आपके लिए कुछ भेजा है  💐💐 %0A ब्लू लाइन को टच करके देखो  %0A 👇 👇%0A %0A' +
        encodeURIComponent(
          'http://holi.shreejilending.com/#/home?name=' +
            encodeURIComponent(this.name)
        );
    } else {
      this.document.location.href =
        'https://web.whatsapp.com/send?l=en&text=' +
        this.name +
        ' ने आपके लिए कुछ भेजा है  💐💐 %0A ब्लू लाइन को टच करके देखो  %0A 👇 👇%0A %0A' +
        encodeURIComponent(
          'http://holi.shreejilending.com/#/home?name=' +
            encodeURIComponent(this.name)
        );
    }
  }

  onLogoClick() {
    this.showDiv = true;
  }
}
