import { fetchClasses } from './generate/generateClasses';
import { fetchMethods } from './generate/generateMethods';

fetchClasses('https://papermc.io/javadocs/paper/1.16').then(classes => console.log(classes.length));
// fetchClasses('https://docs.oracle.com/javase/8/docs/api').then(classes => console.log(`Java classes: ${classes.length}.`));