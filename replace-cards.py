import re

with open('apps/claw-wars.html', 'r', encoding='utf-8') as f:
    content = f.read()

with open('apps/card-art-11-20.js', 'r', encoding='utf-8') as f:
    new_art = f.read()

# Find the start marker (card 11 comment) and end marker (card 21 comment)
start_marker = '    // === 11: Pincer Duelist'
end_marker = '\n\n    // === 21:'

start_idx = content.index(start_marker)
end_idx = content.index(end_marker)

# Replace everything from start of card 11 to just before card 21
new_content = content[:start_idx] + new_art + content[end_idx:]

with open('apps/claw-wars.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'Replaced {end_idx - start_idx} characters starting at position {start_idx}')
print('Done!')
