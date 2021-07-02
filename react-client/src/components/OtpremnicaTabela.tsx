import { Otpremnica } from '../model/Otpremnica';
import { Radnik } from '../model/Radnik';

interface Props {
    otpremnice: Otpremnica[];
    radnici: Radnik[];
    selectedRow: number|null;
    setSelectedRow: (id: number|null) => any;
}

function OtpremnicaTabela(props: Props) {

    const getFormattedDatum = (datum: string) => datum.split('T')[0];

    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    const getImePrezime = (id: number) => {
        let radnik = props.radnici.find(radnik => radnik.sifraRadnika === id);
        return radnik ? radnik.imePrezime : '';
    }


    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>#</th>
                    <th>Datum</th>
                    <th>Radnik</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {props.otpremnice.map(otpremnica => (
                    <tr key={otpremnica.sifraOtpremnice} className="table-row" style={props.selectedRow === otpremnica.sifraOtpremnice ? {backgroundColor: "#BEB5B5"} : {}} onClick={() => setSelectedRow(otpremnica.sifraOtpremnice)}>
                        <th scope="row">{otpremnica.sifraOtpremnice}</th>
                        <td>{getFormattedDatum(otpremnica.datum)}</td>
                        <td>{getImePrezime(otpremnica.radnik)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
}

export default OtpremnicaTabela;