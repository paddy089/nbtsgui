import sqlite3

# database Path
path = '/home/mone2/openbsc-0.14.0/openbsc/src/osmo-nitb/hlr.sqlite3'


# get all Subscribers, return list
def getSubscribers():

    conn = sqlite3.connect(path)
    cursor = conn.cursor()


    cursor.execute("SELECT * FROM Subscriber")
    outList = cursor.fetchall()
    conn.close()
    return outList

def delSub(id):
    conn = sqlite3.connect(path)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM Subscriber WHERE id=" + id)
    conn.commit()

    conn.close()

# kllk
# subscriberList = getSubscribers()
# for x in subscriberList:
#     print(x)

