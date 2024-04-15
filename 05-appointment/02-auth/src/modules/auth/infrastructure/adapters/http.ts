import axios from "axios";

import { HttpRepository } from "./http.repository";

export class Http implements HttpRepository {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
}
