from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel, EmailStr
from services.celery_tasks import send_email_task, mock_whatsapp_notification

router = APIRouter(prefix="/notifications", tags=["Notifications"])

class EmailNotification(BaseModel):
    email: EmailStr
    subject: str
    message: str

class WhatsAppNotification(BaseModel):
    phone_number: str
    message: str

@router.post("/email")
def send_email(notification: EmailNotification, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email_task, notification.email, notification.subject, notification.message)
    return {"message": "Email is being sent."}

@router.post("/whatsapp")
def send_whatsapp(notification: WhatsAppNotification):
    mock_whatsapp_notification(notification.phone_number, notification.message)
    return {"message": "Mock WhatsApp message sent."}
