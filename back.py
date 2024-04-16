from flask import Flask, send_file, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes de l'application

@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        # Chemin vers le répertoire scans/tcp80/
        directory_path = './SemiAutoRecon/results/10.129.28.156/scans/tcp80/'
        
        # Afficher les fichiers dans le répertoire
        files = os.listdir(directory_path)
        print(f"Fichiers dans {directory_path} : {files}")
        
        # Chemin vers le fichier exploit_results.txt
        file_path = os.path.join(directory_path, 'exploit_results.txt')
        
        # Vérifier si le fichier existe
        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True, download_name='exploit_results.txt', mimetype='text/plain')
        else:
            print('Fichier non trouvé')
            return 'Fichier non trouvé', 404
    except Exception as e:
        print(f"Erreur lors de la récupération des données : {e}")
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)

