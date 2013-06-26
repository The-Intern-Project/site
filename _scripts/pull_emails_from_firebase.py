import json
from sys import argv
from datetime import datetime

print "usage: python <script> source_json"


source = json.load(open(argv[1], 'r'))
all_data_points = source.values()[0].values()

last_pull = datetime(2013, 06, 25)

date_cutoff = last_pull
recent_signups = [item for item in all_data_points if
    datetime.strptime(item['submit_time'].split()[0], "%m/%d/%Y") > date_cutoff
]
print "{} emails since last week".format(len(recent_signups))

legit_signups = [item for item in recent_signups
    if not item['email'].endswith('.com')]

print "intern emails you should add: "
print "\n".join(item['email'] for item in legit_signups)

print "emails since last week that may not be legit"
print "\n".join([item['email'] for item in recent_signups
    if item not in legit_signups])
