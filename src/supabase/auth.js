import { createClient } from '@supabase/supabase-js';
import conf from '../conf/conf';

class AuthService {
    constructor() {
        this.supabase = createClient(conf.supabaseUrl, conf.supabaseAnonKey, {
            persistSession: true,
        });
    }

    async createAccount({ email, password }) {
        try {
            const { user, error } = await this.supabase.auth.signUp({
                email,
                password,
            });
            return user;
        } catch (error) {
            console.log('AuthService :: createAccount :: error', error);
        }
    }

    async login({ email, password }) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password,
            });
            console.log('Login error:', error);
            const session = data.user;
            return { session, error };
        } catch (error) {
            throw error;
            
        }
    }

    async logout() {
        try {
            await this.supabase.auth.signOut();
        } catch (error) {
            console.log('AuthService :: logout :: error', error);
        }
    }

    async getAccount() {
        try {
            const { data: { user }, error } = await this.supabase.auth.getUser();
            console.log('Error:', error);
            return user;
        } catch (error) {
            console.log('AuthService :: getAccount :: error', error);
        }
    }
}

const authService = new AuthService();

export default authService;
