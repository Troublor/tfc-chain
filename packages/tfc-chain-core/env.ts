import path from 'path';
import fs from 'fs';
import * as yaml from 'js-yaml';

const envFile = path.join(__dirname, 'env.yml');
if (!fs.existsSync(envFile)) {
    throw new Error('Missing env.yml file. Please copy env.example.yml as env.yml and properly configure it.');
}
const env = yaml.load(fs.readFileSync(envFile, {encoding: 'utf-8'}));

export default env as {
    endpoint: string,
    turboFilContract: string,
    accountPrivateKey: string[],
};