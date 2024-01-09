import DuckDb from "../DuckDb";

// tableau enquêteur
export const enqueteurs = await DuckDb.test(`
SELECT ident, dep, enquete, sum(nfa) as nfa, sum(reussis) as reussis, sum(realise) as realise, sum(hc) as hc, sum(dechets) as dechets
FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
group by ident, enquete, dep
order by dep
`);

// camembert
let result  = await DuckDb.test(`
SELECT (sum(nfa)-sum(realise)) as nonrealise, sum(reussis) as reussis, sum(hc) as hc, sum(dechets) as dechets
FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
`);

const colorsPie = ["hsl(104, 70%, 50%)", "hsl(162, 70%, 50%)", "hsl(291, 70%, 50%)", "hsl(229, 70%, 50%)"];
const labels =["non realisées", "Fa réussies", "hors champ", "dechets"]
  // Transformer le résultat en un tableau d'objets
console.log(result[0]);


delete result[0].id;
result = Object.keys(result[0]).map((key, index) => ({
  id: key,
  label: labels[index],
  value: result[0][key],
  color: colorsPie[index % colorsPie.length],
}))



export const repartitionFa  = result.map(row => {
  if (row.value instanceof Uint32Array && row.value.length > 0) {
    row.value = row.value[0];
    return row;
  }})


  //Line Chart EEC

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

  const data = []
  const addSerie = async (id, color, sqlQuery) => {
    
    let result = await DuckDb.test(sqlQuery);
    result = transformResult(result);    
    
    // C'est une rustine je me prémunis de la double execution..
   
      if (data.some(item => item.id === id)) {
        return ;
      } else {
        // Si la clé n'existe pas, ajoute le nouvel objet au tableau
        data.push({
          id: id,
          color: color,
          data: result
        });
      }
    };

  addSerie("DIRAG", `yellow`, `
  WITH cumul AS (
    SELECT semaine, 
           SUM(sum(reussis)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as reussis_cumul,
           SUM(sum(nfa)) OVER (ORDER BY semaine ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as nfa_cumul
    FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
    WHERE enquete = 'EEC' And semaine IN (36, 37,43,45,46,47,48,49)
    GROUP BY semaine
    ORDER BY semaine
  )
  SELECT semaine as x, 100*reussis_cumul/ nfa_cumul as y
  FROM cumul
  
`);
 

  addSerie("Martinique", "red", `
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

addSerie("Guyane", "green", `
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

addSerie("Guadeloupe", "orange", `
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

export const donneesEECLine = data;
//coucou