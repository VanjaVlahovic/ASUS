import { Otpremnica } from "../model/Otpremnica";
import { PrevoznoSredstvo } from "../model/PrevoznoSredstvo";

const baseUrl = "http://localhost:3001";

export async function getAllPrevoznaSredstva() {
    let res = await fetch(baseUrl + "/prevoznosredstvo");
    let prevoznaSredstva = await res.json();
    return prevoznaSredstva.map((sred: any) => ({...sred}));
}

export async function addPrevoznoSredstvo(prevoznaSredstva: PrevoznoSredstvo) {
    let { sifraSredstva, ...sred } = prevoznaSredstva;
    let res = await fetch(baseUrl + "/prevoznosredstvo", {
        method: 'POST',
        body: JSON.stringify(sred),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function updatePrevoznoSredstvo(prevoznaSredstva: PrevoznoSredstvo) {
    let { sifraSredstva, ...sred } = prevoznaSredstva;
    let res = await fetch(baseUrl + `/prevoznosredstvo/${sifraSredstva}`, {
        method: 'PATCH',
        body: JSON.stringify(sred),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();;
}

export async function removePrevoznoSredstvo(sifraSredstva: number) {
    await fetch(baseUrl + `/prevoznosredstvo/${sifraSredstva}`, {
        method: 'DELETE'
    });
}

export async function getAllOtpremnice() {
    let res = await fetch(baseUrl + "/otpremnica");
    let otpremnice = await res.json();
    let o = otpremnice.map((otp: any) => ({...otp, radnik: otp.radnik.sifraRadnika}));

    for (let i=0; i<o.length; i++){
        for (let j=0; j<o[i].stavkeOtpremnice.length; j++ ){
            o[i].stavkeOtpremnice[j].status = "Stara";
        }
    }
    return o;
}

export async function getAllRadnici() {
    let res = await fetch(baseUrl + "/radnik");
    return await res.json();
}

export async function addOtpremnica(otpremnica: Otpremnica) {
    let { sifraOtpremnice, ...otp } = otpremnica;
    let result = await fetch(baseUrl + "/otpremnica", {
        method: 'POST',
        body: JSON.stringify(otp),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return await result.json();
}

export async function updateOtpremnica(otpremnica: Otpremnica) {
    let { sifraOtpremnice, ...otp } = otpremnica;
    let res = await fetch(baseUrl + `/otpremnica/${sifraOtpremnice}`, {
        method: 'PATCH',
        body: JSON.stringify(otp),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function removeOtpremnica(id: number) {
    await fetch(baseUrl + `/otpremnica/${id}`, {
        method: 'DELETE'
    });
}

export async function getAllProizvodi() {
    let res = await fetch(baseUrl + "/proizvod");
    return await res.json();
}