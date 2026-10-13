import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
    uri: process.env.MONGO_URI,
}));
//# sourceMappingURL=database.config.js.map