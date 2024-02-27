import AxiosManager from "../utils/AxiosManager";

const BASE_URL = "http://127.0.0.1:8000/api";

class MenuAPI {
  constructor() {
    this.API_URL = BASE_URL;
    this.axios = new AxiosManager(this.API_URL);
  }

  async getMenuItems(endpoint) {
    try {
      const response = await this.axios.get(endpoint);
      return response;
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }
  }

  async addMenuItem(endpoint, data) {
    try {
      const response = await this.axios.post(endpoint, data, true);
      return response;
    } catch (error) {
      console.error("Error updating menu item text:", error);
      throw error;
    }
  }

  async updateMenuItemText(endpoint, newText) {
    //const endpoint = `menu-items/${itemId}`;
    const data = { item_name: newText };

    try {
      const response = await this.axios.put(endpoint, data);
      return response;
    } catch (error) {
      console.error("Error updating menu item text:", error);
      throw error;
    }
  }

  async deleteMenuItem(endpoint) {
    try {
      const response = await this.axios.put(endpoint, {});
      return response;
    } catch (error) {
      console.error("Error updating menu item text:", error);
      throw error;
    }
  }
}

export default new MenuAPI();
