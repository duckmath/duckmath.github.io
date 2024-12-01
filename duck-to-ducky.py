def read_dm_icon_filename(given:str):
    wanted_keyword="src=\"assets/img/icons/"
    wanted = given.find(wanted_keyword)
    ret = read_in_quotes(given[len(wanted_keyword)+wanted:len(wanted_keyword)+wanted+100])
    return ret





def get_title(found_title):
    title = ''
    found_start = False
    for i in range(len(found_title)):
        if(found_title[i]=="<"):
            break
        if(not found_start):
            if(found_title[i] != ' '):
                found_start=True
            else:
                continue
        elif(found_title[i]!=' '):
            found_start=True
            title=title+found_title[i]
        elif(found_title[i]==' '):
            if(i<len(found_title)-1 and found_title[i+1] == ''):
                break
            else:
                title=title+found_title[i]
    return title.strip()

# read everything until a quote
def read_in_quotes(word):
    new_word = ''
    for i in range(len(word)):
        if(word[i] == "\""):
            break
        else:
            new_word+=word[i]

    return new_word.strip()





built_insert = '''
INSERT INTO apps (title, link, icon) VALUES '''


import os
files = os.listdir("./g4m3s/")
for i in files:
    if('.html' in i):
        with open("./g4m3s/" + i, 'r') as file:
            content = file.read()
            title_keyword = "<div class=\"title_text\">"
            title_index = content.find(title_keyword)
            if(title_index!=-1):
                curTitle = get_title(content[title_index+len(title_keyword):title_index+len(title_keyword)+60])
            # now find link
            link_keyword = '''sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock
                allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin
                allow-downloads"
        src=\"'''
            link_index = content.find(link_keyword)
            if(link_index!=-1):
                curLink = read_in_quotes(content[link_index+len(link_keyword):link_index+len(link_keyword)+200])
                #print(curLink)

            with open('./index.html' , 'r') as index_file:
                cur_icon_keyword = "href=\"g4m3s/"+i
                index_content  =index_file.read()
                cur_icon_index = index_content.find(cur_icon_keyword)
                if(cur_icon_index!=-1):
                    curIcon  = "https://raw.githubusercontent.com/duckmath/icons/refs/heads/main/"+read_dm_icon_filename(index_content[cur_icon_index+len(cur_icon_keyword): cur_icon_index+len(cur_icon_keyword)+500])
                    #print(curIcon)

            if(curTitle and curIcon and curLink):
                built_insert += f'(\'{curTitle}\', \'{curLink}\', \'{curIcon}\'),\n'


print(built_insert)