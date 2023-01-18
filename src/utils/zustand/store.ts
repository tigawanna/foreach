import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface NotifivationType {
    type: string;
    message: string;
}

interface LocalState {
    localValues: {
        notifocation: NotifivationType | null;
        hasNotification: boolean;
    };

    updateNotification: (notifocation: NotifivationType) => void;
    clearNotification: () => void;
}

export const useStroreValues = create<LocalState>()(
    devtools((set, get) => ({
        localValues: get()?.localValues ?? {
            notifocation: null,
            hasNotification: false
        },

        updateNotification: notifocation => {
            set(state => ({
                localValues: {
                    ...state?.localValues,
                    notifocation,
                    hasNotification: true
                }
            }));
            if (notifocation.type !== "error") {
                setTimeout(() => {
                    set(state => ({
                        localValues: {
                            ...state?.localValues,
                            notifocation: null,
                            hasNotification: false
                        }
                    }));
                }, 5000);
            }
        },

        clearNotification: () => {
            set(state => ({
                localValues: {
                    ...state?.localValues,
                    notifocation: null,
                    hasNotification: false
                }
            }));
        }
    }))
);
