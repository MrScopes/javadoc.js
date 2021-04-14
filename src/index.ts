import fetch from 'node-fetch';
import fs from 'fs';
import JSSoup from 'jssoup'; 

async function fetchConvert(url: string): JSSoup {
    try {
        const req = await fetch(url);
        const body = await req.text();
        return new JSSoup(body);
    } catch (err) {
        console.error(`Error fetching from "${url}":\n${err}`);
    }
}

async function fetchClasses(url: string) {
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

/** Not done */
async function fetchMethods(classes: GeneratedClass[]) {
    for (let i = 0; i < classes.length; i++) {
        const methodHTML = await fetchConvert(classes[i].url);
        console.log(`${classes[i].type} ${classes[i].name}`);

        const methodCodes = methodHTML.findAll('code');

        for (let num = 0; num < methodCodes.length; num++) {
            try {
                console.log(methodCodes[num]?.contents[0]?.nextElement.toString());
            } catch (err) {
                
            }
        }

        /** Visualizer */
        return fs.writeFileSync('./out.html', methodHTML.toString());
    }
}

fetchClasses('https://papermc.io/javadocs/paper/1.16').then(fetchMethods);
// fetchClasses('https://docs.oracle.com/javase/8/docs/api').then(classes => console.log(`Java classes: ${classes.length}.`));

interface GeneratedClass {
    /** The name of this class. All `.` are replaced with `_`. */
    name: string;
    /** The type. May be class, interface, or enum. Annotations are not generated. */
    type: string;
    /** The directory. Ex: `java/util` */
    directory: string;
    /** THe url. */
    url: string;
}