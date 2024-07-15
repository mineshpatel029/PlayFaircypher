import { Component } from '@angular/core';
import { PlayfairCipherService } from '../playfair-cipher.service';

@Component({
  selector: 'app-playfair',
  templateUrl: './playfair.component.html',
  styleUrls: ['./playfair.component.css']
})
export class PlayfairComponent {
  key: string = '';
  plainText: string = '';
  cipherText: string = '';
  decryptedText: string = ''; // New property for decrypted text

  constructor(private playfairCipherService: PlayfairCipherService) {}

  onSubmit() {
    this.cipherText = this.playfairCipherService.encrypt(this.plainText, this.key);
  }

  onDecrypt() {
    this.decryptedText = this.playfairCipherService.decrypt(this.cipherText, this.key);
  }

  onPlainTextChange() {
    this.cipherText = '';
    this.decryptedText = ''; // Clear decrypted text when plain text changes
  }
}
