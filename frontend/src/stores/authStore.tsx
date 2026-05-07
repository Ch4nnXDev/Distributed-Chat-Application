import { create } from "zustand";
import getMe from "../hooks/authHook";


type AuthState = {
    user: string;
    loggedIn: boolean;
    setUser: (user: string) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    fetchUser: () => Promise<void>;

}

const authStore = create<AuthState>((set)=> ({
    user: "",
    loggedIn: false,
    setUser: (user) => set({ user }),
    setLoggedIn: (loggedIn) => set({ loggedIn }),
    fetchUser: async () => {
        const data = await getMe();
        set({ user: data.data.id });
    }
}))

export default authStore;