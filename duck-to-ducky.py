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
INSERT INTO apps (title, link, icon, categories) VALUES '''


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

                cur_categories_keyword = "class=\""
                cur_categories_index = cur_icon_index-50
                for i in range(cur_categories_index, cur_icon_index):
                    if(index_content[i]=='c' and index_content[i+1]=='l' and index_content[i+2]=='a' and index_content[i+3]=='s' and index_content[i+4]=='s' and index_content[i+5]=='=' and index_content[i+6]=='\"'):
                        cur_categories_index = i
                        break
                if(cur_categories_index!=-1):

                    cur_cat = read_in_quotes(index_content[cur_categories_index+len(cur_categories_keyword): cur_categories_index+len(cur_categories_keyword)+100])

            if(curTitle and curIcon and curLink):
                built_insert += f'(\'{curTitle}\', \'{curLink}\', \'{curIcon}\', \'{cur_cat}\'),\n'


#print(built_insert)

built_insert = '''
INSERT INTO apps (title, link, icon, categories) VALUES '''
files = os.listdir('./g4m3s/flash-g4m3s/')
for i in files:
    with open("./g4m3s/flash-g4m3s/"+i, 'r') as file:
        content = file.read()

        title_keyword = "<div class=\"title_text\">"
        title_index = content.find(title_keyword)
        if(title_index!=-1):
            curTitle = get_title(content[title_index+len(title_keyword):title_index+len(title_keyword)+60])

        swf_keyword = '''<script id="gabe">
        swfobject.embedSWF(
          "../../assets/flashfiles/'''
        swf_ind = content.find(swf_keyword)
        if(swf_ind != -1):
            swf_item = read_in_quotes(content[len(swf_keyword) + swf_ind: len(swf_keyword) + swf_ind+30])

        # use html file to find title in index
        with open('./index.html', 'r') as index_file:
            ind_cont = index_file.read()
            gabe_loc  = ind_cont.find("g4m3s/flash-g4m3s/" + i)
            if(gabe_loc!=-1):
                total_gabe  = ind_cont[gabe_loc: gabe_loc+350]
                image = total_gabe.find("assets/img/icons/")
                if(image!=-1):
                    curImage  = read_in_quotes(total_gabe[len("assets/img/icons/")+image:len("assets/img/icons/")+image+80])
        if(curImage and curTitle and swf_item and image):
            built_insert += f'(\'{curTitle}\',\'https://maddox.page/basic-ruffle-player/?file={swf_item}\',\'https://raw.githubusercontent.com/duckmath/icons/refs/heads/main/{curImage}\',\'Flash\'),\n'

print(built_insert)
# now add ruffle games #g4m3s/flash-g4m3s