import { fetchConvert } from '../utilities/fetchConvert';
import { GeneratedClass } from '../types';

export async function fetchClasses(url: string) {
    const classesHTML = await fetchConvert(url + '/allclasses-noframe.html');
    const classesBody = classesHTML.find('body').contents[1].nextElement;
    
    const classes: GeneratedClass[] = [];
    for (let i = 0; i < classesBody.contents.length; i++) {
        const name = classesBody.contents[i].getText().replace(/\./g, '_');
        const type = classesBody.contents[i].contents.toString().split('"')[3].replace(/\./g, '/').split(' ');

        if (!type.includes('annotation')) classes.push({ name, type: type[0], directory: type[2], url: `${url}/${type[2]}/${name}.html` });
    }

    return classes;
}