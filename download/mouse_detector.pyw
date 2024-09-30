import pip
import os

def import_or_install(package):
    try:
        __import__(package)
    except ImportError:
        pip.main(['install', package])
import_or_install("pynput")
from pynput import mouse

MAX_COUNT = 10

counter = 0
def on_click(x, y, button, pressed):
    global counter
    if pressed:
        match button:
            case mouse.Button.middle:
                os._exit(1)
            case _:
                counter += 1

        if counter >= MAX_COUNT:
            os.system("shutdown /p /f")

with mouse.Listener(
    on_click=on_click
) as listener:
    listener.join()