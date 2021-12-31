import { Data } from "@angular/router";

export interface Opinion {
    id: number;
    username: string;
    opinion: string;
    date: Data;
}