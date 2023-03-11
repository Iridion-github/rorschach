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
  originalIndex: number;
  section: number;
  value?: number;
  hasSigma?: boolean;
  canAddRow?: boolean;
}

const insertAt = (array: any[], index: number, ...elementsArray: any[]) => {
  array.splice(index, 0, ...elementsArray);
};

function App() {
  //todo: tot, % e Sigma sicuramente devono essere campi read-only autosettati.
  const [firstTableCols] = useState(['TAV', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'TOT', 'Σ']);
  const [secondTableCols] = useState(['TAV', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'TOT', '%']);
  const [firstTableRows, setFirstTableRows] = useState<RowType[]>([
    { id: '0', label: 'T.L.', originalIndex: 0, section: 0 },
    { id: '1', label: 'T.T.', originalIndex: 1, section: 0 },
    { id: '2', label: 'R', originalIndex: 2, section: 0 },
    { id: '3', label: 'R+', originalIndex: 3, section: 0 },
    { id: '4', label: 'G', originalIndex: 4, hasSigma: true, canAddRow: true, section: 1 },
    { id: '5', label: 'D', originalIndex: 5, hasSigma: true, canAddRow: true, section: 1 },
    { id: '6', label: 'Dim', originalIndex: 6, hasSigma: true, canAddRow: true, section: 1 },
    { id: '7', label: 'Dd', originalIndex: 7, hasSigma: true, canAddRow: true, section: 1 },
    { id: '8', label: 'Di', originalIndex: 8, hasSigma: true, section: 1 },
    { id: '9', label: 'Dr', originalIndex: 9, hasSigma: true, section: 1 },
    { id: '10', label: 'TOT', originalIndex: 10, hasSigma: true, section: 1 },
    { id: '11', label: 'F+', originalIndex: 11, hasSigma: true, section: 2 },
    { id: '12', label: 'F±', originalIndex: 12, hasSigma: true, section: 2 },
    { id: '13', label: 'F-', originalIndex: 13, hasSigma: true, section: 2 },
    { id: '14', label: 'M', originalIndex: 14, section: 2 },
    { id: '15', label: 'FC', originalIndex: 15, section: 2 },
    { id: '16', label: 'CF', originalIndex: 16, section: 2 },
    { id: '17', label: 'C', originalIndex: 17, canAddRow: true, section: 2 },
    { id: '18', label: 'CLOB*', originalIndex: 18, canAddRow: true, section: 2 },
    { id: '19', label: 'TOT.', originalIndex: 19, section: 2 },
  ]);

  const [secondTableRows, setSecondTableRows] = useState<RowType[]>([
    { id: '20', label: 'MA', originalIndex: 20, section: 0 },
    { id: '21', label: 'mi', originalIndex: 21, section: 0 },
    { id: '22', label: 'PM | M’P’', originalIndex: 22, section: 0 },
    { id: '23', label: 'Ef', originalIndex: 23, section: 0 },
    { id: '24', label: 'Mr', originalIndex: 24, section: 0 },
    { id: '25', label: 'Fc | cF | c', originalIndex: 25, section: 0 },
    { id: '26', label: 'FC’n | C’nF | C’n', originalIndex: 26, section: 0 },
    { id: '27', label: 'F(c)+ | F(c)-', originalIndex: 27, section: 0 },
    { id: '28', label: 'V', hasSigma: true, originalIndex: 28, section: 1 },
    { id: '29', label: 'O', hasSigma: true, originalIndex: 29, section: 1 },
    { id: '30', label: 'O+', hasSigma: true, originalIndex: 30, section: 1 },
    { id: '31', label: 'O-', hasSigma: true, originalIndex: 31, section: 1 },
    { id: '32', label: 'H', hasSigma: true, originalIndex: 32, section: 1 },
    { id: '33', label: 'Hd', hasSigma: true, originalIndex: 33, section: 1 },
    { id: '34', label: 'A', hasSigma: true, originalIndex: 34, section: 1 },
    { id: '35', label: 'Ad', hasSigma: true, canAddRow: true, originalIndex: 35, section: 1 },
    { id: '36', label: 'TOT.', hasSigma: true, originalIndex: 36, section: 2 },
    { id: '37', label: 'CHOC', hasSigma: true, originalIndex: 37, section: 2 },
    { id: '38', label: 'FENOMENI SPECIALI', hasSigma: true, originalIndex: 38, section: 2 },
  ]);

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

  const onChangeInput = useCallback((id: string, event: ChangeEvent<HTMLInputElement>) => {
    const isInFirstTable = firstTableRows.find(el => el.id === id);
    const targetArr = isInFirstTable ? firstTableRows : secondTableRows;
    const updateFunc = isInFirstTable ? setFirstTableRows : setSecondTableRows;
    const updatedRows = [...targetArr].map(el => {
      if (el.id === id) {
        return { ...el, value: Number(event.target.value) };
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
      const readOnly = currentCol === '%' || currentCol === 'TOT' || currentCol === 'Σ';
      result.push(
        <td key={row.label + '-' + i}>
          <div className="input-group children-centered-horizontally">
            <input disabled={readOnly} type="number" id={row.id} min={0} defaultValue={0} className={readOnly ? "form-control cell-input-read-only" : "form-control cell-input"} onChange={event => onChangeInput(row.id, event)} aria-label="numero" />
          </div>
        </td>
      );
    }
    result.push();
    return result;
  }, [onChangeInput]);

  const addRow = useCallback((row: RowType) => {
    const isInFirstTable = firstTableRows.find(el => el.originalIndex === row.originalIndex);
    const targetArr = isInFirstTable ? firstTableRows : secondTableRows;
    const updateFunc = isInFirstTable ? setFirstTableRows : setSecondTableRows;
    const targetIndex = targetArr.findIndex(el => el.originalIndex === row.originalIndex);
    const newRow = { ...row, canAddRow: false, id: Date.now().toString() };
    const updatedRows = [...targetArr];
    insertAt(updatedRows, targetIndex, newRow);
    updateFunc(updatedRows);
  }, [firstTableRows, secondTableRows]);

  const [customInputName, setCustomNameInput] = useState('');

  const onChangeCustomInputName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCustomNameInput(event.target.value);
  }, []);

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
    if (row.label === 'Ad') {
      extraRowBtn = (
        <tr>
          <td>
            <div className="input-group children-centered-horizontally">
              <input type="text" id={'custom-input'} value={customInputName} className="form-control custom-name-input" onChange={event => onChangeCustomInputName(event)} />
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
  }, [addRow, onChangeCustomInputName, onCreateCustomInput]);

  const getTableRows = useCallback((rows: RowType[], cols: string[]) => {
    const result = rows.map((row, index) => {
      return (
        <React.Fragment key={row + '-' + index}>
          <tr key={row + '-' + index}>
            <th key='firstCell' className='fixed-width-cell'>{row.label}</th>
            {getTDs(firstTableCols.length - 1, row, cols)}
          </tr>
          {!!row.canAddRow && getExtraRowButton(row)}
        </React.Fragment>
      );
    }
    );
    return result;
  }, [firstTableCols.length, getExtraRowButton, getTDs]);

  const calculateResults = useCallback(() => {
    const fusedTablesRows = [...firstTableRows, ...secondTableRows];
    console.log('calculating based on this data:', fusedTablesRows);
  }, [firstTableRows, secondTableRows]);

  return (
    <div className="App">
      <h1>Calcolo risultati test di Rorschach </h1>
      <div className='tables-container'>
        <Table striped bordered id="first-table">
          <thead>
            <tr>
              {dynamicTableHeaders1}
            </tr>
          </thead>
          <tbody>
            {getTableRows(firstTableRows.filter(el => el.section === 0), firstTableCols)}
            {getTableRows(firstTableRows.filter(el => el.section === 1), firstTableCols)}
            {getTableRows(firstTableRows.filter(el => el.section === 2), firstTableCols)}
          </tbody>
        </Table>
        <Table striped bordered id="second-table">
          <thead>
            <tr>
              {dynamicTableHeaders2}
            </tr>
          </thead>
          <tbody>
            {getTableRows(secondTableRows.filter(el => el.section === 0), secondTableCols)}
            {getTableRows(secondTableRows.filter(el => el.section === 1), secondTableCols)}
            {getTableRows(secondTableRows.filter(el => el.section === 2), secondTableCols)}
          </tbody>
        </Table>
      </div>
      <div className='w-100'>
        <Button className="submit-btn" size="lg" variant="success" onClick={calculateResults}> Ottieni Risultati <i className="pl-2 fa-solid fa-right-to-bracket"></i></Button>
      </div>
    </div>
  );
}

export default App;
