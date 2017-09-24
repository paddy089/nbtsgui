import sqlite3

# database Path
path = '/home/mone2/openbsc-0.14.0/openbsc/src/osmo-nitb/hlr.sqlite3'

cursor = None


# establish connection and return cursor obj
def connect():
    # connect to DB
    conn = sqlite3.connect(path)
    cursor = conn.cursor()
    return cursor


# get all Subscribers, return list
def getSubscribers():
    global cursor
    if cursor is None:
        cursor = connect()

    cursor.execute("SELECT * FROM Subscriber")
    outList = cursor.fetchall()
    return outList

# kllk
# subscriberList = getSubscribers()
# for x in subscriberList:
#     print(x)

