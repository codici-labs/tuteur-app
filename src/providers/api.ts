import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { normalizeURL} from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';

@Injectable()
export class Api {

  url: string = 'http://codicilabs.com/trabajos/tuteur/api/';
  products:  any = [];
  categories: any;
  tempImagePath: string;
  imageDirectory: string = '';

  constructor(
    private http: Http,
    public plt: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer, 
    private file: File,
    private filePath: FilePath
    ) {
     
      
  }

  
  getJson(){
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        console.log('Recibiendo json');
        this.storage.set('categorias', data); 
        this.getImages();
    });
  }
     
  getImages(){
    this.storage.get('categorias').then((val) => {
       
       this.categories = val;
       var that = this;
       for (let category of this.categories) {
          that.products.push(category.portada);
          for (let product of category.products) {
            that.products.push(product.imagen);
            that.products.push(product.portada);
          }
          
        }

        this.download();

      
     });
  }

  download() {
    for (let image of this.products) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'http://web.tuteur.com.ar/app/archivos/productos/'+image;
      
      fileTransfer.download(url, this.file.dataDirectory + image).then((entry) => {
        //console.log('download complete: ' + entry.toURL());
        let imagePath = this.file.dataDirectory +image;
        this.tempImagePath = imagePath;
        this.imageDirectory = this.file.dataDirectory;
      }, (error) => {
          console.log('Hubo un probelma al recuperar el archivo');
      });
    }
    
  }
}