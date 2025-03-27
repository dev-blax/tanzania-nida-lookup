import { nidaService } from '../../src';

// Note: These tests require an actual NIDA API connection
// They are marked as skip by default to avoid API calls during regular testing
describe('NIDA API Integration', () => {
  const validNidaNumber = process.env.TEST_NIDA_NUMBER; // Should be set in env for testing

  beforeAll(() => {
    if (!validNidaNumber) {
      console.warn('TEST_NIDA_NUMBER environment variable is not set. Integration tests will be skipped.');
    }
  });

  describe('lookupUser Integration', () => {
    it.skip('should fetch real user data from NIDA API', async () => {
      if (!validNidaNumber) {
        return;
      }

      const result = await nidaService.lookupUser(validNidaNumber);
      
      expect(result).toBeTruthy();
      if (result) {
        expect(result.FIRSTNAME).toBeDefined();
        expect(result.LASTNAME).toBeDefined();
        // Note: Photo and signature might not always be present
        if (result.PHOTO) {
          expect(Buffer.isBuffer(result.PHOTO)).toBe(true);
        }
        if (result.SIGNATURE) {
          expect(Buffer.isBuffer(result.SIGNATURE)).toBe(true);
        }
      }
    });

    it.skip('should handle invalid NIDA number', async () => {
      const result = await nidaService.lookupUser('invalid-nida-number');
      expect(result).toBeNull();
    });
  });
});
