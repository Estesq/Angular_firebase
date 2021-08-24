import { Injectable } from '@angular/core';

interface CharMap {
  [index: number]: boolean
}

class RandomUint8 {
  private static readonly CHUNK_SIZE: number = 64;
  private buffer: Uint8Array = new Uint8Array(RandomUint8.CHUNK_SIZE);
  private index : number = RandomUint8.CHUNK_SIZE;
  private crypto: Crypto;
  constructor(crypto: Crypto) {
    this.crypto = crypto;
  }
  private fillBuffer(): void {
    this.crypto.getRandomValues(this.buffer);
  }
  getNext(): number {
    if (this.index >= RandomUint8.CHUNK_SIZE) {
      this.fillBuffer();
      this.index = 0;
    }
    let value = this.buffer[this.index];
    this.index += 1;
    return value;
  }
}

@Injectable()
export class PasswordGeneratorService {
  capital: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  small: string = "abcdefghijklmnopqrstuvwxyz";
  number: string = "0123456789";
  space: string = " ";
  easysymbol: string = "!\"#'()*+,-./:=?@~";
  othersymbol: string = "$%&;<>[\\]^_`{|}";
  ambiguous: string = "Il1O0";
  chars: string;

  constructor() {
    this.chars = this.small + this.capital + this.number + this.easysymbol;
    this.chars = this.chars.replace(new RegExp(this.ambiguous.split("").join("|"), "g"), "");
  }

  makeCharMap(): CharMap {
    let charMap: CharMap = {};
    let lenChars = this.chars.length;
    for (let i = 0; i < lenChars; i++) {
      charMap[this.chars.charCodeAt(i)] = true;
    }
    return charMap;
  }
  generate(passwordLength: number): string {
    let charMap = this.makeCharMap();
    let cntPwd = 0;
    let buf = new Uint8Array(passwordLength);
    let rnd = new RandomUint8(window.crypto);

    let lenPwd = 0;
    while (lenPwd < passwordLength) {
      let c = rnd.getNext();
      if (charMap[c] === true) {
        buf[lenPwd] = c;
        lenPwd += 1;
      }
    }
    return String.fromCharCode.apply(null, buf);
  }
}
