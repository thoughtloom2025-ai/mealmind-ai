import json
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from config.settings import settings

llm = ChatOpenAI(api_key=settings.OPENAI_API_KEY, temperature=0.7)

prompt = PromptTemplate(
    input_variables=["goal", "diet", "allergies", "calories", "health_conditions", "lifestyle"],
    template="""
    Create a personalized healthy meal plan for one day.
    Goal: {goal}
    Diet: {diet}
    Allergies: {allergies}
    Target Daily Calories: {calories}
    Health Conditions: {health_conditions}
    Lifestyle: {lifestyle}

    Format the output in valid JSON like this:

    {{
      "breakfast": {{
        "name": "Oatmeal with Berries",
        "ingredients": "Oats, Milk, Blueberries, Honey",
        "calories": 350,
        "macros": "Carbs: 40g, Protein: 10g, Fat: 8g"
      }},
      "lunch": {{
        "name": "Grilled Chicken Salad",
        "ingredients": "Chicken Breast, Lettuce, Olive Oil, Lemon Juice",
        "calories": 500,
        "macros": "Carbs: 10g, Protein: 40g, Fat: 25g"
      }},
      "snacks": {{
        "name": "Apple with Peanut Butter",
        "ingredients": "Apple, Peanut Butter",
        "calories": 200,
        "macros": "Carbs: 20g, Protein: 5g, Fat: 10g"
      }},
      "dinner": {{
        "name": "Steamed Veggies with Quinoa",
        "ingredients": "Broccoli, Carrots, Quinoa",
        "calories": 450,
        "macros": "Carbs: 50g, Protein: 15g, Fat: 10g"
      }}
    }}
    """
)

def generate_meal_plan(goal: str, diet: str, allergies: str, calories: int, health_conditions: str, lifestyle: str):
    response = llm.invoke(prompt.format(
        goal=goal,
        diet=diet,
        allergies=allergies,
        calories=calories,
        health_conditions=health_conditions,
        lifestyle=lifestyle
    ))

    raw_output = response.content if hasattr(response, 'content') else str(response)

    # Try fixing common JSON issues before parsing
    try:
        cleaned = raw_output.strip()
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        print("🔴 Invalid JSON from LLM:", cleaned)
        raise ValueError(f"LLM response is not valid JSON: {e}")
