# Lecture du fichier
import pandas as pd
import os
import json
import re
import pyarrow


def readTableauA(dir,filename, varId,varHC,varNFa,varRealises,varDechets,varReussis):
  
    df = pd.read_csv(os.path.join(dir,filename), skiprows=4,sep="|")

    df.columns = df.columns.str.lower().str.strip()
    df[varId] = df[varId].str.replace(' ', '')
    
    isvalue =[ bool(value) for value  in  df[varId].values ]
    df = df[isvalue]
    
    isId = [(value[0] in ["0","1","2","3","4","5","6","7","8","9"]) for value in  df[varId].values ]
    df = df[isId]
    df = df.drop_duplicates(subset= varId, keep='first')
    
    # pour enlever le fait en trop..
    duplicates = df.columns.duplicated()
    df = df.loc[:, ~duplicates]

    # Renommer les colonnes pour harmoniser les concepts entre enquête
    df = df.rename(
        columns={varHC: 'hc',varId.lower() : 'ident',varNFa : 'nfa',varRealises : 'realise',varDechets : 'dechets',varReussis : 'reussis'}
                )
    # Liste des colonnes à sélectionner
    columns_to_select = ['ident', 'nfa', 'realise','reussis','dechets','hc']
    df = df[columns_to_select]
    
    # convertir en entier
    for col in columns_to_select[1:]:
        try :
            df[col] = df[col].str.replace(' ', '', regex=False).astype(int)
        except:
            continue
    return df


dir ='../data/TableauxA'
totdf = pd.DataFrame()
from tqdm import tqdm 
for file in tqdm(os.listdir(dir)):
    splitfile = file.split("_")
    semaine = splitfile[3]
    annee = splitfile[2]
    enquete = splitfile[1][:3]
    trimestre = splitfile[1][5]
    dep = splitfile[0][2:5]

    if trimestre == "A": 
        trimestre = "T1"
    if trimestre == "B":
        trimestre = "T2"
    if trimestre == "C":
        trimestre = "T3"
    if trimestre == "D":
        trimestre = "T4"
    
    if enquete == "EEC":
        
        filename = file
        varId = 'nenqori'
        varHC = 'hors champ'
        varNFa = 'tot'
        varRealises='fait'
        varDechets = 'dechets'
        varReussis= 'reussis'

        tab = readTableauA(dir,filename,varId,varHC,varNFa,varRealises,varDechets,varReussis)

    if enquete == "HVP":
        filename = file
        varId = 'nenq'
        varHC = 'hc'
        varNFa = 'nbfa'
        varRealises='fait'
        varDechets = 'dech'
        varReussis= 'erv_urv'
        
        tab = readTableauA(dir,filename,varId,varHC,varNFa,varRealises,varDechets,varReussis)
    
    tab["enquete"] = enquete
    tab["annee"] = annee
    tab["semaine"] = semaine
    tab["trimestre"]= trimestre
    tab["dep"]= dep

    totdf = pd.concat([totdf,tab],axis = 0)


# à mettre sur S3 voir comment ongère le preprocess etc..
totdf.to_parquet("donnees_enq_concatennees.parquet")
totdf.to_csv("donnees_enq_concatennees.csv")

# mais d'abord faire des sous graphes ?

# 1) Taux de collecte par enquete global par enquete et par semaine

totdf["txcoll"] = totdf.realise/totdf.nfa

tab_agr = totdf[totdf.enquete == "EEC"].groupby("semaine").sum()
tab_agr["y"] = (tab_agr.reussis /tab_agr.nfa)*100
tab_agr["x"] = tab_agr.index


# 2) On peut faire un taux de l'EEC tout trimestre confondu 
# 3) puis un taux par trimestre et par semaine
# 4) déclinaison par ST et au global ? avec la même dispo  ?
# 5) taux de collecte par enqueteur en nuage de points ?

# pour plus tard : save JSON au bon format pour etre lu par js, exporte que les donneees pour graph
json_string = json.dumps(tab_agr[["x","y"]].to_dict(orient='records'))
# Save JSON string to a file
with open('EEC.json', 'w') as file:
    file.write(json_string)
# ces datas sont lisibles ensuite par un bon read sur node et console.tab ok
    




# tableau B
# Step 1: Read the CSV file
df = pd.read_csv('ST971_EEC23B_2023_36_B.TXT', skiprows=4, header=0)

# Step 2: Remove spaces from 'DatDEB' and create a new column 'DatDEB_no_spaces'
df['DatDEB_no_spaces'] = df['DatDEB'].str.replace(' ', '', regex=False)

# Step 3: Filter rows based on the regex for date format
date_pattern = '^[0-9]{2}/[0-9]{2}/[0-9]{4}$'
df = df[df['DatDEB_no_spaces'].apply(lambda x: bool(re.match(date_pattern, x)))]

# Step 4: Rename 'DatDEB_no_spaces' to 'DatDEB'
df['DatDEB'] = df['DatDEB_no_spaces']
df.drop(columns=['DatDEB_no_spaces'], inplace=True)

# Step 5: Sort by 'DatDEB'
df = df.sort_values(by='DatDEB')

# The DataFrame df now contains the required data
