from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase_client import supabase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ok in sviluppo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Contatto(BaseModel):
    nome: str
    email: str
    telefono: str
    messaggio: str

@app.get("/")
def home():
    return {"status": "Backend attivo 🚀"}

@app.post("/contatti")
def crea_contatto(contatto: Contatto):
    response = supabase.table("contatti").insert({
        "nome": contatto.nome,
        "email": contatto.email,
        "telefono": contatto.telefono,
        "messaggio": contatto.messaggio
    }).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Errore Supabase")

    return {"success": True}
