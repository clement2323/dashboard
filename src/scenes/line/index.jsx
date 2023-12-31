import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import {donneesEECLine} from "../../data/DuckDbData.js";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Enquête EEC" subtitle="taux de collecte au cumulé par semaine" />
      <Box height="75vh">
        <LineChart data ={donneesEECLine} />
      </Box>
    </Box>
  );
};

export default Line;