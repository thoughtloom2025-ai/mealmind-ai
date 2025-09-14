from config.settings import settings
import smtplib
from email.mime.text import MIMEText
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Real email sending task
def send_email_task(to_email: str, subject: str, message: str):
    try:
        msg = MIMEText(message)
        msg["Subject"] = subject
        msg["From"] = settings.EMAIL_SENDER
        msg["To"] = to_email

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(settings.EMAIL_SENDER, settings.EMAIL_PASSWORD)
            server.sendmail(settings.EMAIL_SENDER, to_email, msg.as_string())
        logging.info(f"✅ Email sent to {to_email}")
    except Exception as e:
        logging.error(f"❌ Failed to send email to {to_email}: {e}")

# Mock WhatsApp sending function
def mock_whatsapp_notification(phone_number: str, message: str):
    logging.info(f"📱 Mock WhatsApp to {phone_number}: {message}")

