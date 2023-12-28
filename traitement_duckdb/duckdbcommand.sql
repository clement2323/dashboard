/*Ok pour : ST971_EEC23B_2023_36_A.TXT*/
/*ST972_EEC23C_2023_34_A.TXT*/

WITH numbered_rows AS (
    SELECT *, ROW_NUMBER() OVER(PARTITION BY NEnqOri ORDER BY NEnqOri) as row_num
    FROM (
        SELECT *, REPLACE(NEnqOri, ' ', '') as NEnqOri_no_spaces
        FROM read_csv('ST972_EEC23C_2023_34_A.TXT',AUTO_DETECT=TRUE,SKIP = 4,null_padding=TRUE,header=TRUE)
    ) t
    WHERE LENGTH(NEnqOri_no_spaces) = 4
)
SELECT * FROM numbered_rows WHERE row_num = 1 ORDER BY NEnqOri;


/*ST973_HVP23A_2023_49_A.TXT*/
/*ST971_LCH23C_2023_40_B.TXT*/

WITH numbered_rows AS (
    SELECT *, ROW_NUMBER() OVER(PARTITION BY NEnq ORDER BY NEnq) as row_num
    FROM (
        SELECT *, REPLACE(NEnq, ' ', '') as NEnqOri_no_spaces
        FROM read_csv('ST972_EEC23C_2023_34_A.TXT',AUTO_DETECT=TRUE,SKIP = 4,null_padding=TRUE,header=TRUE)
    ) t
    WHERE LENGTH(NEnqOri_no_spaces) = 4
)
SELECT * FROM numbered_rows WHERE row_num = 1 ORDER BY NEnq;


/* ok pour ST971_EEC23B_2023_36_B*/
SELECT *, DatDEB_no_spaces AS DatDEB
FROM (
    SELECT *, REPLACE(DatDEB, ' ', '') as DatDEB_no_spaces 
    FROM read_csv('ST971_EEC23B_2023_36_B.TXT',AUTO_DETECT=TRUE,SKIP = 4,null_padding=TRUE,header=TRUE) 
    WHERE CAST(DatDEB_no_spaces AS VARCHAR) ~ '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
) t
ORDER BY DatDEB;
