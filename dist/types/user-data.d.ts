/// <reference types="node" />
/// <reference types="node" />
export interface UserData {
    [key: string]: any;
    PHOTO?: string | Buffer;
    SIGNATURE?: string | Buffer;
}
export interface NidaResponse {
    obj: {
        result?: UserData;
        error?: string;
    };
}
