import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalRepository {

  public async getUnSecure(key: string): Promise<any> {

    try {

      const res: string = await localStorage.getItem(key) || '';

      return JSON.parse(res);

    } catch (error) {

      return undefined;
    }
  }

  public async setUnSecure(key: string, value: any): Promise<any> {

    try {

      return await localStorage.setItem(key, JSON.stringify(value));

    } catch (error) {

      return Promise.reject(error);
    }
  }

  public async updateUnSecure(key: string, value: any): Promise<any> {

    return await this.setUnSecure(key, value);
  }

  public async deleteUnSecure(key?: string): Promise<any> {

    try {

      if (key) {

        return await localStorage['remove']({
          key
        });
      }

      return await localStorage.clear();

    } catch (error) {

      return Promise.reject(error);
    }

  }
}