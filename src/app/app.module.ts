import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularDraggableModule } from 'angular2-draggable';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CachingInterceptorComponent } from './caching-interceptor/caching-interceptor.component';
import { RequestCacheService } from './request-cache.service';
import { BoxDialogComponent } from './box-dialog/box-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        MainContentComponent,
        CachingInterceptorComponent,
        BoxDialogComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularDraggableModule,
        MatDialogModule,
        RouterModule.forRoot([
            { path: 'main', component: MainContentComponent },
            { path: 'caching', component: CachingInterceptorComponent }
        ])
    ],
    providers: [
        RequestCacheService,
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorComponent, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
