import pandas as pd
import numpy as np

# CSV 파일 읽기
file_path = 'sample.csv'

try:
    df = pd.read_csv(file_path, header=None, delimiter=",")
except pd.errors.ParserError as e:
    print(f"Parsing error: {e}")


# 숫자로 변환할 수 없는 값을 NaN으로 처리
numeric_df = df.apply(pd.to_numeric, errors='coerce')

# NaN이 포함된 행을 찾기 (숫자가 아닌 값이 있는 행)
non_numeric_rows = df[numeric_df.isnull().any(axis=1)]

# 숫자만 포함된 행들로 필터링
numeric_only_df = numeric_df.dropna()

# 각 행에 대한 계산 결과 저장
results = []
for index, row in numeric_only_df.iterrows():
    minimum = row.min()
    maximum = row.max()
    total = row.sum()
    mean = row.mean()
    std_dev = row.std()
    median = row.median()

    results.append({
        'Index': index,
        'Min': minimum,
        'Max': maximum,
        'Sum': total,
        'Mean': mean,
        'Std': std_dev,
        'Median': median
    })

# 계산 결과 출력
print("The total number of lines:", len(df))
print("The calculated lines:")
results_df = pd.DataFrame(results)
print(results_df)

# 숫자가 아닌 값이 포함된 행들 출력
print("\nThe error values:")
print(non_numeric_rows)