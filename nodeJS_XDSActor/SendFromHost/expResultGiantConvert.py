import pandas as pd

# File names
files = [
    'All_expResultLog1.txt',
    'All_expResultLog2.txt',
    'All_expResultLog3.txt',
    'All_expResultLog4.txt',
    'All_expResultLog5.txt',
    'All_expResultLog6.txt',
    'All_expResultLog7.txt',
    'All_expResultLog8.txt',
    'All_expResultLog9.txt',
    'All_expResultLog10.txt',
    'All_expResultLog11.txt',
    'All_expResultLog12.txt',
    'All_expResultLog13.txt',
    'All_expResultLog14.txt',
    'All_expResultLog15.txt',
    'All_expResultLog16.txt',
    'All_expResultLog17.txt',
    'All_expResultLog18.txt',
    'All_expResultLog19.txt',
    'All_expResultLog20.txt',
    'All_expResultLog21.txt',
    'All_expResultLog22.txt',
    'All_expResultLog23.txt',
    'All_expResultLog24.txt',
    'All_expResultLog25.txt',
    'All_expResultLog26.txt',
    'All_expResultLog27.txt',
    'All_expResultLog28.txt',
    'All_expResultLog29.txt',
    'All_expResultLog30.txt',
]

# Initialize an empty list to store dataframes
dfs = []

for file in files:
    # Read the file into a dataframe
    df = pd.read_csv(file, header=None)
    
    # Remove columns with all NaN values
    df.dropna(axis=1, how='all', inplace=True)
    
    # Append the dataframe to the list
    dfs.append(df)
    
    # Append two empty rows
    dfs.append(pd.DataFrame([[]]))
    dfs.append(pd.DataFrame([[]]))

# Concatenate all dataframes
final_df = pd.concat(dfs, ignore_index=True)

# Write to Excel file
output_file = 'converted_table.xlsx'
final_df.to_excel(output_file, index=False, header=False)
