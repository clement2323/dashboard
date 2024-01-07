import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import DuckDb from "../DuckDb";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  function transformResult(result) {
    return result.map(row => {
      if (row.y instanceof Uint32Array && row.y.length > 0) {
        row.y = row.y[0];
      }
      row.x = parseInt(row.x);
      //delete row.id;
      return row;
    });
  }

  const [data, setData] = useState([]);


  useEffect(() => {


  const doTest = async (id, color, sqlQuery) => {
    console.log("appel doTest");
    var result = await DuckDb.test(sqlQuery);
  
    // transform Uint32Array to number
    result = transformResult(result);    
      
    // C'est une rustine je me prémunis de la double execution..
    setData(prevData => {
      // Vérifie si la clé existe déjà
      if (prevData.some(item => item.id === id)) {
        // Si la clé existe déjà, retourne le tableau de données précédent sans modifications
        return prevData;
      } else {
        // Si la clé n'existe pas, ajoute le nouvel objet au tableau
        return [...prevData, {
          id: id,
          color: color,
          data: result
        }];
      }
    });
  
  };
 

  doTest("Martinique", `${colors.redAccent[400]}`, `
  WITH cumul AS (
    SELECT semaine, 
           SUM(sum(reussis)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as reussis_cumul,
           SUM(sum(nfa)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as nfa_cumul
    FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
    WHERE enquete = 'EEC' AND dep = '972' And semaine IN (36, 37,43,45,46,47,48,49)
    GROUP BY semaine
    ORDER BY semaine
  )
  SELECT semaine as x, 100*reussis_cumul/ nfa_cumul as y
  FROM cumul
  
`);

doTest("Guyane", `${colors.greenAccent[400]}`, `
WITH cumul AS (
  SELECT semaine, 
         SUM(sum(reussis)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as reussis_cumul,
         SUM(sum(nfa)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as nfa_cumul
  FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
  WHERE enquete = 'EEC' AND dep = '973' and semaine IN (36, 37,43,45,46,47,48,49)
  GROUP BY semaine
  ORDER BY semaine
)
SELECT semaine as x, 100*reussis_cumul/ nfa_cumul as y
FROM cumul

`);

doTest("Guadeloupe", `${colors.grey[400]}`, `
WITH cumul AS (
  SELECT semaine, 
         SUM(sum(reussis)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as reussis_cumul,
         SUM(sum(nfa)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as nfa_cumul
  FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
  WHERE enquete = 'EEC' AND dep = '971' And semaine IN (36, 37,43,45,46,47,48,49)
  GROUP BY semaine
  ORDER BY semaine
)
SELECT semaine as x, 100*reussis_cumul/ nfa_cumul as y
FROM cumul

`);
console.log("appel doTest");
console.log(data);
  
  }, []);


  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
      // stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      //curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "semaine", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "taux de collecte", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;