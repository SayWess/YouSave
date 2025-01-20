export interface Item {
    id: string;
    title: string;
    thumbnail: string;
    state: "idle" | "downloading" | "downloaded";
    storagePath: string;
    url?: string;
    subtitles?: boolean;
    quality?: string;
    video?: boolean;
}

export interface Video extends Item {};
export interface Playlist extends Item {};
