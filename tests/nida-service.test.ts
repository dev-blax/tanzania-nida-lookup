import axios from 'axios';
import { NidaService } from '../src/nida-service';
import { UserData } from '../src/types/user-data';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NidaService', () => {
  let nidaService: NidaService;

  beforeEach(() => {
    nidaService = new NidaService();
    jest.clearAllMocks();
  });

  describe('lookupUser', () => {
    const mockNidaNumber = '20000313411070000121';
    const mockUserData: UserData = {
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      PHOTO: 'base64EncodedPhoto',
      SIGNATURE: 'base64EncodedSignature'
    };

    it('should successfully lookup user data', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          obj: {
            result: mockUserData
          }
        }
      });

      const result = await nidaService.lookupUser(mockNidaNumber);
      
      expect(result).toBeTruthy();
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(mockNidaNumber),
        expect.any(Object)
      );
      
      if (result) {
        expect(result.FIRSTNAME).toBe(mockUserData.FIRSTNAME);
        expect(result.LASTNAME).toBe(mockUserData.LASTNAME);
        expect(result.PHOTO).toBeDefined();
        expect(result.SIGNATURE).toBeDefined();
      }
    });

    it('should return null when user is not found', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          obj: {
            result: null,
            error: 'User not found'
          }
        }
      });

      const result = await nidaService.lookupUser(mockNidaNumber);
      expect(result).toBeNull();
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(nidaService.lookupUser(mockNidaNumber))
        .rejects
        .toThrow(errorMessage);
    });

    it('should handle invalid image data', async () => {
      const invalidImageData: UserData = {
        FIRSTNAME: 'John',
        LASTNAME: 'Doe',
        PHOTO: 'invalid-base64',
        SIGNATURE: 'invalid-base64'
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: {
          obj: {
            result: invalidImageData
          }
        }
      });

      const result = await nidaService.lookupUser(mockNidaNumber);
      
      expect(result).toBeTruthy();
      if (result) {
        expect(result.FIRSTNAME).toBe(invalidImageData.FIRSTNAME);
        expect(result.LASTNAME).toBe(invalidImageData.LASTNAME);
        expect(result.PHOTO).toBeUndefined();
        expect(result.SIGNATURE).toBeUndefined();
      }
    });
  });
});
