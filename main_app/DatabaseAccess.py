import sqlite3

# database Path
path = '/Users/paddy/Coding/nbtsgui/main_app/testdatabase/hlr.sqlite3'

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

