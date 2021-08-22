import {  useState, useEffect } from 'react';
import './App.css';
import Header from '../components/Header';
import { getAllOtpremnice, getAllRadnici, addOtpremnica, removeOtpremnica, updateOtpremnica, 
  getAllProizvodi } from '../service/api';
import { Otpremnica } from '../model/Otpremnica';
import OtpremnicaTabela from '../components/OtpremnicaTabela';
import OtpremniceForma from '../components/OtpremnicaForma';
import StavkeForma from '../components/StavkaOtpremniceForma';
import StavkeTabela from '../components/StavkaOtpremniceTabela';
import { StavkaOtpremnice } from '../model/StavkaOtpremnice';
import Alert from 'react-popup-alert'

function OtpremnicaApp() {
  let [otpremnice, setOtpremnice] = useState<Otpremnica[]>([]);
  let [otpremnica, setOtpremnica] = useState<Otpremnica | null>(null);
  let [radnici, setRadnici] = useState([]);
  let [proizvodi, setProizvodi] = useState([]);
  let [stavkeObrisane, setStavkeObrisane] = useState<StavkaOtpremnice[]>([]);
  let [selectedRowOtp, setSelectedRowOtp] = useState<number | null>(null);
  let [selectedRowStavka, setSelectedRowStavka] = useState<number | null>(null);
  let [error, setError] = useState('');
  let [alert, setAlert] = useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  });
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
  const getOtpremnice = async () => {
    try {
      setOtpremnice(await getAllOtpremnice());
    } catch (e) {
      console.log(e);
    }
  }

  const getRadnici = async () => {
    try {
      setRadnici(await getAllRadnici());
    } catch (e) {
      console.log(e);
    }
  }

  const getProizvodi = async () => {
    try {
      setProizvodi(await getAllProizvodi());
    } catch (e) {
      console.log(e);
    }
  }
  const dateToYMD = (date: Date) => {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
  useEffect(() => {
    if (otpremnice.length===0){
      (async function() {
        await getOtpremnice();
        await getRadnici();
        await getProizvodi();
      })();
    }
    if(selectedRowOtp!==null){
      setOtpremnica(otpremnice.find((otp: Otpremnica) => otp.sifraOtpremnice === selectedRowOtp)!);
      setSelectedRowStavka(null);
    }else{
      setOtpremnica(new Otpremnica(0, dateToYMD(new Date()), 0, []));
      setStavkeObrisane([]);
      setSelectedRowStavka(null);
    }
  },[selectedRowOtp]);

  const onAddStavka = async (stavka: StavkaOtpremnice) => {
    stavka.status="Nova";
    let stavkeOtp = [...otpremnica!.stavkeOtpremnice, {...stavka, proizvod: stavka.proizvod}];
    let otp = new Otpremnica(otpremnica!.sifraOtpremnice, 
                              otpremnica!.datum, 
                              otpremnica!.radnik,
                              stavkeOtp);
    setOtpremnica(otp);
  }

  const onRemoveStavka = async () => {
    const stavkaId = selectedRowStavka!;
    let stavkeOtp = otpremnica!.stavkeOtpremnice.filter((s: StavkaOtpremnice) => s.rBrStavkeOtp !== stavkaId);
    let otp = new Otpremnica(otpremnica!.sifraOtpremnice, 
      otpremnica!.datum, 
      otpremnica!.radnik,
      stavkeOtp);
    
    setOtpremnica(otp);
    setSelectedRowStavka(null);
    
    let obrisana = otpremnica!.stavkeOtpremnice.find((s: StavkaOtpremnice) => s.rBrStavkeOtp === stavkaId)!;
    if(obrisana.status!=="Nova"){
      obrisana.status="Obrisana";
      setStavkeObrisane([...stavkeObrisane, {...obrisana, proizvod: obrisana.proizvod}]);
    }
  }

  const onUpdateStavka = async (stavka: StavkaOtpremnice) => {
    let izmenjena = otpremnica!.stavkeOtpremnice.find((s: StavkaOtpremnice) => s.rBrStavkeOtp === stavka.rBrStavkeOtp)!;
    let stavkeOtp = [];
    if(izmenjena.status==="Nova"){
      stavka.status = "Nova";
      stavkeOtp = otpremnica!.stavkeOtpremnice.map((s: StavkaOtpremnice) => s.rBrStavkeOtp === stavka.rBrStavkeOtp ? stavka : s);
    }else{
      stavka.status = "Izmenjena"
      stavkeOtp = otpremnica!.stavkeOtpremnice.map((s: StavkaOtpremnice) => s.rBrStavkeOtp === stavka.rBrStavkeOtp ? stavka : s);
    }
    let otp = new Otpremnica(otpremnica!.sifraOtpremnice, 
      otpremnica!.datum, 
      otpremnica!.radnik,
      stavkeOtp);
    setOtpremnica(otp);
  }
  const onUpdate = async () => {
    try {
      otpremnica!.stavkeOtpremnice = [...stavkeObrisane, ...otpremnica!.stavkeOtpremnice];
      let res = await updateOtpremnica(otpremnica!);
      if(res.error){ 
        setError(res.error);
        onShowAlert('error', res.error);
      }
      else{ 
        let o = await getAllOtpremnice();
        setOtpremnice(o);
        onShowAlert('success', 'Uspesno ste izmenili otpremnicu!');
      }
    } catch(e) {
      setError("Network error");
      onShowAlert('error', e.message);
    }
  }
  const onAdd = async () => {
    try {
      let res = await addOtpremnica(otpremnica!);
      if(res.error){ 
        setError(res.error);
        onShowAlert('error', res.error);
      }
      else{
        setOtpremnice([...otpremnice, {...res, radnik: res.radnik.sifraRadnika}]);
        setOtpremnica(res);
        setSelectedRowOtp(res.sifraOtpremnice);
      }
    } catch(e) {
      setError("Network error"+e.message);
      onShowAlert('error', e.message);
    }
  }

  const onRemove = async () => {
    try {
      const otpremnicaId = selectedRowOtp!;
      await removeOtpremnica(otpremnicaId);
      setOtpremnice(otpremnice.filter((otp: Otpremnica) => otp.sifraOtpremnice !== otpremnicaId));
      setSelectedRowOtp(null);
    } catch(e) {
      setError("Network error");
      onShowAlert('error', e.message);
    }
  }
  const onPromeniRadnika = async (radnik: number) => {
    if(otpremnica!==null){
      let otp = new Otpremnica(otpremnica!.sifraOtpremnice, 
        otpremnica!.datum, 
        radnik!,
        otpremnica!.stavkeOtpremnice);
      setOtpremnica(otp);
    }
  }
  const onPromeniDatum = async (datum: string) => {
    if(otpremnica!==null){
      let otp = new Otpremnica(otpremnica!.sifraOtpremnice, 
        datum, 
        otpremnica!.radnik,
        otpremnica!.stavkeOtpremnice);
      setOtpremnica(otp);
    }
  }
    return (
      <>
        <Header />
        <div className="container">
          <h1 className="display-4">Otpremnice</h1>
          <div className="row">
           {/* {error && <h1>{error}</h1>} */}
            <OtpremnicaTabela 
              otpremnice={otpremnice}
              radnici={radnici}
              selectedRow={selectedRowOtp}
              setSelectedRow={(id) => setSelectedRowOtp(id)}
            />
          </div>
          <div className='okvir'>
          <div>
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
            <div className="row justify-content-center">
              <div className="col-8">
                <OtpremniceForma 
                  otpremnica={otpremnica}
                  radnici={radnici}
                  onPromeniRadnika={onPromeniRadnika}
                  onPromeniDatum={onPromeniDatum}
                />
              </div>
              
            </div>
            <div className="row">
              <div className = "col-md-3 offset-md-1">
                <h4>Stavke otpremnice: {otpremnica?.sifraOtpremnice}</h4>
              </div>
              </div>
            <div className="row">
              <div className='col'>
              <StavkeTabela 
                otpremnica={otpremnica!}
                proizvodi={proizvodi}
                selectedRow={selectedRowStavka}
                setSelectedRow={(id) => setSelectedRowStavka(id)}
              />
              </div>
              <div className='col'>
              <StavkeForma 
                otpremnica = {otpremnica}
                proizvodi = {proizvodi}
                selectedRow={selectedRowStavka}
                onAdd={onAddStavka}
                onUpdate={onUpdateStavka}
                onRemove={onRemoveStavka}
              />
              </div>
            </div>
            
          </div> 
          <div className="form-row">
            <div className="col-md-4">
              <button id="btn-add" className="btn btn-primary" disabled={selectedRowOtp !== null} onClick={onAdd}><i className="fa fa-plus"></i> Sacuvaj</button>
            </div>
            <div className="col-md-4">
              <button id="btn-update" className="btn btn-success " disabled={selectedRowOtp === null} onClick={onUpdate}><i className="fa fa-pencil"></i> Izmeni</button>
            </div>
            <div className="col-md-4">
              <button id="btn-delete" className="btn btn-danger" disabled={selectedRowOtp === null} onClick={onRemove}><i className="fa fa-times"></i> Obrisi</button>
            </div>
          </div>
        </div>  
      </>
    );
}

export default OtpremnicaApp;
