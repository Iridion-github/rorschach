import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import React from 'react';

interface RowType {
  id: string;
  label: string;
  section?: number;
  power?: number;
  instances: number[];
  hasSigma?: boolean;
  canAddRow?: boolean;
  canAddCustomRow?: boolean;
  canDelete?: boolean;
}

const insertAt = (array: any[], index: number, ...elementsArray: any[]) => {
  array.splice(index, 0, ...elementsArray);
};

const getInitialInstances = (colsNum: number): number[] => {
  const result = Array.from({ length: colsNum }, (_foo) => 0);
  return result;
};

const getPercentage = (partialValue: number, totalValue: number): number => {
  if (totalValue < 1) return 0;
  const result = (100 * partialValue) / totalValue;
  if (result.toString().split('.')[1].length > 2) {
    return Number(result.toFixed(2));
  } else {
    return Number(result);
  }
};

function App() {
  const [firstTableCols] = useState(['TAV', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Numero Risposte', 'Punti']);
  const [secondTableCols] = useState(['TAV', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Numero Risposte', 'Punti']);

  const firstTableRowsInitialValue = useMemo(() => [
    //prima sezione
    { id: '0', label: 'T.L.', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '1', label: 'T.T.', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '2', label: 'R', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '3', label: 'R+', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(firstTableCols.length) },
    //sezione da G a Dr
    { id: '4.1', label: 'G+', hasSigma: true, canAddRow: true, section: 1, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '4.2', label: 'G+-', hasSigma: true, canAddRow: true, section: 1, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '4.3', label: 'G-', hasSigma: true, canAddRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '5.1', label: 'D+', hasSigma: true, canAddRow: true, section: 1, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '5.2', label: 'D+-', hasSigma: true, canAddRow: true, section: 1, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '5.3', label: 'D-', hasSigma: true, canAddRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '6.1', label: 'Dim+', hasSigma: true, canAddRow: true, section: 1, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '6.1', label: 'Dim+-', hasSigma: true, canAddRow: true, section: 1, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '6.1', label: 'Dim', hasSigma: true, canAddRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '7', label: 'Dd', hasSigma: true, canAddRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '8', label: 'Di+', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '8', label: 'Di+-', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '8', label: 'Di-', hasSigma: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '9', label: 'Dr+', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '9', label: 'Dr+-', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '9', label: 'Dr-', hasSigma: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    //sezione da F a Clob
    { id: '11', label: 'F+', hasSigma: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '12', label: 'F±', hasSigma: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '13', label: 'F-', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.1', label: 'M↑', hasSigma: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.2', label: 'M@', hasSigma: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.2', label: 'M↓', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '15.1', label: 'FC', hasSigma: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '15.2', label: 'CF', hasSigma: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '15.3', label: 'C', hasSigma: true, canAddRow: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '16.1', label: 'FC’b', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '16.2', label: 'c’bF', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '16.3', label: 'C’b', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '18.1', label: 'FClob', hasSigma: true, canAddRow: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '18.2', label: 'ClobF', hasSigma: true, canAddRow: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '18.3', label: 'Clob', hasSigma: true, canAddRow: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [firstTableRows, setFirstTableRows] = useState<RowType[]>(firstTableRowsInitialValue);

  const secondTableRowsInitialValue = useMemo(() => [
    //prima sezione
    { id: '20.1', label: 'MA↑', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '20.2', label: 'MA@', hasSigma: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '20.3', label: 'MA↓', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '21.1', label: 'mi↑', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '21.2', label: 'mi@', hasSigma: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '21.3', label: 'mi↓', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '23.1', label: 'Ef↑', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '23.2', label: 'Ef@', hasSigma: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '23.3', label: 'Ef↓', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '24', label: 'Mr', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '25.1', label: 'Fc', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '25.2', label: 'cF', hasSigma: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '25.3', label: 'c', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '26.1', label: 'FC’n', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '26.2', label: 'C’nF', hasSigma: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '26.3', label: 'C’n', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '27.1', label: 'F(C)', hasSigma: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '27.2', label: 'F(C)+-', hasSigma: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '27.3', label: 'F(C)-', hasSigma: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    //seconda sezione
    { id: '28.1', label: 'V', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '28.2', label: '(V)', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    //le sommatorie in generale o sono da integrare come sistema a parte, o sono da rimuovere e potrei mettere una sezione dedicata nei risultati
    { id: '28.3', label: 'Sommatoria V', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '29', label: 'Sommatoria O', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '30', label: 'O+', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '30.1', label: 'O+-', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '31', label: 'O-', hasSigma: true, section: 1, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '31.1', label: '(O)+', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '31.2', label: '(O)+-', hasSigma: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '31.3', label: '(O)-', hasSigma: true, section: 1, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '32', label: 'H', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '33', label: 'Hd', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '34', label: 'A', hasSigma: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35', label: 'Ad', hasSigma: true, canAddRow: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.1', label: 'OBJ', hasSigma: true, canAddRow: false, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.2', label: 'Anat', hasSigma: true, canAddRow: false, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.3', label: 'Nat', hasSigma: true, canAddRow: false, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.4', label: 'Arch', hasSigma: true, canAddRow: false, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.5', label: 'Simb', hasSigma: true, canAddRow: true, canAddCustomRow: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    //sezione finale
    { id: '37', label: 'CHOC', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '38', label: 'FENOMENI SPECIALI', hasSigma: true, section: 2, power: 0, instances: getInitialInstances(secondTableCols.length) },
  ], [secondTableCols.length]);
  const [secondTableRows, setSecondTableRows] = useState<RowType[]>(secondTableRowsInitialValue);

  const possibleExtraFieldsInitialValue = useMemo(() => [
    { id: 'extra0', label: 'FClob', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra1', label: 'ClobF', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra2', label: 'Clob', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra3', label: 'Cloob', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra4', label: 'FC’b', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra5', label: 'C’bF', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra6', label: 'C’b', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra7', label: 'F/C', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra8', label: 'C/F', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra9', label: 'MC', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra10', label: 'MC’b', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra11', label: 'MClob', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra12', label: 'M(C)', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra13', label: 'ClobC', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra14', label: 'CClob', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra15', label: 'ClobC’b', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra16', label: 'C’bClob', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra17', label: 'C’bClob-', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra18', label: 'FCC’b', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra19', label: 'CFC’b', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra20', label: 'CC’b', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra21', label: 'Clob(C)', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra22', label: '(C)Clob', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra23', label: 'F(C)C', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra24', label: 'CF(C)', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra25', label: 'F(C)C’b', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra26', label: 'C’bF(C)', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra27', label: 'MClobC', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra28', label: 'MClobC’b', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra29', label: 'MClob(C)', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra30', label: 'MClob(C)C', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra31', label: 'MA↑', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra32', label: 'MA↓', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra33', label: 'mi↑', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra34', label: 'mi↓', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra35', label: 'pM', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra36', label: 'M’p’', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra37', label: 'Mr', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra38', label: 'Ef↑', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra39', label: 'Ef↓', power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra40', label: 'Fc+', power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra41', label: 'cF+-', power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: 'extra42', label: 'c-', power: 0, instances: getInitialInstances(secondTableCols.length) },
  ], [secondTableCols.length]);
  const [possibleExtraFields, setPossibleExtraFields] = useState<RowType[]>(possibleExtraFieldsInitialValue);

  const [gotResults, setGotResults] = useState(false);
  const [amountOfResponses, setAmountOfResponses] = useState(0);
  const [resultingPercentage, setResultingPercentage] = useState(0);

  const getOptions = useCallback((extraFields: any[]) => {
    function compare(a: any, b: any) {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    }
    return extraFields.sort(compare).map(field => {
      return (
        <option key={field.label} value={JSON.stringify(field)}>{field.label}</option>
      );
    });
  }, []);

  const onSelectOptions = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const data = JSON.parse(event.target.value);
    setCustomNameInput(data.label);
  }, []);

  const dynamicTableHeaders1 = useMemo(() => {
    return firstTableCols.map((col, index) =>
      <th key={col + '-' + index}>{col}</th>
    );
  }, [firstTableCols]);

  const dynamicTableHeaders2 = useMemo(() => {
    return secondTableCols.map((col, index) =>
      <th key={col + '-' + index}>{col}</th>
    );
  }, [secondTableCols]);

  const onChangeInput = useCallback((id: string, event: ChangeEvent<HTMLInputElement>, index: number) => {
    const isInFirstTable = firstTableRows.find(el => el.id === id);
    const targetArr = isInFirstTable ? firstTableRows : secondTableRows;
    const updateFunc = isInFirstTable ? setFirstTableRows : setSecondTableRows;
    const updatedRows = [...targetArr].map(el => {
      if (el.id === id) {
        const updatedInstances = el.instances.map((instance, i) => {
          if (i !== index) {
            return instance;
          } else {
            return Number(event.target.value);
          }
        });
        return { ...el, instances: updatedInstances };
      } else {
        return el;
      }
    });
    updateFunc(updatedRows);
  }, [firstTableRows, secondTableRows]);

  const getTDs = useCallback((amount: number, row: RowType, columns: string[]) => {
    const result = [];
    const differential = row.hasSigma ? 0 : 1;
    for (let i = 0; i < amount - differential; i++) {
      const currentCol = columns[i + 1];
      const readOnly = currentCol === 'Numero Risposte' || currentCol === 'Punti';
      let updatingValue = undefined;
      if (currentCol === 'Numero Risposte') {
        const isInFirstTable = firstTableRows.find(el => el.id === row.id);
        const target = isInFirstTable ? firstTableRows.find(r => r.id === row.id) : secondTableRows.find(r => r.id === row.id);
        const sumOfInstances = target?.instances.reduce((partialSum, a) => partialSum + a, 0);
        updatingValue = sumOfInstances;
      }
      if (currentCol === 'Punti') {
        const isInFirstTable = firstTableRows.find(el => el.id === row.id);
        const target = isInFirstTable ? firstTableRows.find(r => r.id === row.id) : secondTableRows.find(r => r.id === row.id);
        const rowPower = target ? target.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) : 0;
        updatingValue = rowPower;
      }
      result.push(
        <td key={row.label + '-' + i}>
          <div className="input-group children-centered-horizontally">
            <input
              disabled={readOnly}
              type="number"
              id={row.id} min={0}
              defaultValue={readOnly ? undefined : 0}
              value={updatingValue}
              className={readOnly ? "form-control cell-input-read-only" : "form-control cell-input"}
              onChange={event => onChangeInput(row.id, event, i)}
              aria-label="numero"
            />
          </div>
        </td>
      );
    }
    result.push();
    return result;
  }, [onChangeInput, firstTableRows, secondTableRows]);

  const addRow = useCallback((row: RowType) => {
    const isInFirstTable = firstTableRows.find(el => el.label === row.label);
    const targetArr = isInFirstTable ? firstTableRows : secondTableRows;
    const updateFunc = isInFirstTable ? setFirstTableRows : setSecondTableRows;
    const targetIndex = targetArr.findIndex(el => el.label === row.label);
    const newRow = { ...row, canAddRow: false, id: Date.now().toString(), canDelete: true };
    const updatedRows = [...targetArr];
    insertAt(updatedRows, targetIndex, newRow);
    updateFunc(updatedRows);
  }, [firstTableRows, secondTableRows]);

  const [customInputName, setCustomNameInput] = useState('');

  const onCreateCustomInput = useCallback(() => {
    const prevRow = secondTableRows.find(el => el.label === 'Ad');
    const targetIndex = secondTableRows.findIndex(el => el.label === 'Ad');
    if (prevRow) {
      const newRow: RowType = { ...prevRow, id: Date.now().toString(), label: customInputName, canAddRow: false };
      const updatedRows = [...secondTableRows];
      insertAt(updatedRows, targetIndex + 1, newRow);
      setSecondTableRows(updatedRows);
      setCustomNameInput('');
    }
  }, [secondTableRows, customInputName]);

  const getExtraRowButton = useCallback((row: RowType) => {
    let extraRowBtn;
    if (row.canAddCustomRow) {
      extraRowBtn = (
        <tr>
          <td>
            <div className="input-group children-centered-horizontally">
              <select className="form-select" aria-label="Seleziona l'etichetta" onChange={onSelectOptions}>
                {getOptions(possibleExtraFields)}
              </select>
            </div>
            <Button key={row.label + Date.now()} className="extra-row-btn" size="sm" variant="primary" onClick={() => onCreateCustomInput()}>
              Aggiungi Riga Custom <i className="pl-2 fa-solid fa-plus"></i>
            </Button>
          </td>
        </tr>
      );
    } else {
      extraRowBtn = (
        <tr>
          <td>
            <Button key={row.label + Date.now()} className="extra-row-btn" size="sm" variant="primary" onClick={() => addRow(row)}>Aggiungi Riga <i className="fa-solid fa-plus"></i></Button>
          </td>
        </tr>
      );
    }
    return row.canAddRow ? extraRowBtn : '';
  }, [addRow, onCreateCustomInput, getOptions, onSelectOptions, possibleExtraFields]);

  const deleteRow = useCallback((rowId: string) => {
    const isInFirstTable = firstTableRows.find(el => el.id === rowId);
    if (isInFirstTable) {
      const updatedRows = firstTableRows.filter(row => row.id !== rowId);
      setFirstTableRows(updatedRows);
    } else {
      const updatedRows = secondTableRows.filter(row => row.id !== rowId);
      setSecondTableRows(updatedRows);
    }
  }, [firstTableRows, secondTableRows]);

  const getTableRows = useCallback((rows: RowType[], cols: string[]) => {
    const result = rows.map((row, index) => {
      return (
        <React.Fragment key={row + '-' + index}>
          <tr key={row + '-' + index}>
            <th key='firstCell' className='fixed-width-cell'>
              {row.canDelete && <Button className="delete-row-btn" size="sm" variant="danger" onClick={() => deleteRow(row.id)}><i className="fa-solid fa-trash-can"></i></Button>}
              {row.label}
            </th>
            {getTDs(firstTableCols.length - 1, row, cols)}
          </tr>
          {!!row.canAddRow && getExtraRowButton(row)}
        </React.Fragment>
      );
    }
    );
    return result;
  }, [firstTableCols.length, getExtraRowButton, getTDs, deleteRow]);

  const calculateResults = useCallback(() => {
    const fusedTablesRows = [...firstTableRows, ...secondTableRows];
    const fusedTableRowsFilledCellsOnly = fusedTablesRows.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
    const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
    const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
    console.log('calculating based on this data:', fusedTableRowsFilledCellsOnly);
    console.log('rowsWithTotal:', rowsWithTotal);
    const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
    console.log('totalPower:', totalPower);
    console.log('amountOfResponses:', amountOfResponsesVal);
    const calculatedPercentage = getPercentage(totalPower, amountOfResponsesVal);
    console.log('>>>>> calculatedPercentage:', calculatedPercentage);
    setAmountOfResponses(amountOfResponsesVal);
    setResultingPercentage(calculatedPercentage);
    setGotResults(true);
  }, [firstTableRows, secondTableRows]);

  const resetAll = useCallback(() => {
    setGotResults(false);
    setAmountOfResponses(0);
    setResultingPercentage(0);
    setFirstTableRows(firstTableRowsInitialValue);
    setSecondTableRows(secondTableRowsInitialValue);
    setPossibleExtraFields(possibleExtraFieldsInitialValue);
  }, [firstTableRowsInitialValue, possibleExtraFieldsInitialValue, secondTableRowsInitialValue]);

  return (
    <div className="App">
      <h1>Calcolo risultati test di Rorschach </h1>
      <div className='tables-container'>
        <Table striped bordered id="first-table">
          <thead className='sticky-table-headers'>
            <tr>
              {dynamicTableHeaders1}
            </tr>
          </thead>
          <tbody>
            {getTableRows(firstTableRows.filter(el => el.section === 0), firstTableCols)}
            <tr key='divider1' className="table-divider"></tr>
            {getTableRows(firstTableRows.filter(el => el.section === 1), firstTableCols)}
            <tr key='divider2' className="table-divider"></tr>
            {getTableRows(firstTableRows.filter(el => el.section === 2), firstTableCols)}
            <tr key='divider3' className="table-divider"></tr>
          </tbody>
        </Table>
        <Table striped bordered id="second-table">
          <thead className='sticky-table-headers'>
            <tr>
              {dynamicTableHeaders2}
            </tr>
          </thead>
          <tbody>
            {getTableRows(secondTableRows.filter(el => el.section === 0), secondTableCols)}
            <tr key='divider1' className="table-divider"></tr>
            {getTableRows(secondTableRows.filter(el => el.section === 1), secondTableCols)}
            <tr key='divider2' className="table-divider"></tr>
            {getTableRows(secondTableRows.filter(el => el.section === 2), secondTableCols)}
            <tr key='divider3' className="table-divider"></tr>
          </tbody>
        </Table>
      </div>
      <div className='w-100'>
        <Button className="submit-btn" size="lg" variant="success" onClick={calculateResults}> Ottieni Risultati <i className="pl-2 fa-solid fa-right-to-bracket"></i></Button>
        <Button className="reset-btn" size="lg" variant="danger" onClick={resetAll}> Reset</Button>
      </div>
      {
        gotResults && (
          <div className='tables-container'>
            <h4>Numero di Risposte: {amountOfResponses}</h4>
            <h4>Percentuale: {resultingPercentage} %</h4>
          </div>
        )
      }
    </div >
  );
}

export default App;
