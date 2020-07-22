import socket

HOST = '0.0.0.0'
PORT = 1299

# The service will be stopped after following finite successful returns
LISTEN_COUNT = 2
LISTEN_TIME = 3000  # in seconds


def handle_conn():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.settimeout(LISTEN_TIME)
        print("Bound to %s:%s | Expiring in %s seconds" % (HOST, PORT, LISTEN_TIME))
        s.listen()
        print("Listening ...")
        curr_call_num = 0
        while curr_call_num < LISTEN_COUNT:
            conn, addr = s.accept()
            curr_call_num += 1
            print("Connection Accepted (%s) from %s" % (curr_call_num, addr))
            with conn:
                conn.sendall(str.encode("Service Complete"))
                print("Client Notified")
            print("Connection Closed (%s)" % curr_call_num)

    print("Stopping Service at (%s, %s)" % (curr_call_num, LISTEN_COUNT))


if __name__ == '__main__':
    print("Starting Service Notifier Webhook ...")
    handle_conn()
