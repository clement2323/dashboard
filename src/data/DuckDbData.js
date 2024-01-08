import DuckDb from "../DuckDb";

export const result = await DuckDb.test(`
SELECT ident, dep, enquete, sum(nfa) as nfa, sum(reussis) as reussis, sum(realise) as realise, sum(hc) as hc, sum(dechets) as dechets
FROM 'https://minio.lab.sspcloud.fr/cguillo/donnees_enq_concatennees.parquet'
group by ident, enquete, dep
order by dep
`);