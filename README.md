# Tanzania NIDA Lookup

A Node.js library for retrieving user information from Tanzania's National Identification Authority (NIDA).

## Installation

```bash
npm install tanzania-nida-lookup
```

## Usage

```typescript
import { nidaService } from 'tanzania-nida-lookup';

// Using the default instance
async function lookupUser() {
  try {
    const userData = await nidaService.lookupUser('NIDA_NUMBER_HERE');
    console.log(userData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Or create your own instance
import { NidaService } from 'tanzania-nida-lookup';

const customService = new NidaService();
const userData = await customService.lookupUser('NIDA_NUMBER_HERE');
```

## Features

- Lookup user information using NIDA number
- Automatic image processing for photos and signatures
- TypeScript support with type definitions
- Error handling and logging
- Configurable headers

## API Documentation

See [API.md](docs/API.md) for detailed API documentation.

## License

MIT
