import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { normalizeURL} from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
	peso: any;
  altura: any;
  resultado: any;

	constructor(
		public navCtrl: NavController,
		private transfer: FileTransfer, 
		private file: File,
		private filePath: FilePath


		) {
		

	}

  calcular(){
     this.resultado = ((0.7184 * (Math.pow(this.altura, 0.725)) * Math.pow(this.peso, 0.425)) / 100).toFixed(2);
  }
  

}
