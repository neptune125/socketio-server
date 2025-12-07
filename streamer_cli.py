import time
import base64
from PIL import ImageGrab
import socketio
import io

sio = socketio.Client()
sio.connect('http://localhost:3000')  # ou ton IP locale

while True:
    img = ImageGrab.grab()
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    frame = base64.b64encode(buf.getvalue()).decode('utf-8')
    sio.emit('stream', frame)
    time.sleep(0.005)
