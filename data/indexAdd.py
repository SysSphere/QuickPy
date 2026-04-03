import json

with open("E:/best/QuickPy/data/lessons.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for i, lesson in enumerate(data["lessons"], start=1):
    lesson["index"] = i

with open("lessons_indexed.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Added index to {len(data['lessons'])} lessons.")