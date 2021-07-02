import {  useState, useEffect } from 'react';
import './App.css';
import { PrevoznoSredstvo } from '../model/PrevoznoSredstvo';
import Header from '../components/Header';
import PrevoznoSredstvoTabela from '../components/PrevoznoSredstvoTabela';
import PrevoznoSredstvoForma from '../components/PrevoznoSredstvoForma';
import { getAllPrevoznaSredstva, addPrevoznoSredstvo, removePrevoznoSredstvo, updatePrevoznoSredstvo} from '../service/api';

function PrevoznoSredstvoApp() {

  let [prevoznaSredstva, setPrevoznoSredstvo] = useState<PrevoznoSredstvo[]>([]);
  let [selectedRow, setSelectedRow] = useState<number | null>(null);
  let [error, setError] = useState('');

  const getPrevoznaSredstva = async () => {
    try {
      setPrevoznoSredstvo(await getAllPrevoznaSredstva());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async function() {
      await getPrevoznaSredstva();
    })();
  },[]);

  const onAdd = async (prevoznoSredstvo: PrevoznoSredstvo) => {
    try {
      let res = await addPrevoznoSredstvo(prevoznoSredstvo);
      if(res.error) setError(res.error);
      else setPrevoznoSredstvo([...prevoznaSredstva, {...res}]);
    } catch(e) {
      setError("Network error");
    }
  }

  const onRemove = async () => {
    try {
      const sredstvoId = selectedRow!;
      await removePrevoznoSredstvo(sredstvoId);
      setPrevoznoSredstvo(prevoznaSredstva.filter((sred: PrevoznoSredstvo) => sred.sifraSredstva !== sredstvoId));
      setSelectedRow(null);
    } catch(e) {
      console.log(e);
      setError("Network error");
    }
  }

  const onUpdate = async (prevoznoSredstvo: PrevoznoSredstvo) => {
    try {
      let res = await updatePrevoznoSredstvo(prevoznoSredstvo);
      if(res.error) setError(res.error);
      else setPrevoznoSredstvo(prevoznaSredstva.map((sred: PrevoznoSredstvo) => sred.sifraSredstva === prevoznoSredstvo.sifraSredstva ? prevoznoSredstvo : sred));
    } catch(e) {
      setError("Network error");
    }
  }

    return (
      <>
        <Header />
        <div className="container">
          <h1 className="display-4">Prevozna sredstva</h1>
          <div className="row">
            {error && <h1>{error}</h1>}
            <PrevoznoSredstvoTabela 
              prevoznaSredstva={prevoznaSredstva}
              selectedRow={selectedRow}
              setSelectedRow={(sifraSredstva) => setSelectedRow(sifraSredstva)}
            />
          </div>
          <div className="row">
            <PrevoznoSredstvoForma 
              prevoznaSredstva={prevoznaSredstva}
              selectedRow={selectedRow}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          </div>
        </div>
      </>
    );
}
export default PrevoznoSredstvoApp;