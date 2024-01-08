import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";


const Actualite = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Actualités" subtitle="Activités en cours" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Tablettes GPS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Toujours en attente d'avancement pour les tablettes GPS. Redirection incessante sur l'informatique ou les MOA, pas d'avancement Muriel Barlet RDV ?
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Qualité du réseau internet en Martinique
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Légère amélioration pobservée par Louis Malard en Martinique, ce qui n'est pas du luxe puisque on avait pas grand chose
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            PRojet suivi des enquêteurs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Installation avec la DEM de Guadeloupe et généralisable aux autres DEM de l'outil de gestion des enquêteurs
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            TO DO
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Programme généraliste qui va récupérer l'ensemble des données, CAPI  SABIANE, ESANE, RP pour nourrir une app
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Actualite;