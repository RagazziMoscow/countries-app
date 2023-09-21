import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import User from "@/models/User";
import Country from "@/models/Country";

export default class Api {
  protected static instance: Api;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  public async getAllCountries(): Promise<Country[]> {
    const options: AxiosRequestConfig = {
      url: "https://restcountries.com/v3.1/all",
      method: "get"
    };

    return this.execute(options);
  }

  public async register(user: User): Promise<void> {
    return new Promise<void>((resolve) => {
      // NOTE: emulation a request
      setTimeout(() => {
        console.log(user);
        resolve();
      }, 2000);
    });
  }

  public async updateCurrentUser(user: User): Promise<User> {
    return new Promise<User>((resolve) => {
      // NOTE: emulation a request
      setTimeout(() => {
        console.log(user);
        resolve(user);
      }, 2000);
    });
  }

  // eslint-disable-next-line
  private async execute(options: AxiosRequestConfig): Promise<any> {
    return (await this.axiosInstance.request(options)).data;
  }
}
