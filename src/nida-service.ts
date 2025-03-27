import axios, { AxiosRequestConfig } from 'axios';
import { Buffer } from 'buffer';
import sharp from 'sharp';
import { UserData, NidaResponse } from './types/user-data';

export class NidaService {
  private readonly BASE_URL: string = "https://ors.brela.go.tz/um/load/load_nida/{}";

  private getHeaders(): AxiosRequestConfig['headers'] {
    return {
      "Content-Type": "application/json",
      "Content-Length": "0",
      "Connection": "keep-alive",
      "Accept-Encoding": "gzip, deflate, br",
    };
  }

  private async base64ToImage(imageStr: string | Buffer | undefined): Promise<Buffer | undefined> {
    if (!imageStr) return undefined;
    if (Buffer.isBuffer(imageStr)) return imageStr;
    
    try {
      const imageBuffer = Buffer.from(imageStr, 'base64');
      return await sharp(imageBuffer).toBuffer();
    } catch (error) {
      console.error('Image conversion error:', error);
      return undefined;
    }
  }

  private async processImages(userData: UserData): Promise<UserData> {
    if (userData.PHOTO) {
      userData.PHOTO = await this.base64ToImage(userData.PHOTO);
    }
    if (userData.SIGNATURE) {
      userData.SIGNATURE = await this.base64ToImage(userData.SIGNATURE);
    }
    return userData;
  }

  private capitalizeKeys(userData: UserData): UserData {
    const processedData: UserData = {};
    for (const [key, value] of Object.entries(userData)) {
      processedData[key.toUpperCase()] = value;
    }
    return processedData;
  }

  public async lookupUser(nidaNumber: string): Promise<UserData | null> {
    try {
      const url = this.BASE_URL.replace('{}', nidaNumber);
      const response = await axios.get<NidaResponse>(url, {
        headers: this.getHeaders(),
      });

      if (response.data?.obj?.result) {
        const userData = this.capitalizeKeys(response.data.obj.result);
        return await this.processImages(userData);
      }

      return null;
    } catch (error) {
      console.error('NIDA lookup error:', error);
      throw error;
    }
  }
}
