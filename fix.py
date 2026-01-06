import os

# 1. Configuration: Add your test URL to this list
# Make sure to include 'studying.work.gd' and your GitHub preview URL
ALLOWED_DOMAINS = ["studying.work.gd", "rmheade.github.io"]

def get_updated_security_logic():
    # This logic uses document.referrer to bypass cross-origin browser blocks
    return f"""
      const ALLOWED_DOMAINS = {str(ALLOWED_DOMAINS)};
      
      function checkDomain() {{
        try {{
          if (window.self === window.top) {{
            window.location.href = 'https://studying.work.gd/';
            return false;
          }}

          const referrer = document.referrer;
          if (!referrer) {{
            window.location.href = 'https://studying.work.gd/no.html';
            return false;
          }}

          const parentHost = new URL(referrer).hostname;
          const isAllowed = ALLOWED_DOMAINS.some(domain => 
            parentHost === domain || parentHost.endsWith('.' + domain)
          );

          if (!isAllowed) {{
            window.location.href = 'https://studying.work.gd/no.html';
            return false;
          }}
          return true;
        }} catch (e) {{
          window.location.href = 'https://studying.work.gd/no.html';
          return false;
        }}
      }}

      if (!checkDomain()) {{
        throw new Error('Domain security check failed');
      }}
    """

def process_folders(base_path):
    # These markers must match the text exactly as it appears in your HTML files
    start_marker = "const ALLOWED_DOMAINS ="
    end_marker = "// Listen for tilde key"

    # Walk through the "pages" folder and all subfolders
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    if start_marker in content and end_marker in content:
                        head = content.split(start_marker)[0]
                        tail = content.split(end_marker)[1]
                        
                        # Construct the new file content with the updated logic
                        updated_content = head + get_updated_security_logic().strip() + "\n " + end_marker + tail
                        
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(updated_content)
                        print(f"Successfully updated: {file_path}")
                    else:
                        print(f"Skipped (Markers not found): {file_path}")
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    # This will run on the 'pages' directory in your current workspace
    process_folders("pages")