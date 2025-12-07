import time
import base64
from PIL import ImageGrab
import socketio
import io

sio = socketio.Client()

@sio.event
def connect():
    print("✅ Connecté au serveur !")

@sio.event
def connect_error(data):
    print("❌ Erreur de connexion :", data)

@sio.event
def disconnect():
    print("⚠️ Déconnecté du serveur")

# Connexion au serveur Render
sio.connect('https://socketio-server-3n18.onrender.com', transports=['websocket'])

while True:
    try:
        img = ImageGrab.grab().resize((1940, 1060))
        buf = io.BytesIO()
        img.save(buf, format='JPEG')
        frame = base64.b64encode(buf.getvalue()).decode('utf-8')

        sio.emit('stream', frame)
        print("Frame envoyée !", len(frame), "bytes")
        time.sleep(0.03)  # ~10 FPS pour test

    except Exception as e:
        print("Erreur:", e)
        time.sleep(1)
