import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD ?? '')}@${process.env.MONGO_DOMAIN}/${process.env.MONGO_DB}`,
}));