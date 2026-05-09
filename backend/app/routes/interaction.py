from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.models.interaction import Interaction

from app.agents.langgraph_agent import (
    log_interaction_tool,
    analyze_sentiment,
    generate_follow_up,
    extract_datetime,
)

router = APIRouter(prefix="/interaction", tags=["Interaction"])


@router.post("/log")
def log_interaction(data: dict, db: Session = Depends(get_db)):
    interaction = Interaction(
        hcp_name=data.get("hcp_name"),
        summary=data.get("summary"),
        sentiment=data.get("sentiment"),
        follow_up=data.get("follow_up")
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return interaction


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return db.query(Interaction).all()


@router.post("/chat")
def chat_log(data: dict, db: Session = Depends(get_db)):
    user_input = data.get("message")

    if not user_input:
        return {"error": "Message is required"}

   
    ai_data = log_interaction_tool.invoke({
        "user_input": user_input
    })

    if "error" in ai_data:
        return ai_data


    sentiment = analyze_sentiment.invoke({
        "summary": ai_data.get("summary", "")
    })
    ai_data["sentiment"] = sentiment

    
    follow_up = generate_follow_up.invoke({
        "summary": ai_data.get("summary", "")
    })
    ai_data["follow_up"] = follow_up

    
    datetime_data = extract_datetime.invoke({
        "user_input": user_input
    })

    ai_data["date"] = datetime_data.get("date")
    ai_data["time"] = datetime_data.get("time")

    
    interaction = Interaction(
        hcp_name=ai_data.get("hcp_name"),
        summary=ai_data.get("summary"),
        sentiment=ai_data.get("sentiment"),
        follow_up=ai_data.get("follow_up"),
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

   
    return {
        "hcp_name": ai_data.get("hcp_name"),
        "summary": ai_data.get("summary"),
        "sentiment": ai_data.get("sentiment"),
        "follow_up": ai_data.get("follow_up"),
        "date": ai_data.get("date"),
        "time": ai_data.get("time"),
    }