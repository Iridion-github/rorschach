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
  hasLastCol?: boolean;
  canAddRow?: boolean;
  canAddCustomRow?: boolean;
  canAddPrimaryPhenomenonRow?: string;
  canAddSecondaryPhenomenonRow?: string;
  canDelete?: boolean;
  notStandalone?: boolean;
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
  const resultNum = ((100 * partialValue) / totalValue);
  const resultStr = resultNum.toString();
  if (resultStr.includes('.') && resultStr.split('.')[1].length > 2) {
    return Number(resultNum.toFixed(2));
  } else {
    return Number(resultNum);
  }
};

function App() {
  const [initialTableCols] = useState(['TAV', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Somma Totale']);
  const [firstTableCols] = useState(['TAV', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Sommatoria Formale', 'Punteggio']);
  const [secondTableCols] = useState(['TAV', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Sommatoria Formale', 'Punteggio']);

  const initialTableRowsInitialValue = useMemo(() => [
    //sezione temporale
    { id: '0', label: 'T.L.', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(initialTableCols.length), notStandalone: true },
    { id: '1', label: 'T.T.', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(initialTableCols.length), notStandalone: true },
  ], [initialTableCols.length]);
  const [initialTableRows, setInitialTableRows] = useState<RowType[]>(initialTableRowsInitialValue);

  const firstTableRowsInitialValue = useMemo(() => [
    //prima sezione
    { id: '2', label: 'R', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(firstTableCols.length), notStandalone: true },
    { id: '3', label: 'R+', hasLastCol: true, section: 0, power: 1, instances: getInitialInstances(firstTableCols.length), notStandalone: true },
    //sezione da G a Dr
    { id: '4.1', label: 'G', hasLastCol: false, canAddRow: true, canAddCustomRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '5.1', label: 'D', hasLastCol: false, canAddRow: true, canAddCustomRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '6.1', label: 'Dim+', hasLastCol: false, canAddRow: true, canAddCustomRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '7', label: 'Dd', hasLastCol: false, canAddRow: true, canAddCustomRow: true, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '8', label: 'Di', hasLastCol: false, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '9', label: 'Dr', hasLastCol: false, section: 1, power: 0, instances: getInitialInstances(firstTableCols.length) },
    //sezione da F a Clob
    { id: '10', label: 'F+', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '11', label: 'F±', hasLastCol: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '12', label: 'F-', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '13.1', label: 'Sommatoria F', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length), notStandalone: true },
    { id: '13.2', label: 'Sommatoria F+', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length), notStandalone: true },
    { id: '14.1', label: 'M↑', hasLastCol: true, canAddRow: true, canAddCustomRow: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.2', label: 'M@', hasLastCol: true, canAddRow: true, canAddCustomRow: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.3', label: 'M↓', hasLastCol: true, canAddRow: true, canAddCustomRow: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.4', label: 'M+', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.5', label: 'M±', hasLastCol: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.6', label: 'M-', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '14.71', label: 'Sommatoria M', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length), notStandalone: true },
    { id: '14.72', label: 'Sommatoria M+', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length), notStandalone: true },
    { id: '15.1', label: 'FC', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '15.2', label: 'CF', hasLastCol: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '15.3', label: 'C', hasLastCol: true, canAddRow: true, canAddCustomRow: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '16.1', label: 'FC’b', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '16.2', label: 'c’bF', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '16.3', label: 'C’b', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '18.1', label: 'FClob', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '18.2', label: 'ClobF', hasLastCol: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '18.3', label: 'Clob', hasLastCol: true, canAddRow: true, canAddCustomRow: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: '19.1', label: 'F(C)', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: '19.2', label: 'F(C)±', hasLastCol: true, section: 2, power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: '19.3', label: 'F(C)-', hasLastCol: true, section: 2, power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [firstTableRows, setFirstTableRows] = useState<RowType[]>(firstTableRowsInitialValue);

  const secondTableRowsInitialValue = useMemo(() => [
    //prima sezione
    { id: '20.1', label: 'MA↑', hasLastCol: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '20.2', label: 'MA@', hasLastCol: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '20.3', label: 'MA↓', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '21.1', label: 'mi↑', hasLastCol: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '21.2', label: 'mi@', hasLastCol: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '21.3', label: 'mi↓', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '23.1', label: 'Ef↑', hasLastCol: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '23.3', label: 'Ef↓', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '24', label: 'Mr', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '25.1', label: 'Fc', hasLastCol: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '25.2', label: 'cF', hasLastCol: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '25.3', label: 'c', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '26.1', label: 'FC’n', hasLastCol: true, section: 0, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '26.2', label: 'C’nF', hasLastCol: true, section: 0, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '26.3', label: 'C’n', hasLastCol: true, section: 0, power: 0, instances: getInitialInstances(secondTableCols.length) },
    //seconda sezione
    { id: '28.1', label: 'V', hasLastCol: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '28.2', label: '(V)', hasLastCol: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length) },
    { id: '28.3', label: 'Sommatoria V', hasLastCol: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '28.4', label: 'Sommatoria V+', hasLastCol: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '29', label: 'O+', hasLastCol: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '30', label: 'O±', hasLastCol: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '31', label: 'O-', hasLastCol: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '31.1', label: '(O)+', hasLastCol: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '31.2', label: '(O)±', hasLastCol: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '31.3', label: '(O)-', hasLastCol: true, section: 1, power: 0.5, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '31.4', label: 'Sommatoria O', hasLastCol: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    { id: '31.5', label: 'Sommatoria O+', hasLastCol: true, section: 1, power: 1, instances: getInitialInstances(secondTableCols.length), notStandalone: true },
    //terza sezione
    { id: '32', label: 'H', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '33', label: 'Hd', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '34', label: 'A', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35', label: 'Ad', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.1', label: 'OBJ', hasLastCol: true, canAddRow: false, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.2', label: 'Anat', hasLastCol: true, canAddRow: false, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.3', label: 'Nat', hasLastCol: true, canAddRow: false, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.4', label: 'Arch', hasLastCol: true, canAddRow: false, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    { id: '35.5', label: 'Simb', hasLastCol: true, section: 2, power: 1, instances: getInitialInstances(secondTableCols.length) },
    //sezione finale
    { id: '37', label: 'CHOC', hasLastCol: true, canAddRow: true, section: 3, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '38.1', label: 'FENOMENI SPECIALI Primari', hasLastCol: false, canAddRow: true, canAddPrimaryPhenomenonRow: 'Aggiungi Fenomeno Primario', section: 3, power: 0, instances: getInitialInstances(secondTableCols.length) },
    { id: '38.2', label: 'FENOMENI SPECIALI Secondari', hasLastCol: false, canAddRow: true, canAddSecondaryPhenomenonRow: 'Aggiungi Fenomeno Secondario', section: 3, power: 0, instances: getInitialInstances(secondTableCols.length) },
  ], [secondTableCols.length]);
  const [secondTableRows, setSecondTableRows] = useState<RowType[]>(secondTableRowsInitialValue);

  const possibleExtraFields_G_InitialValue = useMemo(() => [
    { id: 'extra_G_0', label: 'DG', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_G_1', label: 'g', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_G_2', label: 'Gim', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_G_3', label: 'GDdim', power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_G, setPossibleExtraFields_G] = useState<RowType[]>(possibleExtraFields_G_InitialValue);

  const possibleExtraFields_D_InitialValue = useMemo(() => [
    { id: 'extra_D_0', label: 'DDim', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_D_1', label: 'DimD', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_D_2', label: 'DDdim', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_D_3', label: 'DGim', power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_D, setPossibleExtraFields_D] = useState<RowType[]>(possibleExtraFields_D_InitialValue);

  const possibleExtraFields_Dim_InitialValue = useMemo(() => [
    { id: 'extra_Dim_0', label: 'ImG', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Dim_1', label: 'Ddim', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Dim_2', label: 'DdimG', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Dim_3', label: 'DdimD', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Dim_4', label: 'DdimDd', power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_Dim, setPossibleExtraFields_Dim] = useState<RowType[]>(possibleExtraFields_Dim_InitialValue);

  const possibleExtraFields_Dd_InitialValue = useMemo(() => [
    { id: 'extra_Dd_0', label: 'DdG', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Dd_1', label: 'DdDim', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Dd_2', label: 'DdGim', power: 0, instances: getInitialInstances(firstTableCols.length) },

  ], [firstTableCols.length]);
  const [possibleExtraFields_Dd, setPossibleExtraFields_Dd] = useState<RowType[]>(possibleExtraFields_Dd_InitialValue);

  const possibleExtraFields_MarrowUp_InitialValue = useMemo(() => [
    { id: 'extra_MarrowUp_0', label: 'M↑±', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_MarrowUp_1', label: 'M↑-', power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_MarrowUp, setPossibleExtraFields_MarrowUp] = useState<RowType[]>(possibleExtraFields_MarrowUp_InitialValue);

  const possibleExtraFields_MarrowDown_InitialValue = useMemo(() => [
    { id: 'extra_MarrowDown_0', label: 'M↑±', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_MarrowDown_1', label: 'M↑-', power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_MarrowDown, setPossibleExtraFields_MarrowDown] = useState<RowType[]>(possibleExtraFields_MarrowDown_InitialValue);

  const possibleExtraFields_MarrowAt_InitialValue = useMemo(() => [
    { id: 'extra_MarrowAt_0', label: 'M↑±', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_MarrowAt_1', label: 'M↑-', power: 0, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_MarrowAt, setPossibleExtraFields_MarrowAt] = useState<RowType[]>(possibleExtraFields_MarrowAt_InitialValue);

  const possibleExtraFields_C_InitialValue = useMemo(() => [
    { id: 'extra_C_0', label: 'FC±', power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_C_1', label: 'CF-', power: 0, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_C_2', label: 'MC', power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_C_3', label: 'CM', power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_C_4', label: 'MC’b', power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_C_5', label: 'C’bM', power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_C_6', label: 'M(C)', power: 1, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_C, setPossibleExtraFields_C] = useState<RowType[]>(possibleExtraFields_C_InitialValue);

  const possibleExtraFields_Clob_InitialValue = useMemo(() => [
    { id: 'extra_Clob_0', label: 'ClobbC', power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Clob_0', label: 'CClob', power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Clob_0', label: 'ClobC’b', power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Clob_0', label: 'C’bClob', power: 0.5, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Clob_0', label: 'FCClob', power: 1, instances: getInitialInstances(firstTableCols.length) },
    { id: 'extra_Clob_0', label: 'ClobFC', power: 0.5, instances: getInitialInstances(firstTableCols.length) },
  ], [firstTableCols.length]);
  const [possibleExtraFields_Clob, setPossibleExtraFields_Clob] = useState<RowType[]>(possibleExtraFields_Clob_InitialValue);

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

  const dynamicTableHeaders0 = useMemo(() => {
    return initialTableCols.map((col, index) =>
      <th key={col + '-' + index}>{col}</th>
    );
  }, [initialTableCols]);

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
    const isInInitialTable = initialTableRows.find(el => el.id === id);
    const isInFirstTable = firstTableRows.find(el => el.id === id);
    let targetArr;
    if (isInInitialTable) {
      targetArr = initialTableRows;
    } else if (isInFirstTable) {
      targetArr = firstTableRows;
    } else {
      targetArr = secondTableRows;
    }
    let updateFunc;
    if (isInInitialTable) {
      updateFunc = setInitialTableRows;
    } else if (isInFirstTable) {
      updateFunc = setFirstTableRows;
    } else {
      updateFunc = setSecondTableRows;
    }
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
  }, [firstTableRows, secondTableRows, initialTableRows]);

  const [primaryPhenomenonCustomLabel, setPrimaryPhenomenonCustomLabel] = useState('');

  const onChangePrimaryPhenomenonCustomLabel = useCallback((rowId: string, event: ChangeEvent<HTMLInputElement>) => {
    setPrimaryPhenomenonCustomLabel(event.target.value);
  }, [setPrimaryPhenomenonCustomLabel]);

  const [secondaryPhenomenonCustomLabel, setSecondaryPhenomenonCustomLabel] = useState('');

  const onChangeSecondaryPhenomenonCustomLabel = useCallback((rowId: string, event: ChangeEvent<HTMLInputElement>) => {
    setSecondaryPhenomenonCustomLabel(event.target.value);
  }, [setSecondaryPhenomenonCustomLabel]);


  const getTDs = useCallback((amount: number, row: RowType, columns: string[]) => {
    const result = [];
    const differential = row.hasLastCol ? 0 : 1;
    let noInput = false;
    for (let i = 0; i < amount - differential; i++) {
      const currentCol = columns[i + 1];
      let readOnly = false;
      if (row.label.includes('Sommatoria')) {
        readOnly = true;
      } else {
        if (currentCol === 'Sommatoria Formale' || currentCol === 'Punteggio' || currentCol === 'Somma Totale' || row.label === 'R' || row.label === 'R+') {
          readOnly = true;
        }
      }
      let updatingValue = undefined;
      if (row.label === 'R') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const fusedTableRowsFilledCellsOnly = allStandaloneRows.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
        if (currentCol === 'Sommatoria Formale') {
          noInput = false;
          updatingValue = amountOfResponsesVal;
        } else if (currentCol === 'Punteggio') {
          noInput = true;
          updatingValue = 0;
        } else {
          const currentColNumOfAnswers = allStandaloneRows.map(row => row.instances[i]).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfAnswers;
        }
      } else if (row.label === 'R+') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const fusedTableRowsFilledCellsOnly = allStandaloneRows.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          noInput = true;
          updatingValue = 0;
        } else if (currentCol === 'Punteggio') {
          const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
          const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = totalPower;
        } else {
          const currentColNumOfPoints = allStandaloneRows.map(row => row.instances[i] * (row.power ?? 0)).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfPoints;
        }
      } else if (row.label === 'Sommatoria F') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const allRowsWithTargetLetter = allStandaloneRows.filter(row => row.label === 'F+' || row.label === 'F±' || row.label === 'F-');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = amountOfResponsesVal;
        } else if (currentCol === 'Punteggio') {
          noInput = true;
          updatingValue = 0;
        } else {
          const currentColNumOfAnswers = allRowsWithTargetLetter.map(row => row.instances[i]).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfAnswers;
        }
      } else if (row.label === 'Sommatoria F+') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const allRowsWithTargetLetter = allStandaloneRows.filter(row => row.label === 'F+' || row.label === 'F±' || row.label === 'F-');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          noInput = true;
          updatingValue = 0;
        } else if (currentCol === 'Punteggio') {
          const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
          const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = totalPower;
        } else {
          const currentColNumOfPoints = allRowsWithTargetLetter.map(row => row.instances[i] * (row.power ?? 0)).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfPoints;
        }
      } else if (row.label === 'Sommatoria V') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const allRowsWithTargetLetter = allStandaloneRows.filter(row => row.label === 'V' || row.label === '(V)');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = amountOfResponsesVal;
        } else if (currentCol === 'Punteggio') {
          noInput = true;
          updatingValue = 0;
        } else {
          const currentColNumOfAnswers = allRowsWithTargetLetter.map(row => row.instances[i]).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfAnswers;
        }
      } else if (row.label === 'Sommatoria V+') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const allRowsWithTargetLetter = allStandaloneRows.filter(row => row.label === 'V' || row.label === '(V)');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          noInput = true;
          updatingValue = 0;
        } else if (currentCol === 'Punteggio') {
          const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
          const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = totalPower;
        } else {
          const currentColNumOfPoints = allRowsWithTargetLetter.map(row => row.instances[i] * (row.power ?? 0)).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfPoints;
        }
      } else if (row.label === 'Sommatoria O') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allRowsWithTargetLetter = allRowsExceptTime.filter(row => row.label === 'O+' || row.label === 'O±' || row.label === 'O-' || row.label === '(O)+' || row.label === '(O)±' || row.label === '(O)-');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = amountOfResponsesVal;
        } else if (currentCol === 'Punteggio') {
          noInput = true;
          updatingValue = 0;
        } else {
          const currentColNumOfAnswers = allRowsWithTargetLetter.map(row => row.instances[i]).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfAnswers;
        }
      } else if (row.label === 'Sommatoria O+') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allRowsWithTargetLetter = allRowsExceptTime.filter(row => row.label === 'O+' || row.label === 'O±' || row.label === 'O-' || row.label === '(O)+' || row.label === '(O)±' || row.label === '(O)-');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          noInput = true;
          updatingValue = 0;
        } else if (currentCol === 'Punteggio') {
          const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
          const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = totalPower;
        } else {
          const currentColNumOfPoints = allRowsWithTargetLetter.map(row => row.instances[i] * (row.power ?? 0)).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfPoints;
        }
      } else if (row.label === 'Sommatoria M') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const allRowsWithTargetLetter = allStandaloneRows.filter(row => row.label === 'M↑' || row.label === 'M@' || row.label === 'M↓' || row.label === 'M+' || row.label === 'M±' || row.label === 'M-');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = amountOfResponsesVal;
        } else if (currentCol === 'Punteggio') {
          noInput = true;
          updatingValue = 0;
        } else {
          const currentColNumOfAnswers = allRowsWithTargetLetter.map(row => row.instances[i]).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfAnswers;
        }
      } else if (row.label === 'Sommatoria M+') {
        const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
        const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
        const allRowsWithTargetLetter = allStandaloneRows.filter(row => row.label === 'M↑' || row.label === 'M@' || row.label === 'M↓' || row.label === 'M+' || row.label === 'M±' || row.label === 'M-');
        const fusedTableRowsFilledCellsOnly = allRowsWithTargetLetter.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
        if (currentCol === 'Sommatoria Formale') {
          noInput = true;
          updatingValue = 0;
        } else if (currentCol === 'Punteggio') {
          const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
          const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
          noInput = false;
          updatingValue = totalPower;
        } else {
          const currentColNumOfPoints = allRowsWithTargetLetter.map(row => row.instances[i] * (row.power ?? 0)).reduce((acc, currVal) => acc + currVal, 0);
          noInput = false;
          updatingValue = currentColNumOfPoints;
        }
      } else if (row.label === 'FENOMENI SPECIALI Primari' || row.label === 'FENOMENI SPECIALI sECONDARI') {
        if (currentCol === 'Sommatoria Formale') {
          noInput = true;
          updatingValue = 0;
        } else if (currentCol === 'Punteggio') {
          noInput = true;
          updatingValue = 0;
        } else {
          noInput = true;
          updatingValue = 0;
        }
      } else {
        if (currentCol === 'Somma Totale') {
          const target = initialTableRows.find(r => r.id === row.id);
          const sumOfInstances = target?.instances.reduce((partialSum, a) => partialSum + a, 0);
          updatingValue = sumOfInstances;
        }
        if (currentCol === 'Sommatoria Formale') {
          const isInInitialTable = initialTableRows.find(el => el.id === row.id);
          const isInFirstTable = firstTableRows.find(el => el.id === row.id);
          let target;
          if (isInInitialTable) {
            target = initialTableRows.find(r => r.id === row.id);
          } else if (isInFirstTable) {
            target = firstTableRows.find(r => r.id === row.id);
          } else {
            target = secondTableRows.find(r => r.id === row.id);
          }
          const sumOfInstances = target?.instances.reduce((partialSum, a) => partialSum + a, 0);
          updatingValue = sumOfInstances;
        }
        if (currentCol === 'Punteggio') {
          const isInInitialTable = initialTableRows.find(el => el.id === row.id);
          const isInFirstTable = firstTableRows.find(el => el.id === row.id);
          let target;
          if (isInInitialTable) {
            target = initialTableRows.find(r => r.id === row.id);
          } else if (isInFirstTable) {
            target = firstTableRows.find(r => r.id === row.id);
          } else {
            target = secondTableRows.find(r => r.id === row.id);
          }
          const rowPower = target ? target.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) : 0;
          updatingValue = rowPower;
        }
      }
      result.push(
        <td key={row.label + '-' + i}>
          <div className="input-group children-centered-horizontally">
            {!noInput && <input
              disabled={readOnly}
              type="number"
              id={row.id} min={0}
              defaultValue={readOnly ? undefined : 0}
              value={updatingValue}
              className={readOnly ? "form-control cell-input-read-only" : "form-control cell-input"}
              onChange={event => onChangeInput(row.id, event, i)}
              aria-label="numero"
            />
            }
          </div>
        </td>
      );
    }
    result.push();
    return result;
  }, [onChangeInput, firstTableRows, secondTableRows, initialTableRows]);

  const addRow = useCallback((row: RowType) => {
    const isInInitialTable = initialTableRows.find(el => el.label === row.label);
    const isInFirstTable = firstTableRows.find(el => el.label === row.label);
    let targetArr;
    let updateFunc;
    if (isInInitialTable) {
      targetArr = initialTableRows;
      updateFunc = setInitialTableRows;
    } else if (isInFirstTable) {
      targetArr = firstTableRows;
      updateFunc = setFirstTableRows;
    } else {
      targetArr = secondTableRows;
      updateFunc = setSecondTableRows;
    }
    const targetIndex = targetArr.findIndex(el => el.label === row.label);
    const newRow = { ...row, canAddRow: false, id: Date.now().toString(), canDelete: true };
    const updatedRows = [...targetArr];
    insertAt(updatedRows, targetIndex, newRow);
    updateFunc(updatedRows);
  }, [firstTableRows, secondTableRows, initialTableRows]);

  const [customInputName, setCustomNameInput] = useState('');

  const onCreateCustomRow = useCallback((prevRowLabel: string) => {
    const prevRow = secondTableRows.find(el => el.label === prevRowLabel);
    const targetIndex = secondTableRows.findIndex(el => el.label === prevRowLabel);
    if (prevRow) {
      const newRow: RowType = { ...prevRow, id: Date.now().toString(), label: customInputName, canAddRow: false };
      const updatedRows = [...secondTableRows];
      insertAt(updatedRows, targetIndex + 1, newRow);
      setSecondTableRows(updatedRows);
      setCustomNameInput('');
    }
  }, [secondTableRows, customInputName]);

  const onCreatePrimaryPhenomenonRow = useCallback((prevRowLabel: string) => {
    const prevRow = secondTableRows.find(el => el.label === prevRowLabel);
    const targetIndex = secondTableRows.findIndex(el => el.label === prevRowLabel);
    if (prevRow) {
      const newRow: RowType = { ...prevRow, id: Date.now().toString(), label: primaryPhenomenonCustomLabel, canAddRow: false, canDelete: true };
      const updatedRows = [...secondTableRows];
      insertAt(updatedRows, targetIndex + 1, newRow);
      setSecondTableRows(updatedRows);
      setCustomNameInput('');
    }
    setPrimaryPhenomenonCustomLabel('');
  }, [secondTableRows, primaryPhenomenonCustomLabel]);

  const onCreateSecondaryPhenomenonRow = useCallback((prevRowLabel: string) => {
    const prevRow = secondTableRows.find(el => el.label === prevRowLabel);
    const targetIndex = secondTableRows.findIndex(el => el.label === prevRowLabel);
    if (prevRow) {
      const newRow: RowType = { ...prevRow, id: Date.now().toString(), label: secondaryPhenomenonCustomLabel, canAddRow: false, canDelete: true };
      const updatedRows = [...secondTableRows];
      insertAt(updatedRows, targetIndex + 1, newRow);
      setSecondTableRows(updatedRows);
      setCustomNameInput('');
    }
    setSecondaryPhenomenonCustomLabel('');
  }, [secondTableRows, secondaryPhenomenonCustomLabel]);

  const getExtraRowButton = useCallback((row: RowType) => {
    let extraRowBtn;
    if (row.canAddCustomRow) {
      let targetCustomFields: any[] = [];
      switch (row.label) {
        case 'G': targetCustomFields = possibleExtraFields_G; break;
        case 'D': targetCustomFields = possibleExtraFields_D; break;
        case 'Dim+': targetCustomFields = possibleExtraFields_Dd; break;
        case 'Dd': targetCustomFields = possibleExtraFields_Dim; break;
        case 'M↑': targetCustomFields = possibleExtraFields_MarrowUp; break;
        case 'M@': targetCustomFields = possibleExtraFields_MarrowAt; break;
        case 'M↓': targetCustomFields = possibleExtraFields_MarrowDown; break;
        case 'C': targetCustomFields = possibleExtraFields_C; break;
        case 'Clob': targetCustomFields = possibleExtraFields_Clob; break;
        default: targetCustomFields = []; console.log('ERROR ASSIGNING EXTRA FIELDS FOR THIS LABEL:', row.label); break;
      };
      extraRowBtn = (
        <tr>
          <td>
            <div className="input-group children-centered-horizontally">
              <select className="form-select" aria-label="Seleziona l'etichetta" onChange={onSelectOptions}>
                {getOptions(targetCustomFields)}
              </select>
            </div>
            <Button key={row.label + Date.now()} className="extra-row-btn" size="sm" variant="primary" onClick={() => onCreateCustomRow(row.label)}>
              Aggiungi Riga Custom <i className="pl-2 fa-solid fa-plus"></i>
            </Button>
          </td>
        </tr>
      );
    } else if (row.canAddPrimaryPhenomenonRow?.length) {
      extraRowBtn = (
        <tr>
          <td>
            <div className="input-group children-centered-horizontally">
              <input
                aria-label="Inserisci il nome del fenomeno primario"
                type="text"
                id={row.id + Date.now()}
                value={primaryPhenomenonCustomLabel}
                className={"form-control"}
                onChange={event => onChangePrimaryPhenomenonCustomLabel(row.id, event)}
              />
            </div>
            <Button key={row.label + Date.now()} className="extra-row-btn" size="sm" variant="primary" onClick={() => onCreatePrimaryPhenomenonRow(row.label)}>
              {row.canAddPrimaryPhenomenonRow} <i className="pl-2 fa-solid fa-plus"></i>
            </Button>
          </td>
        </tr>
      );
    } else if (row.canAddSecondaryPhenomenonRow?.length) {
      extraRowBtn = (
        <tr>
          <td>
            <div className="input-group children-centered-horizontally">
              <input
                aria-label="Inserisci il nome del fenomeno secondario"
                type="text"
                id={row.id + Date.now()}
                value={secondaryPhenomenonCustomLabel}
                className={"form-control"}
                onChange={event => onChangeSecondaryPhenomenonCustomLabel(row.id, event)}
              />
            </div>
            <Button key={row.label + Date.now()} className="extra-row-btn" size="sm" variant="primary" onClick={() => onCreateSecondaryPhenomenonRow(row.label)}>
              {row.canAddSecondaryPhenomenonRow} <i className="pl-2 fa-solid fa-plus"></i>
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
  }, [
    addRow,
    onCreateCustomRow,
    getOptions,
    onSelectOptions,
    possibleExtraFields_D,
    possibleExtraFields_G,
    possibleExtraFields_Dd,
    possibleExtraFields_Dim,
    possibleExtraFields_C,
    possibleExtraFields_MarrowAt,
    possibleExtraFields_MarrowDown,
    possibleExtraFields_MarrowUp,
    possibleExtraFields_Clob,
    primaryPhenomenonCustomLabel,
    onChangePrimaryPhenomenonCustomLabel,
    onCreatePrimaryPhenomenonRow,
    secondaryPhenomenonCustomLabel,
    onChangeSecondaryPhenomenonCustomLabel,
    onCreateSecondaryPhenomenonRow
  ]);

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
            {getTDs(cols.length - 1, row, cols)}
          </tr>
          {!!row.canAddRow && getExtraRowButton(row)}
        </React.Fragment>
      );
    }
    );
    return result;
  }, [getExtraRowButton, getTDs, deleteRow]);

  const calculateResults = useCallback(() => {
    const allRowsExceptTime = [...firstTableRows, ...secondTableRows];
    console.log('allRowsExceptTime:', allRowsExceptTime);
    const allStandaloneRows = allRowsExceptTime.filter(row => !row.notStandalone);
    console.log('allStandaloneRows:', allStandaloneRows);
    const fusedTableRowsFilledCellsOnly = allStandaloneRows.filter(row => row.instances.reduce((partialSum, a) => partialSum + a, 0) > 0);
    console.log('fusedTableRowsFilledCellsOnly:', fusedTableRowsFilledCellsOnly);
    const rowsWithTotal = fusedTableRowsFilledCellsOnly.map(row => ({ ...row, total: row.instances.reduce((partialSum, a) => partialSum + a, 0) * (row.power ?? 0) }));
    const amountOfResponsesVal = fusedTableRowsFilledCellsOnly.map(row => row.instances.reduce((partialSum, a) => partialSum + a, 0)).reduce((partialSum, a) => partialSum + a, 0);
    console.log('calculating based on this data:', fusedTableRowsFilledCellsOnly);
    console.log('rowsWithTotal:', rowsWithTotal);
    const totalPower = rowsWithTotal.map(row => row.total).reduce((partialSum, a) => partialSum + a, 0);
    console.log('totalPower:', totalPower);
    console.log('amountOfResponses:', amountOfResponsesVal);
    const calculatedPercentage = getPercentage(totalPower, amountOfResponsesVal);
    console.log('calculatedPercentage:', calculatedPercentage);
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
    setPossibleExtraFields_D(possibleExtraFields_D_InitialValue);
    setPossibleExtraFields_G(possibleExtraFields_G_InitialValue);
    setPossibleExtraFields_Dd(possibleExtraFields_Dd_InitialValue);
    setPossibleExtraFields_Dim(possibleExtraFields_Dim_InitialValue);
    setPossibleExtraFields_MarrowUp(possibleExtraFields_MarrowUp_InitialValue);
    setPossibleExtraFields_MarrowAt(possibleExtraFields_MarrowAt_InitialValue);
    setPossibleExtraFields_MarrowDown(possibleExtraFields_MarrowDown_InitialValue);
    setPossibleExtraFields_C(possibleExtraFields_C_InitialValue);
    setPossibleExtraFields_Clob(possibleExtraFields_Clob_InitialValue);
  }, [
    firstTableRowsInitialValue,
    secondTableRowsInitialValue,
    possibleExtraFields_D_InitialValue,
    possibleExtraFields_G_InitialValue,
    possibleExtraFields_Dd_InitialValue,
    possibleExtraFields_Dim_InitialValue,
    possibleExtraFields_MarrowUp_InitialValue,
    possibleExtraFields_MarrowAt_InitialValue,
    possibleExtraFields_MarrowDown_InitialValue,
    possibleExtraFields_C_InitialValue,
    possibleExtraFields_Clob_InitialValue
  ]);

  return (
    <div className="App">
      <h1>Calcolo risultati test di Rorschach </h1>
      <div className='tables-container'>
        <Table striped bordered id="initial-table">
          <thead className='sticky-table-headers'>
            <tr>
              {dynamicTableHeaders0}
            </tr>
          </thead>
          <tbody>
            {getTableRows(initialTableRows.filter(el => el.section === 0), initialTableCols)}
            <tr key='divider1' className="table-divider"></tr>
          </tbody>
        </Table>
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
            {getTableRows(firstTableRows.filter(el => el.section === 3), firstTableCols)}
            <tr key='divider4' className="table-divider"></tr>
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
            {getTableRows(secondTableRows.filter(el => el.section === 3), secondTableCols)}
            <tr key='divider4' className="table-divider"></tr>
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
