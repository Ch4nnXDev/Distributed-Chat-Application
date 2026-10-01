import { create } from "zustand";
import getMe from "../hooks/authHook";


type AuthState = {
    user: string;
    loggedIn: boolean;
    setUser: (user: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    fetchUser: () => Promise<string>;

}

const authStore = create<AuthState>((set)=> ({
    user: "",
    loggedIn: false,
    setUser: (user) => set({ user }),
    setLoggedIn: (loggedIn) => set({ loggedIn }),
    fetchUser: async () => {
        const data = await getMe();
        const userId = data.data.id
        set({ user: userId });
        return userId;
    }
}))

export default authStore;