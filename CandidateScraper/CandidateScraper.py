from bs4 import BeautifulSoup
import re
import json

def nominee_string(a):
    return a and "Nominee" in a.string

def party_string(a):
    return a and "Party" in a.string

electionHtml = open("E:\Source\prediction-app\CandidateScraper\senateElections.html", encoding="UTF-8")

#try and remove all invalid chars?
#electionHtml8 = open("E:\Source\prediction-app\CandidateScraper\senateElectionsUTF.html", "w", encoding="UTF-8")
#for line in electionHtml:
#    line = str(bytes(line, 'utf-8').decode('utf-8','ignore').encode("utf-8"))
#    electionHtml8.write(line)
#
#electionHtml8.close()    

soup = BeautifulSoup(electionHtml, features="html.parser")

first = True

elections = {}
elections["elections"] = []


for table in soup.findAll("table", class_="infobox"):
    isSpecial = False
    stateName = ""
    election = {}

    # Skip first box which is a summary of the year
    if first:
        first = False
        continue
    
    # caption contains state name and whether it is a special election
    caption = table.caption.string.split(" ")
    if(len(caption) > 2):
        if("special" in table.caption.string):
            stateName = "%s %s" % (caption[0], "Special")
        else:
            stateName = "%s %s" % (caption[0], caption[1])
    else:
        stateName = caption[0]

    if(isSpecial):
        print("%s, Special" % stateName)
    else:
        print(stateName)

    elections[stateName] = {}
    elections[stateName]["candidates"] = []

    # Get candidates
    candidates=[]
    parties=[]

    for th in table.findAll("th", string=nominee_string):
        for sibling in th.next_siblings:
            # Unknown Candidates
            if(sibling.string is not None and len(sibling.string.strip()) > 0):
                candidates.append(sibling.string.strip())
            # Candidates with wiki pages
            elif (sibling.name == "td"):
                if(sibling.a is not None):
                    candidates.append(sibling.a.string.strip())

    for th in table.findAll("th", string=party_string):
        for sibling in th.next_siblings:
            # Candidates with wiki pages
            if (sibling.name == "td"):
                if(sibling.a is not None):
                    parties.append(sibling.a.string.strip())

    if(stateName == "Mississippi" and isSpecial):
        candidates.append("Mike Espy")
        candidates.append("Cindy Hyde-Smith")
        candidates.append("Chris McDaniel")
        parties.append("Democratic")
        parties.append("Republican")
        parties.append("Republican")

    if(len(candidates) != len(parties)):
        raise ValueError("Parties and Candidates are not equal: %s" % stateName)

    election["candidates"] = []
    
    for i in range(0, len(candidates)):
        candidate = {}
        candidate["name"] = candidates[i]
        candidate["party"] = parties[i]
        elections[stateName]["candidates"].append(candidate)

serialized = json.dumps(elections, sort_keys=True, indent=3)
outFile = open("E:\Source\prediction-app\src\elections.json", "w")
outFile.write(serialized)
outFile.close()
    