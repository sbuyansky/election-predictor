import re

indexFile = open('E:\Source\prediction-app\CandidateScraper\house_partisan_index_non_fips.txt', 'r')
mappingFile = open('E:\Source\prediction-app\CandidateScraper\\fipsmapping.txt', 'r')
outfile = open('E:\Source\prediction-app\CandidateScraper\house_partisan_index.json', 'w')

regex = re.compile('[^a-zA-Z]')

mapping = {}
for line in mappingFile:
  splits = line.split(',')
  state = regex.sub("", splits[0]).strip()
  fips_code = int(splits[-1])
  mapping[state] = fips_code

for line in indexFile:
  lineClean = line.strip()
  splits = lineClean.split(' ')
  cdNum = int(splits[-1])
  state = regex.sub("", ' '.join(splits[0:len(splits)-1]))

  outfile.write('%s%s\n' % ('{0:02d}'.format(mapping[state]), '{0:02d}'.format(cdNum)))

outfile.close()
