import telnetlib

## establish connection BCS(PC) BTS(nanoBTS)
def conTel():
    tn = telnetlib.Telnet('localhost', port=4242, timeout=20)
    return tn

tn = conTel()

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
    state = {}
    resList = []
    counter = 0
    for x in subsList:
        arg = comSub + str(x)
        print(str.encode(arg, 'ascii'))
        resList.append(execCommand(str.encode(arg, 'ascii')))
        #TODO check LAC and set value in subState
        if "LAC: 1/0x1" in str(resList[counter]):
            print(str(x)+" ist Online.")
            state[str(x)] = 'Online'
        else:
            print(str(x) + " ist Offline.")
            state[str(x)] = 'Offline'
        counter = counter +1
    return state

## add Subscriber
def addSub(imsi,name):
    arg1 = "subscriber create imsi " + str(imsi)
    execCommand(str.encode(arg1, 'ascii'))
    arg2 = "show subscriber imsi " + str(imsi)
    cb = (execCommand(str.encode(arg2, 'ascii')))
    cb2str = str(cb)
    split = cb2str.split()
    _id = split[5]
    id = _id[0:2]
    arg3 = "enable"
    execCommand(str.encode(arg3, 'ascii'))
    arg4 = "subscriber id " +id+ " authorized 1"
    execCommand(str.encode(arg4, 'ascii'))
    arg5 = "subscriber id " + id + " name " + str(name)
    execCommand(str.encode(arg5, 'ascii'))
    arg6 = "disable"
    execCommand(str.encode(arg6, 'ascii'))

    return 'addSub success'

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
#subList= [20, 22]
#checkSubsState(subList)
