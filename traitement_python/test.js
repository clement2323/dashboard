const duckdb = require('duckdb');

const db = new duckdb.Database(':memory:', {
    "access_mode": "READ_WRITE",
    "max_memory": "512MB",
    "threads": "4"
}, (err) => {
  if (err) {
    console.error(err);
  }
});

// Ouvrir une connexion à la base de données
 db.all("SELECT semaine, reussis FROM read_parquet('donnees_enq_concatennees.parquet') where enquete = 'HVP'", (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête:", err);
    } else {
      console.log("Résultats de la requête:", result);
      console.table(result)
    }
  });


aws_access_key_id = 'YOUR_ACCESS_KEY_ID'
aws_secret_access_key = 'YOUR_SECRET_ACCESS_KEY'
bucket_name = 'YOUR_BUCKET_NAME'
s3_file_path = 's3://' + bucket_name + '/your_file.csv'


// db.exec("SET s3_access_key_id = ?", (aws_access_key_id))
// db.exec("SET s3_secret_access_key = ?", (aws_secret_access_key))

// db.exec("SET s3_secret_access_key = ?", (aws_secret_access_key))
db.exec("SET s3_endpoint = 'minio.lab.sspcloud.fr'")

// # Query the file directly from S3


const query = `
  WITH numbered_rows AS (
    SELECT *,
      ROW_NUMBER() OVER(PARTITION BY NEnqOri ORDER BY NEnqOri) as row_num
    FROM (
      SELECT *,
        REPLACE(NEnqOri, ' ', '') as NEnqOri_no_spaces
      FROM read_csv('s3://cguillo/dashboard/ST971_EEC23B_2023_36_A.TXT',AUTO_DETECT=TRUE,SKIP = 4,null_padding=TRUE,header=TRUE)
    ) t
    WHERE LENGTH(NEnqOri_no_spaces) = 4
  )
  SELECT *
  FROM numbered_rows
  WHERE row_num = 1
  ORDER BY NEnqOri;
`;

db.all(query, (err, result) => {
  if (err) {
    console.error("Erreur lors de l'exécution de la requête:", err);
  } else {
    console.log("Résultats de la requête:", result);
  }
});
// print(result)


// Question :
// traitement que en duck db ? python d'abord ?
// enregistrement en json sur volume partagé ou j'en reste à un chargeent S3 direct?
// comment faire avec react ? / api ou non ?
// passage par parquet nécessairement ? 
// comment gérer les allers et retour ?ecouter les changements sur s3 ?``
// orgnisation générale ?
// possibilité d'installation de node etc... sur le datalab insee ? 
// export s3/ etc.. à chaque fois alias ?