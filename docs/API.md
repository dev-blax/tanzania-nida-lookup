# Tanzania NIDA Lookup API Documentation

## NidaService

The main class for interacting with the NIDA API.

### Methods

#### lookupUser(nidaNumber: string): Promise<UserData | null>

Retrieves user information from NIDA using the provided NIDA number.

- **Parameters:**
  - `nidaNumber` (string): The NIDA number to look up

- **Returns:**
  - Promise<UserData | null>: User data if found, null if not found

- **Throws:**
  - Will throw an error if the API request fails

### Types

#### UserData

```typescript
interface UserData {
  [key: string]: any;
  PHOTO?: string;
  SIGNATURE?: string;
}
```

#### NidaResponse

```typescript
interface NidaResponse {
  obj: {
    result?: UserData;
    error?: string;
  };
}
```

### Example

```typescript
import { nidaService } from 'tanzania-nida-lookup';

async function example() {
  try {
    const userData = await nidaService.lookupUser('123456789');
    if (userData) {
      console.log('User found:', userData);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error looking up user:', error);
  }
}
```
