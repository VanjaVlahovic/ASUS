import { useEffect, useState } from 'react';
import { Otpremnica } from '../model/Otpremnica';
import { Proizvod } from '../model/Proizvod';
import { StavkaOtpremnice } from '../model/StavkaOtpremnice';

interface Props {
    proizvodi: Proizvod[];
    otpremnica: Otpremnica | null;
    selectedRow: number | null;
    setSelectedRow: (id: number|null) => any;
}

function StavkeTabela(props: Props) {
    let [stavke, setStavke] = useState<StavkaOtpremnice[]>([]);
    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    const getNazivModela = (id: number) => {
        let proizvod = props.proizvodi.find(proizvod => proizvod.sifraProizvoda === id);        
        return proizvod ? proizvod.nazivModela : '';
    }

    useEffect(() => {
        if(props.otpremnica!==null){
            setStavke(props.otpremnica!.stavkeOtpremnice);
        }else{
            setStavke([]);
        }
    },[props.otpremnica]);

    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>#</th>
                    <th>Otpremnica</th>
                    <th>Porudzbenica</th>
                    <th>Proizvod</th>
                    <th>Opis</th>
                    <th>Kolicina</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {stavke.map(stavka => (
                    <tr key={stavka.rBrStavkeOtp} className="table-row" style={props.selectedRow === stavka.rBrStavkeOtp ? {backgroundColor: "#BEB5B5"} : {}} onClick={() => setSelectedRow(stavka.rBrStavkeOtp)}>
                        <th scope="row">{stavka.rBrStavkeOtp}</th>
                        <td>{stavka.sifraOtpremnice}</td>
                        <td>{stavka.sifraPorudzbenice}</td>
                        <td>{getNazivModela(stavka.proizvod.sifraProizvoda)}</td>
                        <td>{stavka.opis}</td>
                        <td>{stavka.kolicina}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );   
}
export default StavkeTabela;