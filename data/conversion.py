import json
from pathlib import Path

# Path to your downloaded file
input_path = Path(r"E:\code soly 1\quickPythonScipts\data\dataset.json")
output_path = Path(r"E:\code soly 1\quickPythonScipts\data\python_codes_25k_converted.json")

# Open the file
with open(input_path, "r", encoding="utf-8") as f:
    data = json.load(f)  # assumes your downloaded file is a JSON list or dict

# Prepare output
converted = {"scripts": []}

# Check structure: some files are a list, some have 'data' key
records = data
if isinstance(data, dict) and "data" in data:
    records = data["data"]
elif isinstance(data, dict) and "train" in data:  # if split
    records = data["train"]

for idx, item in enumerate(records):
    instruction = item.get("instruction", "").strip()
    extra_input = item.get("input", "").strip()
    code = item.get("output", "").strip()

    # Combine instruction + input into description
    description = f"{instruction} {extra_input}".strip() if extra_input else instruction

    name = f"snippet_{idx + 1:07d}"

    converted["scripts"].append({
        "name": name,
        "description": description,
        "code": code
    })

# Write the converted JSON
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(converted, f, ensure_ascii=False, indent=2)

print(f"Converted JSON saved to {output_path}")