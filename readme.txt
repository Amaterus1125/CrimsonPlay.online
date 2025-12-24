import os
import gdown
import pickle
import numpy as np
import scipy.sparse as sp
import gradio as gr

# ---------------------------------------------------
# DOWNLOAD MODEL FILES
# ---------------------------------------------------
FILES = {
    "game_list.pkl": "https://drive.google.com/uc?export=download&id=1rLJshL54L-r3MrXBHCfbn1B9KWBBEw7F",
    "nbrs_model.pkl": "https://drive.google.com/uc?export=download&id=1n1CZ5LEv6d3Y23H8D9VDHDCDEqGulYJm",
    "tfidf_matrix.npz": "https://drive.google.com/uc?export=download&id=15bjbyAs6FvpIU0DTNbVcM4LpjZqMBxY3",
}

def download_all():
    for fname, url in FILES.items():
        if not os.path.exists(fname):
            print(f"Downloading {fname}...")
            gdown.download(url, fname, quiet=False, fuzzy=True)

print("Downloading model files...")
download_all()
print("Download complete!")

# ---------------------------------------------------
# LOAD MODELS
# ---------------------------------------------------
print("Loading model files...")

# Load df (pandas dataframe)
with open("game_list.pkl", "rb") as f:
    df = pickle.load(f)

game_list = df["Name"].astype(str).tolist()

# Load neighbors model
with open("nbrs_model.pkl", "rb") as f:
    nbrs_model = pickle.load(f)

# Load DENSE matrix (since your .npz is dense)
tfidf_matrix = np.load("tfidf_matrix.npz")["arr_0"]

print("Loaded all files successfully!")

# ---------------------------------------------------
# RECOMMENDATION FUNCTION
# ---------------------------------------------------
def recommend(game_name_raw):
    game_name = game_name_raw.lower().strip()

    matched_game = None
    for g in game_list:
        if g.lower().strip() == game_name:
            matched_game = g
            break

    if matched_game is None:
        return f"Game '{game_name_raw}' not found!"

    idx = game_list.index(matched_game)
    vector = tfidf_matrix[idx].reshape(1, -1)

    distances, indices = nbrs_model.kneighbors(vector, n_neighbors=6)
    recommendations = [game_list[i] for i in indices[0][1:]]

    return "\n".join(recommendations)

# ---------------------------------------------------
# GRADIO UI
# ---------------------------------------------------
demo = gr.Interface(
    fn=recommend,
    inputs=gr.Textbox(label="Enter Game Name"),
    outputs=gr.Textbox(label="Recommended Games"),
    title="Game Recommendation System"
)

# ---------------------------------------------------
# START APP (IMPORTANT!)
# ---------------------------------------------------
demo.launch()
















import os
import gdown
import pickle
import numpy as np
import scipy.sparse as sp
import gradio as gr

# ---------------------------------------------------
# DOWNLOAD MODEL FILES
# ---------------------------------------------------
FILES = {
    "game_list.pkl": "https://drive.google.com/uc?export=download&id=1rLJshL54L-r3MrXBHCfbn1B9KWBBEw7F",
    "nbrs_model.pkl": "https://drive.google.com/uc?export=download&id=1n1CZ5LEv6d3Y23H8D9VDHDCDEqGulYJm",
    "tfidf_matrix.npz": "https://drive.google.com/uc?export=download&id=15bjbyAs6FvpIU0DTNbVcM4LpjZqMBxY3",
}

def download_all():
    for fname, url in FILES.items():
        if not os.path.exists(fname):
            print(f"Downloading {fname}...")
            gdown.download(url, fname, quiet=False, fuzzy=True)

print("Downloading model files...")
download_all()
print("Download complete!")

# ---------------------------------------------------
# LOAD MODELS
# ---------------------------------------------------
print("Loading model files...")

# Load df (pandas dataframe)
with open("game_list.pkl", "rb") as f:
    df = pickle.load(f)

game_list = df["Name"].astype(str).tolist()

# Load neighbors model
with open("nbrs_model.pkl", "rb") as f:
    nbrs_model = pickle.load(f)

# Load DENSE matrix (since your .npz is dense)
tfidf_matrix = np.load("tfidf_matrix.npz")["arr_0"]

print("Loaded all files successfully!")

# ---------------------------------------------------
# RECOMMENDATION FUNCTION
# ---------------------------------------------------
def recommend(game_name_raw):
    game_name = game_name_raw.lower().strip()

    matched_game = None
    for g in game_list:
        if g.lower().strip() == game_name:
            matched_game = g
            break

    if matched_game is None:
        return f"Game '{game_name_raw}' not found!"

    idx = game_list.index(matched_game)
    vector = tfidf_matrix[idx].reshape(1, -1)

    distances, indices = nbrs_model.kneighbors(vector, n_neighbors=6)
    recommendations = [game_list[i] for i in indices[0][1:]]

    return recommendations

# ---------------------------------------------------
# GRADIO UI
# ---------------------------------------------------
demo = gr.Interface(
    fn=recommend,
    inputs=gr.Textbox(label="Enter Game Name"),
    outputs=gr.Textbox(label="Recommended Games"),
    title="Game Recommendation System"
)

# ---------------------------------------------------
# START APP (IMPORTANT!)
# ---------------------------------------------------
demo.launch()