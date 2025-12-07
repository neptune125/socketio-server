import time
import base64
from PIL import ImageGrab
import socketio
import io

# Connecte le client Socket.IO à ton serveur Render
sio = socketio.Client()

sio.connect('https://socketio-server-3n18.onrender.com/0')  


while True:
    try:
        if not sio.connected:
            print("Connexion au serveur...")
            sio.connect('https://socketio-server-3n18.onrender.com')
        # Capture de l'écran
        img = ImageGrab.grab().resize((640, 360))  # réduit la taille pour moins de lag
        buf = io.BytesIO()
        img.save(buf, format='JPEG')
        frame = base64.b64encode(buf.getvalue()).decode('utf-8')

        # Envoie la frame au serveur
        sio.emit('stream', frame)

        # Limite le FPS
        time.sleep(0.03)  # environ 30 FPS
    except Exception as e:
        print("Erreur:", e)
        time.sleep(1)  # attend avant de réessayer
