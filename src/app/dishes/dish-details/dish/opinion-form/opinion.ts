import { Data } from "@angular/router";

export interface Opinion {
    key: string;
    email: string;
    opinion: string;
    date: Date | null;
    dishKey: string;
}