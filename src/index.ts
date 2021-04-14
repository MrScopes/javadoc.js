import { generate } from './generate/generate';

// fetchClasses('https://papermc.io/javadocs/paper/1.16').then(classes => console.log(classes.length));
generate('https://docs.oracle.com/javase/8/docs/api').then(classes => console.log(`Java classes: ${classes.length}.`));