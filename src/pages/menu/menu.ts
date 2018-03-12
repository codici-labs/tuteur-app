import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { normalizeURL} from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
	tempImagePath: string;
	constructor(
		public navCtrl: NavController,
		private transfer: FileTransfer, 
		private file: File,
		private filePath: FilePath


		) {
		this.download();

	}


  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://web.tuteur.com.ar/app/img/logo-137x165.png';
    fileTransfer.download(url, this.file.dataDirectory + 'test.png').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      let imagePath = this.file.dataDirectory +'test.png';
      this.tempImagePath = imagePath;
   
    }, (error) => {
        console.log('Hubo un probelma al recuperar el archivo');
    });
  }

}
