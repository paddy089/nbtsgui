import telnetlib

## establish connection BCS(PC) BTS(nanoBTS)
#tn = telnetlib.Telnet('localhost', port=4242, timeout=20)
print('Connection established!')

##vars
# admin subscriber id
adminSubID = 20
subscriberList = []

## arguments
# inital command
defCommand = b""
# show subscriber
comSub = "show subscriber id "

## execute comands
def execCommand(command):
    # write command to nanoBTS
    tn.write(command + b"\n")
    # read callback from nanoBTS
    ret2 = tn.read_eager()
    ret2 = tn.read_until(b"_DNE", timeout=5)
    # handle callback
    print('Command executed!')
    return ret2


## send SMS as Admin to receiver
def adminSMS(receiverID, message):
    arg = "subscriber id " + str(receiverID) + " sms sender id " + str(adminSubID) + " send ADMIN: " + message + "."
    print(str.encode(arg,'ascii'))
    execCommand(str.encode(arg,'ascii'))


## send broadcast SMS as Admin to multible receivers
def broadcastSMS(receiverIDs, message):
    for x in receiverIDs:
        adminSMS(x, message)


## check subscriber status
def checkSubsState(subsList):
    resList = []
    #subState = [0] * len(subsList)
    counter = 0
    for x in subsList:
        print(counter)
        arg = comSub + str(x)
        print(str.encode(arg, 'ascii'))
        resList.append(execCommand(str.encode(arg, 'ascii')))
        #TODO check LAC and set value in subState
        if "LAC: 1/0x1" in str(resList[counter]):
            print(str(x)+" ist Online: "+str(resList[counter]))
        else:
            print(str(x) + " ist Offline: " + str(resList[counter]))
        counter = counter +1
    return


## TESTS

# ## default test (get connection)
# execCommand(defCommand)
#
# ## admin singel SMS
# #adminSMS(2, "Testmessage")
#
# ## broaadcast SMS
# # list with subscriber ID
# idList = [2, 5, 8]
# #broadcastSMS(idList,"Turn Off Phone!")
#
#
# ## test checkSubsState
# subList= [2, 8]
# checkSubsState(subList)