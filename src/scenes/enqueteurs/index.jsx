import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { enqueteurs as data } from "../../data/duckDbData.js";

const Enqueteurs = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    {
      field: "ident",
      headerName: "Identifiant",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "dep",
      headerName: "Département",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "enquete",
      headerName: "Enquête",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "nfa",
      headerName: "Nombre FA",
      flex: 1,
    },
    {
      field: "realise",
      headerName: "FA réalisées",
      flex: 1,
    },
    {
      field: "reussis",
      headerName: "FA réussies",
      flex: 1,
    },
    { field: "dechets", headerName: "Déchets" },
    { field: "hc", headerName: "Hors Champ" }
  ];

  return (
    <Box m="20px">
      <Header
        title="Enqueteurs"
        subtitle="Liste des enqueteurs et statistiques sur les enquetes"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Enqueteurs;


