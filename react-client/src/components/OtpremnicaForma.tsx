import { useState, useEffect } from 'react';
import { Otpremnica } from '../model/Otpremnica';
import { Radnik } from '../model/Radnik';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

interface Props {
    radnici: Radnik[];
    otpremnica: Otpremnica | null;
    onPromeniRadnika: (radnik: number) => Promise<any>;
    onPromeniDatum: (datum: string) => Promise<any>;
}
function OtpremniceForma(props: Props) {

    let [datumOtp, setDatum] = useState<Date | null>(null);
    let [radnik, setRadnik] = useState<number>(0); 

    const getDatum = (datum: string) => {
        let date = datum.split('T');
        let split = date[0].split('-');
        return new Date(Number(split[0]),Number(split[1]) - 1, Number(split[2]));
    }

    useEffect(() => {
        if(props.otpremnica !== null){
            setDatum(getDatum(props.otpremnica.datum));
            setRadnik(props.otpremnica.radnik);
        }else{
            setDatum(null);
            setRadnik(0);
        }
    },[props.otpremnica])

    const dateToYMD = (date: Date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }
    const promeniRadnika = async (r: number) => {
        setRadnik(r);
        await props.onPromeniRadnika(r);
    }
    const promeniDatum = async (d: Date) => {
        setDatum(d);
        await props.onPromeniDatum(dateToYMD(d));
    }
    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label className="col-form-label">Datum</label>
                    <DatePicker
                        className="form-control"
                        selected={datumOtp}
                        onChange={(date: Date) => promeniDatum(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group col-md-3">
                    <label className="col-form-label">Radnik</label>
                    {/*<select className="custom-select form-control" name="radnik" value={radnik} onChange={(e) => setRadnik(Number(e.target.value))}> */}
                    <select className="custom-select form-control" name="radnik" value={radnik} onChange={(e) => promeniRadnika(Number(e.target.value))}>
                        <option value="0">Izaberite radnika...</option>
                        {props.radnici.map(radnik => <option key={radnik.sifraRadnika} value={radnik.sifraRadnika}>{radnik.imePrezime}</option>)}
                    </select>
                </div>
            </div>
        </form>
    );
}

export default OtpremniceForma;