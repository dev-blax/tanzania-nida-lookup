import { UserData } from './types/user-data';
export declare class NidaService {
    private readonly BASE_URL;
    private getHeaders;
    private base64ToImage;
    private processImages;
    private capitalizeKeys;
    lookupUser(nidaNumber: string): Promise<UserData | null>;
}
