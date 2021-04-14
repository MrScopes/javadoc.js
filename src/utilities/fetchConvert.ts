import fetch from 'node-fetch';
import JSSoup from 'jssoup'; 

export async function fetchConvert(url: string): JSSoup {
    try {
        const req = await fetch(url);
        const body = await req.text();
        return new JSSoup(body);
    } catch (err) {
        console.error(`Error fetching from "${url}":\n${err}`);
    }
}