from flask import Flask
from flask import request,redirect,url_for,render_template
import pickle
app=Flask(__name__,template_folder='templates')
import pandas as pd


filename='pickle/Loan.pkl'
with open(filename,'rb') as file:
    model=pickle.load(file)
        
@app.route('/',methods=['POST','GET'])
def index():
    if request.method == 'GET':
        hii=f"Hello Every One"
        return render_template('index.html',hi=hii)
        
    else:
        age=int(request.form.get('age'))
        gen=str(request.form.get('Gender'))
        income=int(request.form.get('income'))
        exp=int(request.form.get('exp'))
        own=str(request.form.get('own'))
        loan_amnt=int(request.form.get('loan_amnt'))
        loan=str(request.form.get('loan'))
        loan_int_rate=int(request.form.get('loan_int_rate'))
        loan_percent_income=loan_amnt/income
        credit_score=int(request.form.get('credit_score'))
        prev=str(request.form.get('prev'))
        use=pd.DataFrame([[age,gen,income,exp,own,loan_amnt,loan,loan_int_rate,loan_percent_income,credit_score,prev]],columns=['person_age', 'person_gender', 'person_income', 'person_emp_exp',
            'person_home_ownership', 'loan_amnt', 'loan_intent', 'loan_int_rate',
            'loan_percent_income', 'credit_score', 'previous_loan_defaults_on_file'])
        pred=model.predict(use)
        predi=['Not Approved','Approved']
        prdicted=predi[pred[0]]
        return render_template('index.html',prdicted=prdicted)

if __name__=='__main__':
    app.run(host="0.0.0.0",debug=True)