from langchain_core.tools import tool
from app.services.llm_service import llm
from langchain_core.messages import HumanMessage
import json
import re


@tool
def log_interaction_tool(user_input: str):
    """Extract and structure HCP interaction details"""

    prompt = f"""
Extract structured data from this conversation:

Input: {user_input}

Return ONLY valid JSON:
{{
  "hcp_name": "",
  "summary": "",
  "sentiment": "",
  "follow_up": ""
}}
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    content = response.content

    match = re.search(r"\{.*\}", content, re.DOTALL)

    if not match:
        return {"error": "No JSON found", "raw": content}

    try:
        return json.loads(match.group())
    except:
        return {"error": "Parsing failed", "raw": content}



@tool
def edit_interaction_tool(user_input: str, current_data: dict):
    """
    Update only specific fields based on user correction
    """

    prompt = f"""
Current data:
{current_data}

User correction:
{user_input}

Update ONLY the changed fields and return FULL JSON:
{{
  "hcp_name": "",
  "summary": "",
  "sentiment": "",
  "follow_up": ""
}}
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    content = response.content

    match = re.search(r"\{.*\}", content, re.DOTALL)

    if not match:
        return current_data  # fallback

    try:
        return json.loads(match.group())
    except:
        return current_data


@tool
def analyze_sentiment(summary: str):
    """Analyze sentiment"""

    prompt = f"""
Classify sentiment:

Text: {summary}

Return ONLY:
Positive / Neutral / Negative
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()


@tool
def generate_follow_up(summary: str):
    """Generate follow-up action"""

    prompt = f"""
Based on this interaction:

{summary}

Suggest next action.

Return short phrase only.
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()


@tool
def extract_datetime(user_input: str):
    """Extract date and time from conversation"""

    prompt = f"""
Extract date and time from this text:

{user_input}

Return JSON:
{{
  "date": "",
  "time": ""
}}
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    content = response.content

    match = re.search(r"\{.*\}", content, re.DOTALL)

    if not match:
        return {"date": "", "time": ""}

    try:
        return json.loads(match.group())
    except:
        return {"date": "", "time": ""}