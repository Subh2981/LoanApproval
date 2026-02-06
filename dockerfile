FROM python:3.12.10

# workdir
WORKDIR /app
#copy
COPY . /app
#port
RUN pip install -r requirements.txt
#command

EXPOSE 5000

CMD ["python","app.py"]