import * as fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'path';

type Env = {
    verifierPrivateKey: string;
    sectorSubmitterPrivateKey: string;
    seedSubmitterPrivateKey: string;
}

const env= yaml.load(fs.readFileSync(path.join(__dirname, '..', 'env.yml'), {encoding: 'utf-8'})) as unknown as Env;
export default env;