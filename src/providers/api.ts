import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
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
import { SplashScreen } from '@ionic-native/splash-screen';


@Injectable()
export class Api {

  url: string = 'http://codicilabs.com/trabajos/tuteur/api/';
  products:  any = [];
  categories: any;
  tempImagePath: string;
  imageDirectory: string = '';
  version: number = 0;
  loader: any;

  constructor(
    private http: Http,
    public plt: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer, 
    private file: File,
    private filePath: FilePath,
    private splashscreen: SplashScreen,
    private toastCtrl: ToastController
    ) {
     
    
      
  }

  
  getJson(){
    this.loader = this.loadingCtrl.create({
      content: "Actualizando...",
      duration: 3000
    });
    this.loader.present();
    
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        console.log('Recibiendo json');
        this.storage.set('categorias', data); 
        this.getImages();
    });
    
  }

  update(){
    this.storage.get('version').then((val) => {
        console.log('Obteniendo version: '+val);

        if(val == 'null'){
          this.version = 0;
        }else{
          this.version = val;
        }

        this.http.get(this.url+'index.php/welcome/update/'+this.version).map(res => res.json()).subscribe(data => {
            console.log('Ultima version :'+data);
            console.log('Version actual :'+this.version);
            if(data > this.version){
              this.version = data;
              this.getJson();
            }
        });
        
   
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
     console.log('Version antes de update: '+this.version);
    for (let image of this.products) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'http://web.tuteur.com.ar/app/archivos/productos/'+image;
      
      fileTransfer.download(url, this.file.dataDirectory + image).then((entry) => {
        let imagePath = this.file.dataDirectory +image;
        this.tempImagePath = imagePath;
        this.imageDirectory = this.file.dataDirectory;
      }, (error) => {
          console.log('Hubo un probelma al recuperar el archivo');
      });
    }

    this.loader.dismiss();
    this.storage.set('version', this.version);
    
    console.log('Version despues de update: '+this.version);
    
    

  }
}
