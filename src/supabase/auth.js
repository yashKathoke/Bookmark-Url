import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

import { createClient } from '@supabase/supabase-js'
import { data } from "autoprefixer";



class AuthService {
    supabase;
    // account;
    constructor(){

        this.supabase = createClient(conf.supabaseUrl, conf.supabaseAnonKey,  {
            persistSession: true,
          });

        // this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}){

        try {
            const {user, err} = await this.supabase.auth.signUp({
                email,
                password,
              })
            if(user){
                this.login({email, password});
            }
            return user;
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
        }
    }

    async login({email, password}){
        try {
            

            let { data, error } = await this.supabase.auth.signInWithPassword({email, password})
            console.log("Login error::   ",error);
            
              

            return data.user;
  
        } catch (error) {
            throw error;
        }
    }


    async logout(){
        try {
            
            let { error } = await this.supabase.auth.signOut()

        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    async getAccount(){
        try {
            
            const { data: { user },error } = await this.supabase.auth.getUser(); 
            console.log("Error::   ",error);
              
            return user;

        } catch (error) {
            console.log("Appwrite service :: getAccount :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService;