import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayfairCipherService {

  private keyMatrix: string[][] = [];

  constructor() { }

  private generateKeyMatrix(key: string): void {
    const alphabet = 'abcdefghiklmnopqrstuvwxyz'; // 'j' is usually omitted
    key = key.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i');
    let keyString = '';

    // Add key characters to keyString
    for (const char of key) {
      if (!keyString.includes(char)) {
        keyString += char;
      }
    }

    // Add remaining alphabet characters to keyString
    for (const char of alphabet) {
      if (!keyString.includes(char)) {
        keyString += char;
      }
    }

    // Fill the key matrix
    this.keyMatrix = [];
    for (let i = 0; i < 5; i++) {
      this.keyMatrix.push(keyString.slice(i * 5, i * 5 + 5).split(''));
    }
  }

  private preprocessText(text: string): string {
    text = text.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i');
    let processedText = '';

    for (let i = 0; i < text.length; i += 2) {
      let pair = text[i];
      if (i + 1 < text.length) {
        if (text[i] === text[i + 1]) {
          pair += 'x';
          i--;
        } else {
          pair += text[i + 1];
        }
      } else {
        pair += 'x';
      }
      processedText += pair;
    }

    return processedText;
  }

  private findPosition(char: string): [number, number] {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.keyMatrix[row][col] === char) {
          return [row, col];
        }
      }
    }
    return [-1, -1];
  }

  public encrypt(plainText: string, key: string): string {
    this.generateKeyMatrix(key);
    const processedText = this.preprocessText(plainText);
    let encryptedText = '';

    for (let i = 0; i < processedText.length; i += 2) {
      const [row1, col1] = this.findPosition(processedText[i]);
      const [row2, col2] = this.findPosition(processedText[i + 1]);

      if (row1 === row2) {
        encryptedText += this.keyMatrix[row1][(col1 + 1) % 5];
        encryptedText += this.keyMatrix[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
        encryptedText += this.keyMatrix[(row1 + 1) % 5][col1];
        encryptedText += this.keyMatrix[(row2 + 1) % 5][col2];
      } else {
        encryptedText += this.keyMatrix[row1][col2];
        encryptedText += this.keyMatrix[row2][col1];
      }
    }

    return encryptedText;
  }

  public decrypt(cipherText: string, key: string): string {
    this.generateKeyMatrix(key);
    const processedText = this.preprocessText(cipherText);
    let decryptedText = '';

    for (let i = 0; i < processedText.length; i += 2) {
      const [row1, col1] = this.findPosition(processedText[i]);
      const [row2, col2] = this.findPosition(processedText[i + 1]);

      if (row1 === row2) {
        decryptedText += this.keyMatrix[row1][(col1 + 4) % 5];
        decryptedText += this.keyMatrix[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        decryptedText += this.keyMatrix[(row1 + 4) % 5][col1];
        decryptedText += this.keyMatrix[(row2 + 4) % 5][col2];
      } else {
        decryptedText += this.keyMatrix[row1][col2];
        decryptedText += this.keyMatrix[row2][col1];
      }
    }

    return decryptedText;
  }
}
