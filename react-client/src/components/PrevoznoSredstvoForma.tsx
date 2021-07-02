import { useState, useEffect } from 'react';
import { PrevoznoSredstvo } from '../model/PrevoznoSredstvo';

interface Props {
    prevoznaSredstva: PrevoznoSredstvo[];
    selectedRow: number | null;
    onAdd: (prevoznaSredstva: PrevoznoSredstvo) => Promise<any>;
    onUpdate: (prevoznaSredstva: PrevoznoSredstvo) => Promise<any>;
    onRemove: () => Promise<any>;
}

function PrevoznaSredstvaForma(props: Props) {

    let [nazivSredstva, setNazivSredstva] = useState<string>('');

    useEffect(() => {
        if(props.selectedRow != null){
            let sredstvo: PrevoznoSredstvo = props.prevoznaSredstva.find((sred: PrevoznoSredstvo) => sred.sifraSredstva === props.selectedRow)!;
            setNazivSredstva(sredstvo.nazivSredstva);
        }
    },[props.selectedRow])

    const onAdd = async (e: any) => {
        e.preventDefault();
        if (nazivSredstva !== '') {
            await props.onAdd(new PrevoznoSredstvo(0,nazivSredstva));
        }
    }

    const onRemove = async (e: any) => {
        e.preventDefault();
        await props.onRemove();
    }

    const onUpdate = async (e: any) => {
        e.preventDefault();
        if (nazivSredstva !== '') {
            await props.onUpdate(new PrevoznoSredstvo(props.selectedRow!,nazivSredstva));
        }
    }

    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-8">
                    <label className="col-form-label">Naziv sredstva</label>
                    <input type="text" className="form-control" name="nazivSredstva"  value={nazivSredstva} onChange={(e) => setNazivSredstva(e.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4">
                    <button id="btn-add" className="btn btn-primary" onClick={onAdd}><i className="fa fa-plus"></i> Dodaj</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-update" className="btn btn-success " disabled={props.selectedRow === null} onClick={onUpdate}><i className="fa fa-pencil"></i> Izmeni</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-delete" className="btn btn-danger" disabled={props.selectedRow === null} onClick={onRemove}><i className="fa fa-times"></i> Obrisi</button>
                </div>
            </div>
        </form>
    );
}

export default PrevoznaSredstvaForma;