import json

elections = {}

viewboxes =  open("E:\\Source\\prediction-app\\scripts\\viewboxes.txt", "r")

for line in viewboxes:
    statename, width, height = line.split(',')
    patternString = f'"{statename}": {{"width": {width}, "height":{height}}},'
    print(patternString)    