import imaplib
import email
from email.header import decode_header
import PyPDF2
import io
import json
import os


username = 'kawzay@gmail.com'
gmailPassword = os.getenv('gmailPassword')
imap_url = 'imap.gmail.com'

def read_email_from_gmail():
    try:
        mail = imaplib.IMAP4_SSL(imap_url)
        mail.login(username, gmailPassword)
        mail.select('inbox')

        type, data = mail.search(None, '(FROM "<relay@tairai.com>")')
        if type != 'OK':
            print('Нет писем от указанного отправителя.')
            return

        latest_email_id = data[0].split()[-1]
        type, data = mail.fetch(latest_email_id, '(RFC822)')

        if type != 'OK':
            print('Не удалось получить письмо.')
            return

        msg = email.message_from_bytes(data[0][1])
        certificate_number = None
        certificate_code = None

        for part in msg.walk():
            if part.get_content_maintype() == 'application' and part.get_filename():
                filename = decode_header(part.get_filename())[0][0]
                if isinstance(filename, bytes):
                    filename = filename.decode('utf-8')
                if filename.endswith('.pdf'):
                    payload = part.get_payload(decode=True)
                    pdf_buffer = io.BytesIO(payload)
                    pdf_reader = PyPDF2.PdfReader(pdf_buffer)
                    for page in pdf_reader.pages:
                        text = page.extract_text()
                        if 'НОМЕР:' in text:
                            certificate_number = text.split('НОМЕР: ')[1].split()[0]
                        if 'КОД:' in text:
                            certificate_code = text.split('КОД: ')[1].split()[0]
                    break

        if certificate_number and certificate_code:
            with open('/Users/daniildunajcuk/WebstormProjects/tairai_autotests/Helpers/certificate_data.json', 'w') as json_file:
                json.dump({'number': certificate_number, 'code': certificate_code}, json_file)
            print('Данные сертификата сохранены в JSON.')

    except Exception as e:
        print('Произошла ошибка:', str(e))

read_email_from_gmail()






