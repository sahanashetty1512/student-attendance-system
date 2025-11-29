function jsontoobject() {
    const jsoninput = document.getElementById('jsoninput').value;

    try {
        const jsonobject = JSON.parse(jsoninput);
        document.getElementById('objectoutput').textContent =
            JSON.stringify(jsonobject, null, 2);
    } catch {
        document.getElementById('objectoutput').textContent = 'Invalid JSON';
    }
}

function jsontodate() {
    const dateinput = document.getElementById('dateinput').value;

    try {
        const jsondate = JSON.parse(dateinput);
        const dateobject = new Date(jsondate.date);

        document.getElementById('dateoutput').textContent =
            `dateobject : ${dateobject}`;
    } catch {
        document.getElementById('dateoutput').textContent = 'Invalid JSON';
    }
}

function jsontocsv() {
    const jsoncsvinput = document.getElementById('jsoncsvinput').value;

    try {
        const jsonarray = JSON.parse(jsoncsvinput);
        const headers = Object.keys(jsonarray[0]);

        const csvrows = [
            headers.join(','),
            ...jsonarray.map(row =>
                headers.map(header => row[header]).join(',')
            )
        ];

        document.getElementById('csvoutput').textContent = csvrows.join('\n');
    } catch {
        document.getElementById('csvoutput').textContent = 'Invalid';
    }
}

function csvtojson() {
    const csvjsoninput = document.getElementById('csvjsoninput').value;

    const lines = csvjsoninput.split('\n');
    const headers = lines[0].split(',');

    const jsonarray = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};

        headers.forEach((header, i) => {
            obj[header] = values[i];
        });

        return obj;
    });

    document.getElementById('csvjsonoutput').textContent =
        JSON.stringify(jsonarray, null, 2);
}

async function createhash() {
    const hashinput = document.getElementById('hashinput').value;

    const encoder = new TextEncoder();
    const data = encoder.encode(hashinput);

    const hashbuffer = await crypto.subtle.digest('SHA-256', data);
    const hasharray = Array.from(new Uint8Array(hashbuffer));

    const hashhex = hasharray
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    document.getElementById('hashoutput').textContent =
        `hash: ${hashhex}`;
}
