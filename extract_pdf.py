import PyPDF2
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("Lista de precios diligencias Cliente-Corresponsal 2025.pdf", "rb") as f:
    reader = PyPDF2.PdfReader(f)
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        print(f"--- PAGE {i+1} ---")
        print(text)
        print()
