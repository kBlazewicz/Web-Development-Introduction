import { Data } from "@angular/router";

export interface Opinion {
    id: number;
    username: string;
    text: string;
    date: Date | null;
    dishKey: string;
}