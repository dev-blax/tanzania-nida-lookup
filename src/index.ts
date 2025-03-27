import { NidaService } from './nida-service';
import { UserData, NidaResponse } from './types/user-data';

export { NidaService, UserData, NidaResponse };

// Create a default instance for convenience
export const nidaService = new NidaService();
