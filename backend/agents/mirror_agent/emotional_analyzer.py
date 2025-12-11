# --- CORRECTION ICI : On utilise langchain_core au lieu de langchain ---
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List
from backend.utils.reliability import retry_with_backoff

# On importe ton cerveau
from backend.services.brain import ai_engine

# --- Structure JSON ---
class EmotionalProfile(BaseModel):
    confidence_level: int = Field(description="Niveau de confiance vestimentaire (0-100)")
    openness_to_change: int = Field(description="Ouverture au changement (0-100)")
    social_sensitivity: int = Field(description="Sensibilité au regard des autres (0-100)")
    convention_attachment: int = Field(description="Attachement aux conventions (0-100)")
    comfort_zone: str = Field(description="Description de la zone de confort stylistique")
    transformation_potential: int = Field(description="Potentiel de transformation (0-100)")

class MirrorAnalysis(BaseModel):
    emotional_state: str = Field(description="État émotionnel global (ex: Anxieux, Confiant, En transition)")
    confidence_score: int = Field(description="Niveau de confiance estimé de 0 à 100")
    emotional_profile: EmotionalProfile = Field(description="Profil émotionnel détaillé en 7 dimensions")
    detected_life_events: List[str] = Field(description="Événements de vie détectés (Divorce, Nouveau job, Mariage...)")
    psychological_blocks: List[str] = Field(description="Freins psychologiques (Peur du regard, Budget, Morphologie...)")
    hidden_needs: str = Field(description="Ce que le client veut vraiment au fond de lui")

# --- L'Agent ---
class MirrorAgent:
    def __init__(self):
        self.llm = ai_engine.get_llm()
        self.parser = JsonOutputParser(pydantic_object=MirrorAnalysis)

    @retry_with_backoff(retries=2)
    def analyze(self, user_text: str):
        print(f"🎭 Mirror Agent écoute : '{user_text[:30]}...'")

        system_prompt = """
        Tu es l'Agent 'Mirror' de Pershop, un expert en psychologie de la mode.
        Ta mission : Analyser le texte d'un client pour comprendre sa psychologie profonde.
        
        Tu dois construire un 'Profil Émotionnel' complet.
        
        Indices à chercher :
        - Mots hésitants = Manque de confiance.
        - Mention de changements (boulot, âge) = Transition de vie.
        - "Je ne sais pas", "Peur" = Blocages, faible ouverture au départ.
        - "Je veux tout changer" = Fort potentiel de transformation.
        
        IMPORTANT : Tu dois répondre UNIQUEMENT avec un JSON valide respectant ce format :
        {format_instructions}
        """

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("user", "Voici le message du client : \n{input}\n\nAnalyse psychologique JSON :"),
        ])

        chain = prompt | self.llm | self.parser
        
        try:
            result = chain.invoke({
                "input": user_text,
                "format_instructions": self.parser.get_format_instructions()
            })
            return result
        except Exception as e:
            print(f"❌ Erreur Mirror : {e}")
            return None