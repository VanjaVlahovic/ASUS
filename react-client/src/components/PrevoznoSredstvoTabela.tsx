import {PrevoznoSredstvo} from "../model/PrevoznoSredstvo"

interface Props {
    prevoznaSredstva: PrevoznoSredstvo[];
    selectedRow: number|null;
    setSelectedRow: (id: number|null) => any;
}

function PrevoznaSredstvaTabela(props: Props) {

    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>#</th>
                    <th>Naziv sredstva</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {props.prevoznaSredstva.map(sredstvo => (
                    <tr key={sredstvo.sifraSredstva} className="table-row" style={props.selectedRow === sredstvo.sifraSredstva ? {backgroundColor: "#BEB5B5"} : {}} onClick={() => setSelectedRow(sredstvo.sifraSredstva)}>
                        <th scope="row">{sredstvo.sifraSredstva}</th>
                        <td>{sredstvo.nazivSredstva}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
}

export default PrevoznaSredstvaTabela;