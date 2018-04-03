import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http'
import { IonicStorageModule } from '@ionic/storage';
import { MenuPage } from '../pages/menu/menu';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoryDetailPage } from '../pages/category-detail/category-detail';
import { SearchPage } from '../pages/search/search';
import { ProductPage } from '../pages/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';

import { Api } from '../providers/api';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Network } from '@ionic-native/network';

export function providers() {
  return [
    StatusBar,
    SplashScreen,
    Api,
    FileTransfer,
    File,
    Network,
    FilePath,
    ToastController,
    FileTransferObject,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
}

@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    ContactPage,
    HomePage,
    CategoryDetailPage,
    ProductPage,
    SearchPage,
    ProductDetailPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    ContactPage,
    HomePage,
    CategoryDetailPage,
    SearchPage,
    ProductDetailPage,
    ProductPage,
    TabsPage
  ],
  providers: providers()
})
export class AppModule {}
