// import { Client,Account,  ID, Databases, Storage } from "appwrite";
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
            created_at: created_at,
            url: url,
            title: title,
            userId: userId,
            iconUrl: iconUrl,
            id:id,
            tag: tag
          },
        ])
        .select();
      console.log('error:: ', error)
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

  async getUrls() {
    try {
      let { data: url_cards, error } = await this.supabase
        .from("urlCard")
        .select("*");

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
          url: url,
          title: title,
          userId: userId,
          created_at: save_date,
          iconUrl: iconUrl,
          tag: tag
        })
        .eq("id", id)
        .select();
    } catch (error) {
      console.log("Appwrite service :: editUrl :: error", error);
    }
  }


  // Creating function to fetch tags

  async getTags() {
    try {
      let { data: tags, error } = await this.supabase.from("urlCard").select("tag");

      console.log(error);
      return tags;
      
    } catch (error) {
      console.log("Appwrite service :: getTags :: error", error);
    }
  }

  // creating methods for uploading and deleting files

  //   async uploadFile(file) {
  //     try {
  //       return await this.storage.createFile(
  //         conf.appwrite_bucketId,
  //         ID.unique(),
  //         file
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: uploadFile :: error", error);
  //       return false;
  //     }
  //   }

  //   async deleteFile(id) {
  //     try {
  //       await this.storage.deleteFile(conf.appwrite_bucketId, id);

  //       return true;
  //     } catch (error) {
  //       console.log("Appwrite service :: deleteFile :: error", error);
  //       return false;
  //     }
  //   }
}

const service = new Service();

export default service;
