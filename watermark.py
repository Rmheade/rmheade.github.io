import os
from bs4 import BeautifulSoup

# The directory containing your HTML files
root_dir = 'pages'

# The watermark content
watermark_html = """
<div class="watermark-box">
    studying.work.gd
</div>
"""

# The CSS for the watermark (Bottom-right corner, fades on hover)
watermark_style = """
<style>
    .watermark-box {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-family: sans-serif;
        font-size: 14px;
        border-radius: 5px;
        z-index: 9999;
        pointer-events: auto;
        transition: opacity 0.3s ease;
    }
    .watermark-box:hover {
        opacity: 0;
        pointer-events: none;
    }
</style>
"""

def add_watermark(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')

    # Avoid adding duplicate watermarks if the script is run twice
    if soup.find('div', class_='watermark-box'):
        print(f"Skipping: {file_path} (Already watermarked)")
        return

    # Inject the style into the head and the div into the body
    if soup.head:
        soup.head.append(BeautifulSoup(watermark_style, 'html.parser'))
    
    if soup.body:
        soup.body.append(BeautifulSoup(watermark_html, 'html.parser'))
        
    # Write the changes back to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Processed: {file_path}")

# Walk through all subdirectories
for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".html") or file.endswith(".htm"):
            full_path = os.path.join(subdir, file)
            add_watermark(full_path)

print("Finished watermarking all pages.")