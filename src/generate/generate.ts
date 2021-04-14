import { generateClasses } from './generateClasses';
import { generateMethods } from './generateMethods';

export async function generate(url: string) {
    return generateClasses(url).then(generateMethods);
}