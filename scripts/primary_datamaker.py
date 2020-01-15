from datetime import datetime
import json

elections = {}

state_names = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Washington DC', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Democrats Abroad']

candidates = [
    'Joe Biden',
    'Elizabeth Warren',
    'Bernie Sanders',
    'Pete Buttigieg',
    'Andrew Yang',
    'Mike Bloomberg',
    'Amy Klobuchar',
    'John Delaney',
    'Tulsi Gabbard',
    'Deval Patrick',
    'Tom Steyer',
    'Michael Bennet'
]

election_dates = {
    'Iowa' : '3-Feb',
    'New Hampshire' : '11-Feb',
    'Nevada' : '22-Feb',
    'South Carolina' : '29-Feb',
    'Alabama' : '3-Mar',
    'American Samoa' : '3-Mar',
    'Arkansas' : '3-Mar',
    'California' : '3-Mar',
    'Colorado' : '3-Mar',
    'Maine' : '3-Mar',
    'Massachusetts' : '3-Mar',
    'Minnesota' : '3-Mar',
    'North Carolina' : '3-Mar',
    'Oklahoma' : '3-Mar',
    'Tennessee' : '3-Mar',
    'Texas' : '3-Mar',
    'Utah' : '3-Mar',
    'Vermont' : '3-Mar',
    'Virginia' : '3-Mar',
    'Democrats Abroad' : '10-Mar',
    'Idaho' : '10-Mar',
    'Michigan' : '10-Mar',
    'Mississippi' : '10-Mar',
    'Missouri' : '10-Mar',
    'North Dakota' : '10-Mar',
    'Washington' : '10-Mar',
    'Northern Mariana Islands' : '14-Mar',
    'Arizona' : '17-Mar',
    'Florida' : '17-Mar',
    'Illinois' : '17-Mar',
    'Ohio' : '17-Mar',
    'Georgia' : '24-Mar',
    'Puerto Rico' : '29-Mar',
    'Alaska' : '4-Apr',
    'Hawaii' : '4-Apr',
    'Louisiana' : '4-Apr',
    'Wyoming' : '4-Apr',
    'Wisconsin' : '7-Apr',
    'Connecticut' : '28-Apr',
    'Delaware' : '28-Apr',
    'Maryland' : '28-Apr',
    'New York' : '28-Apr',
    'Pennsylvania' : '28-Apr',
    'Rhode Island' : '28-Apr',
    'Guam' : '2-May',
    'Kansas' : '2-May',
    'Indiana' : '5-May',
    'Nebraska' : '12-May',
    'West Virginia' : '12-May',
    'Kentucky' : '19-May',
    'Oregon' : '19-May',
    'Washington DC' : '2-Jun',
    'Montana' : '2-Jun',
    'New Jersey' : '2-Jun',
    'New Mexico' : '2-Jun',
    'South Dakota' : '2-Jun',
    'U.S. Virgin Islands' : '6-Jun'
}

for state_name in state_names:
    election = {}
    print(state_name)

    val = election_dates[state_name] + " 2020"
    print(val)
    election_date = datetime.strptime(val, "%d-%b %Y")

    elections[state_name] = {}
    elections[state_name]["candidates"] = []
    elections[state_name]["date"] = election_date.strftime("%Y-%m-%d")

    # Get candidates
    election["candidates"] = []

    for i in range(0, len(candidates)):
        candidate = {}
        candidate["name"] = candidates[i]
        candidate["party"] = "Democratic"
        elections[state_name]["candidates"].append(candidate)

serialized = json.dumps(elections, sort_keys=True, indent=3)
outFile = open("E:\Source\prediction-app\client\src\data\\2020\primary_elections.json", "w")
outFile.write(serialized)
outFile.close()
    