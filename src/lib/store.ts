import { writable } from "svelte/store";
export const isTalking = writable(false);
export const chats = writable<ChatType[]>([]);
export interface ChatType {
    isLofi: boolean;
    isLastMessage: boolean;
    message: string;
    userName: string;
    profileImg:string;
}