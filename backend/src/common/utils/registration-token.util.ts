import { v4 as uuid4 } from 'uuid';

const generateToken = (): string => uuid4();
export { generateToken };
