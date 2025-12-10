# --- CORRECTION ICI : On utilise langchain_core au lieu de langchain ---
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List

# On importe ton cerveau
from backend.services.brain import ai_engine

# --- Structure JSON ---
class MirrorAnalysis(BaseModel):
    emotional_state: str = Field(description="État émotionnel global (ex: Anxieux, Confiant, En transition)")
    confidence_score: int = Field(description="Niveau de confiance estimé de 0 à 100")
    detected_life_events: List[str] = Field(description="Événements de vie détectés (Divorce, Nouveau job, Mariage...)")
    psychological_blocks: List[str] = Field(description="Freins psychologiques (Peur du regard, Budget, Morphologie...)")
    hidden_needs: str = Field(description="Ce que le client veut vraiment au fond de lui")

# --- L'Agent ---
class MirrorAgent:
    def __init__(self):
        self.llm = ai_engine.get_llm()
        self.parser = JsonOutputParser(pydantic_object=MirrorAnalysis)

    def analyze(self, user_text: str):
        print(f"🎭 Mirror Agent écoute : '{user_text[:30]}...'")

        system_prompt = """
        Tu es l'Agent 'Mirror' de Pershop, un expert en psychologie de la mode.
        Ta mission : Analyser le texte d'un client pour comprendre sa psychologie profonde.
        
        Indices à chercher :
        - Mots hésitants = Manque de confiance.
        - Mention de changements (boulot, âge) = Transition de vie.
        - "Je ne sais pas", "Peur" = Blocages.
        
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