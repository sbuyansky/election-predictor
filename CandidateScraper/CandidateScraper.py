from bs4 import BeautifulSoup

electionHtml = open("E:\Source\prediction-app\CandidateScraper\senateElectionsUTF.html", encoding="UTF-8")

#try and remove all invalid chars?
#electionHtml8 = open("E:\Source\prediction-app\CandidateScraper\senateElectionsUTF.html", "w", encoding="UTF-8")
#for line in electionHtml:
#    line = str(bytes(line, 'utf-8').decode('utf-8','ignore').encode("utf-8"))
#    electionHtml8.write(line)
#
#electionHtml8.close()    

soup = BeautifulSoup(electionHtml, features="html.parser")

first = True

for x in soup.findAll("table", class_="infobox"):
    isSpecial = False
    stateName = ""

    # Skip first box which is a summary of the year
    if first:
        first = False
        continue
    
    # caption contains state name and whether it is a special election
    caption = x.caption.string.split(" ")
    if(len(caption) > 2):
        if("special" in x.caption.string):
            isSpecial = True
            stateName = caption[0]
        else:
            stateName = "%s %s" % (caption[0], caption[1])
    else:
        stateName = caption[0]

    if(isSpecial):
        print("%s, Special" % stateName)
    else:
        print(stateName)

