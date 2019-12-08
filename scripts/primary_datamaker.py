import json

elections = {}

state_names = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

candidates = [
    'Joe Biden',
    'Elizabeth Warren',
    'Bernie Sanders',
    'Pete Buttigieg',
    'Andrew Yang',
    'Michael Bloomberg',
    'Amy Klobuchar',
    'Cory Booker',
    'Julián Castro',
    'John Delaney',
    'Tulsi Gabbard',
    'Deval Patrick',
    'Tom Steyer',
    'Michael Bennet',
    'Marianne Williamson'
]

for state_name in state_names:
    election = {}
    print(state_name)

    elections[state_name] = {}
    elections[state_name]["candidates"] = []

    # Get candidates
    election["candidates"] = []

    for i in range(0, len(candidates)):
        candidate = {}
        candidate["name"] = candidates[i]
        candidate["party"] = "Democrat"
        elections[state_name]["candidates"].append(candidate)

serialized = json.dumps(elections, sort_keys=True, indent=3)
outFile = open("E:\Source\prediction-app\client\src\data\\2020\primary_elections.json", "w")
outFile.write(serialized)
outFile.close()
    