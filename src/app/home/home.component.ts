import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public name = "👉 Person's Name";
  public show: boolean = false;
  public send: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((param) => {
      if (param['name']) {
        this.name = param['name'];
        this.show = true;
      } else {
        this.router.navigate(['']);
        this.show = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onEnterNameClick() {
    this.send = true;
    this.router.navigate(['/home'], { queryParams: { name: this.name } });
  }

  onSendClick() {
    if (navigator.userAgent.match(/iPhone|Android/i)) {
      this.document.location.href =
        'whatsapp://send?l=en&text=' +
        this.name +
        ' ने आपके लिए कुछ भेजा है  %0A ब्लू लाइन को टच करके देखो  %0A 👇 👇%0A %0A' +
        encodeURIComponent('https://anuj-mor.github.io/Holi/home?name=' + this.name) +
        '%0A%0A' +
        'ब्लू लाइन को टच करके आप भी भेजें %0A 👇 👇%0A %0A' +
        encodeURIComponent('https://anuj-mor.github.io/Holi/home');
    } else {
      this.document.location.href =
        'https://web.whatsapp.com/send?l=en&text=' +
        this.name +
        ' ने आपके लिए कुछ भेजा है  %0A ब्लू लाइन को टच करके देखो  %0A 👇 👇%0A %0A' +
        encodeURIComponent('https://anuj-mor.github.io/Holi/home?name=' + this.name) +
        '%0A%0A' +
        'ब्लू लाइन को टच करके आप भी भेजें %0A 👇 👇%0A %0A' +
        encodeURIComponent('https://anuj-mor.github.io/Holi/home');
    }
  }
}
