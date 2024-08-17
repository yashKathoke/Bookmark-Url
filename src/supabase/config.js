import { v4 as uuidv4 } from "uuid";
import conf from "../conf/conf";
import { createClient } from "@supabase/supabase-js";

class Service {
  supabase;

  constructor() {
    this.supabase = createClient(conf.supabaseUrl, conf.supabaseAnonKey);
  }

  async addUrl({ url, title, userId, created_at, iconUrl, id, tag }) {
    try {
      const { data, error } = await this.supabase
        .from("urlCard")
        .insert([
          {
            created_at,
            url,
            title,
            userId,
            iconUrl,
            id,
            tag
          },
        ])
        .select();
      console.log('error:', error);
      return data;
    } catch (error) {
      console.log("Appwrite service :: addUrl :: error", error);
    }
  }

  async deleteUrl(id) {
    try {
      const { error } = await this.supabase.from("urlCard").delete().eq("id", id);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteUrl :: error", error);
      return false;
    }
  }

  async getUrls({ userId }) {
    try {
      const { data: url_cards, error } = await this.supabase
        .from("urlCard")
        .select("*")
        .eq("userId", userId);

      return url_cards;
    } catch (error) {
      console.log("Appwrite service :: getUrls :: error", error);
    }
  }

  async editUrl(id, { url, iconUrl, title, userId, save_date, tag }) {
    try {
      const { data, error } = await this.supabase
        .from("urlCard")
        .update({
          url,
          title,
          userId,
          created_at: save_date,
          iconUrl,
          tag
        })
        .eq("id", id)
        .select();
    } catch (error) {
      console.log("Appwrite service :: editUrl :: error", error);
    }
  }

  async getTags({userId}) {
    try {
      const { data: tags, error } = await this.supabase.from("urlCard").select("tag").eq("userId", userId);
      console.log(error);
      return tags;
    } catch (error) {
      console.log("Appwrite service :: getTags :: error", error);
    }
  }
}

const service = new Service();

export default service;
