import { useState, useEffect } from 'react';
import { Otpremnica } from '../model/Otpremnica';
import { StavkaOtpremnice } from '../model/StavkaOtpremnice';
import { Proizvod } from '../model/Proizvod';
import React from 'react'
import Alert from 'react-popup-alert'

interface Props {
    otpremnica: Otpremnica | null;
    proizvodi: Proizvod[];
    selectedRow: number | null;
    onAdd: (stavka: StavkaOtpremnice) => Promise<any>;
    onUpdate: (stavke: StavkaOtpremnice) => Promise<any>;
    onRemove: () => Promise<any>;
}

function StavkeForma(props: Props) {

    let [proizvod, setProizvod] = useState<number>(0); 
    let [porudzbenica, setPorudzbenica] = useState<number>(0);
    let [opis, setOpis] = useState<string>('');
    let [kolicina, setKolicina] = useState<number>(0);

    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
      });

    useEffect(() => {
        if(props.otpremnica !== null){
            if(props.selectedRow !== null){
                let stavka: StavkaOtpremnice = props.otpremnica.stavkeOtpremnice.find((s: StavkaOtpremnice) => s.rBrStavkeOtp === props.selectedRow)!;
                setProizvod(stavka.proizvod.sifraProizvoda);
                setPorudzbenica(stavka.sifraPorudzbenice);
                setOpis(stavka.opis);
                setKolicina(stavka.kolicina);
            }else{
                setProizvod(0);
                setPorudzbenica(0);
                setOpis('');
                setKolicina(0);
            }
        }
    },[props.selectedRow, props.otpremnica])

    const onAdd = async (e: any) => {
        e.preventDefault();
        if (proizvod!==0) {
            let p: Proizvod = props.proizvodi.find((pro: Proizvod) => pro.sifraProizvoda === proizvod)!;
            let indeksi = [];
            let maxId = 0;
            for (var i=0; i<props.otpremnica!.stavkeOtpremnice.length; i++){
                indeksi.push(props.otpremnica!.stavkeOtpremnice[i].rBrStavkeOtp);
            }
            if(indeksi.length!==0){
                maxId =  Math.max( ...indeksi);
            }
            let s = new StavkaOtpremnice(maxId+1,props.otpremnica!.sifraOtpremnice, opis, kolicina, p, porudzbenica);
            await props.onAdd(s);
        }else{
            onShowAlert('warning', 'Morate uneti proizvod!');
        }
    }

    const onRemove = async (e: any) => {
        e.preventDefault();
        await props.onRemove();
    }

    const onUpdate = async (e: any) => {
        e.preventDefault();
        if (proizvod !== null && opis !== '' && kolicina !== 0) {
            let p: Proizvod = props.proizvodi.find((pro: Proizvod) => pro.sifraProizvoda === proizvod)!;
            await props.onUpdate(new StavkaOtpremnice(props.selectedRow!,props.otpremnica!.sifraOtpremnice, opis, kolicina, p, porudzbenica));
        }
    }
    function onCloseAlert() {
        setAlert({
          type: '',
          text: '',
          show: false
        })
      }
    
      function onShowAlert(type: any, text: string) {
        setAlert({
          type: type,
          text: text,
          show: true
        })
      }
    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <label className="col-form-label">Porudzbenica</label>
                    <select className="custom-select form-control" name="porudzbenica" value={porudzbenica} onChange={(e) => setPorudzbenica(Number(e.target.value))}>
                        <option value="0">Izaberite porudzbenicu...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <label className="col-form-label">Proizvod</label>
                    <select className="custom-select form-control" name="proizvod" value={proizvod} onChange={(e) => setProizvod(Number(e.target.value))}>
                        <option value="0">Izaberite proizvod...</option>
                        {props.proizvodi.map(proizvod => <option key={proizvod.sifraProizvoda} value={proizvod.sifraProizvoda}>{proizvod.nazivModela}</option>)}
                    </select>
                </div>
                <div className="form-group col-md-4">
                    <label className="col-form-label">Opis</label>
                    <input type="text" className="form-control" name="opis" value={opis} onChange={(e) => setOpis(e.target.value)} />
                </div>
                <div className="form-group col-md-2">
                    <label className="col-form-label">Kolicina</label>
                    <input type="number" className="form-control" name="kolicina" value={kolicina} onChange={(e) => setKolicina(Number(e.target.value))} />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4">
                    <button id="btn-add" className="btn btn-primary" onClick={onAdd} disabled={props.selectedRow !== null}><i className="fa fa-plus"></i>Dodaj stavku</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-update" className="btn btn-success " disabled={props.selectedRow === null} onClick={onUpdate}><i className="fa fa-pencil"></i>Izmeni stavku</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-delete" className="btn btn-danger" disabled={props.selectedRow === null} onClick={onRemove}><i className="fa fa-times"></i>Obrisi stavku</button>
                </div>
                <Alert
                    header={'Oprez'}
                    btnText={'Close'}
                    text={alert.text}
                    type={alert.type}
                    show={alert.show}
                    onClosePress={onCloseAlert}
                    pressCloseOnOutsideClick={true}
                    showBorderBottom={true}
                    alertStyles={{}}
                    headerStyles={{}}
                    textStyles={{}}
                    buttonStyles={{}}
                />
            </div>
        </form>
    );
}

export default StavkeForma;