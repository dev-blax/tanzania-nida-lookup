import { nidaService } from '../src';

async function basicExample() {
  try {
    // Replace with a valid NIDA number
    const userData = await nidaService.lookupUser('123456789');
    
    if (userData) {
      console.log('User Information:');
      console.log('----------------');
      Object.entries(userData).forEach(([key, value]) => {
        if (key !== 'PHOTO' && key !== 'SIGNATURE') {
          console.log(`${key}: ${value}`);
        }
      });
      
      console.log('\nPhoto available:', !!userData.PHOTO);
      console.log('Signature available:', !!userData.SIGNATURE);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

basicExample();
