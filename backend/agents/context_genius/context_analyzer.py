from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List, Optional

from backend.services.brain import ai_engine
from backend.utils.reliability import retry_with_backoff

class ContextConstraints(BaseModel):
    urgency_score: int = Field(description="Niveau d'urgence de 0 (pas pressé) à 100 (immédiat)")
    budget_range: str = Field(description="Budget estimé (Low, Medium, High, Luxury) ou montant précis si donné")
    occasion: str = Field(description="Occasion principale (Quotidien, Travail, Mariage, Gala, Sport...)")
    location_city: str = Field(description="Ville explicite trouvée dans le texte (ex: 'Paris', 'Lyon') ou 'Unknown'")

class ContextGeniusAnalysis(BaseModel):
    constraints: ContextConstraints = Field(description="Contraintes dures extraites du texte")
    critical_factors: List[str] = Field(description="Facteurs critiques (ex: 'Mariage dans 2 jours', 'Budget max 500€')")

class ContextGeniusAgent:
    def __init__(self):
        self.llm = ai_engine.get_llm()
        self.parser = JsonOutputParser(pydantic_object=ContextGeniusAnalysis)

    @retry_with_backoff(retries=2)
    def analyze(self, user_text: str):
        print(f"🧐 Context Genius analyse : '{user_text[:30]}...'")

        system_prompt = """
        Tu es 'Context Genius', l'analyste logistique et pragmatique de Pershop.
        Ta mission : Extraire uniquement les FAITS et CONTRAINTES du message client.
        
        Ignore les émotions, concentre-toi sur :
        - QUAND ? (Urgence)
        - COMBIEN ? (Budget)
        - POUR QUOI ? (Occasion)
        - OÙ ? (Ville/Lieu) -> Cherche une ville française connue (Paris, Lyon, Marseille...)
        
        Si une info manque, mets des valeurs par défaut logiques (Urgence 50, Budget Medium).
        Si le client dit "J'ai un mariage ce week-end", l'urgence est 90-100.
        
        Réponds en JSON valide :
        {format_instructions}
        """

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("user", "Message client : \n{input}\n\nExtraction Contextuelle JSON :"),
        ])

        chain = prompt | self.llm | self.parser
        
        try:
            result = chain.invoke({
                "input": user_text,
                "format_instructions": self.parser.get_format_instructions()
            })
            return result
        except Exception as e:
            print(f"❌ Erreur Context Genius : {e}")
            return None
