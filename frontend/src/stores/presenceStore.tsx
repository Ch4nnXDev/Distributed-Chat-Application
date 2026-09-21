import { create } from "zustand";

type PresenceStatus = "online" | "offline";

type PresenceState = {
    users: Record<string, PresenceStatus>;
    setStatus: (userId: string, status: PresenceStatus) => void;
};

const PresenceStore = create<PresenceState>((set) => ({
    users: {},

    setStatus: (userId, status) => {
        set((state) => ({
            users: {
                ...state.users,
                [userId]: status
            }
        }));
    }
}));

export default PresenceStore;