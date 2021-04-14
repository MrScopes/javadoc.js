import fs from 'fs';
import { fetchConvert } from '../utilities/fetchConvert';
import { GeneratedClass } from '../types';

export async function fetchMethods(classes: GeneratedClass[]) {
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