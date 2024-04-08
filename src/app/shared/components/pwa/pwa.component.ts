import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

enum ModalPlatform {
  ANDROID = "ANDROID",
  iOS = "IOS",
}

@Component({
  selector: 'app-pwa',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pwa.component.html',
  styleUrls: ['./pwa.component.scss']
})
export class PwaComponent implements OnInit {

  swUpdate = inject(SwUpdate);
  platform = inject(Platform);

  modalVersion: boolean = false;
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;

  public get isAndroid(): boolean {
    return this.modalPwaPlatform === ModalPlatform.ANDROID;
  }

  public get isIOS(): boolean {
    return this.modalPwaPlatform === ModalPlatform.iOS;
  }
  
  public ngOnInit(): void {
    this.loadModalPwa();

    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this.modalVersion = true;
      }
    });

    this.serviceWorkerReady();
  }

  private serviceWorkerReady() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          console.log('service worker registered', registration);
        })
        .catch(function (err) {
          console.log("Service Worker Failed to Register", err);
        })
    }
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }


  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = ModalPlatform.ANDROID;
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = ModalPlatform.iOS;
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }
}
