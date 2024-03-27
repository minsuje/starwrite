import json




json_string = "[{\"id\":\"620e53ae-2254-4430-b006-a3a56a4fc19d\",\"type\":\"heading\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\",\"level\":1},\"content\":[{\"type\":\"text\",\"text\":\"이것은헤딩입니다\",\"styles\":{}}],\"children\":[]},{\"id\":\"2f48f0a5-6738-487c-b9ff-ff641618d4e1\",\"type\":\"bulletListItem\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"GPT-5는\",\"styles\":{}}],\"children\":[{\"id\":\"cb56eda3-b505-45c5-950d-12dc47f6b199\",\"type\":\"numberedListItem\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"GPT-4\",\"styles\":{}}],\"children\":[]},{\"id\":\"5b4d9088-f89c-48f4-a40b-ec537ae2f565\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[],\"children\":[{\"id\":\"35455ebd-def4-418a-a81a-76cb5aae6a5c\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"기계야화이팅\",\"styles\":{}}],\"children\":[]}]}]},{\"id\":\"02051b6f-ae3c-4c72-9d1c-98742c93840d\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"!\",\"styles\":{}},{\"type\":\"mention\",\"props\":{\"title\":\"배고파\",\"postid\":\"67\",\"nickname\":\"닉네임\"}},{\"type\":\"text\",\"text\":\"\",\"styles\":{}}],\"children\":[]},{\"id\":\"74709f8c-16d9-4b08-bdce-3483fb25a4ee\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"가족중에국회의원\",\"styles\":{}},{\"type\":\"link\",\"href\":\"www.naver.com\",\"content\":[{\"type\":\"text\",\"text\":\"안계시죠?\",\"styles\":{}}]}],\"children\":[]},{\"id\":\"fbb756d6-4b42-46db-93db-b5b575dc2d7a\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[{\"type\":\"text\",\"text\":\"\",\"styles\":{}}],\"children\":[]},{\"id\":\"b01eac10-9ac3-479f-81b0-6e224d154827\",\"type\":\"table\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\"},\"content\":{\"type\":\"tableContent\",\"rows\":[{\"cells\":[[{\"type\":\"text\",\"text\":\"2맞아요\",\"styles\":{}},{\"type\":\"link\",\"href\":\"www.google.com\",\"content\":[{\"type\":\"text\",\"text\":\"google.com\",\"styles\":{}}]}]]},{\"cells\":[[{\"type\":\"text\",\"text\":\"\",\"styles\":{}}]]}]},\"children\":[]},{\"id\":\"3cae97f0-5787-447d-a893-66c1711f7426\",\"type\":\"paragraph\",\"props\":{\"textColor\":\"default\",\"backgroundColor\":\"default\",\"textAlignment\":\"left\"},\"content\":[],\"children\":[]}]"



data = json.loads(json_string)

def extract_text(content):
    """Recursively extracts text from the content field."""
    if isinstance(content, dict):
        if 'type' in content and content['type'] == 'text' and 'text' in content:
            return content['text'].strip()
        else:
            return ''.join(extract_text(item) for item in content.values())
    elif isinstance(content, list):
        return ''.join(extract_text(item) for item in content)
    else:
        return ''

# Extracting all the text
all_text = ''.join(extract_text(item) for item in data)

print(all_text)