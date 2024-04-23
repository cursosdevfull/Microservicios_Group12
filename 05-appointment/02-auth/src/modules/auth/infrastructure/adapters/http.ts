import { Parameters } from "@core";
import axios from "axios";

import { HttpRepository } from "./http.repository";

export class Http implements HttpRepository {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(Parameters.serviceUserLogin, {
        email,
        password,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to login");
    }
  }
}
