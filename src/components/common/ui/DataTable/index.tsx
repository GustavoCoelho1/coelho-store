import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'cliente', headerName: 'Cliente', width: 130 },
    {
        field: 'data',
        headerName: 'Data',
        width: 90,
    },
] as GridColDef[];

const rows = [
    { id: 1, status: 'Snow', cliente: 'Jon', data: 35 },
    { id: 2, status: 'Lannister', cliente: 'Cersei', data: 42 },
    { id: 3, status: 'Lannister', cliente: 'Jaime', data: 45 },
    { id: 4, status: 'Stark', cliente: 'Arya', data: 16 },
    { id: 5, status: 'Targaryen', cliente: 'Daenerys', data: null },
    { id: 6, status: 'Melisandre', cliente: null, data: 150 },
    { id: 7, status: 'Clifford', cliente: 'Ferrara', data: 44 },
    { id: 8, status: 'Frances', cliente: 'Rossini', data: 36 },
    { id: 9, status: 'Roxie', cliente: 'Harvey', data: 65 },
];

interface Props {
    columns: any[];
    rows: any[];
}

const Table: React.FC<Props> = ({ columns, rows }) => {
    return (
        <div className="w-full h-96">
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
};

export default Table;
