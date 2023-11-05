from flask import Flask,render_template,request,session,redirect
from flask_sqlalchemy import SQLAlchemy
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


app=Flask(_name_)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/hacksquad'
app.secret_key="Saaswatt"
db = SQLAlchemy(app)
class Contact(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(80), nullable=False)
    Email= db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    message = db.Column(db.String(120), nullable=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def _init_(self, full_name, email, password):
        self.full_name = full_name
        self.email = email
        self.password = password
    


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/contactus",methods=['GET','POST'])
def contact_view():
    if(request.method=='POST'):
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')
        entry = Contact(Name=name, phone = phone, message= message,Email =email )
        db.session.add(entry)
        db.session.commit()
        
        gmail_user = "Sameerkaushik933@gmail.com"
        gmail_password = "gxbm xxnl uiow lidb"
        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = gmail_user
        msg['Subject'] = "New Contact Form Submission"
        body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage:\n{message}"
        msg.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, gmail_user, msg.as_string())
            server.quit()
        except Exception as e:
            return f"An error occurred: {str(e)}"
    return render_template('contact us.html')



@app.route('/post')
def post():
    return render_template('post.html')


@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email, password=password).first()

        if user:
            
            session['user_info'] = {
                'full_name': user.full_name,
                'email': user.email,
            }
            return redirect('/dashboard')
        else:
            
            return redirect('/login')

    return render_template('login.html')

@app.route('/signup', methods=['POST'])
def signup():
    full_name = request.form.get('full_name')
    email = request.form.get('email')
    password = request.form.get('password')

    user = User(full_name=full_name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    
    return redirect('/login')



@app.route('/topprj')
def top():
    return render_template('top.html')

@app.route('/feedpage',methods=['GET', 'POST'])
def dashboard():
    user_info = session.get('user_info')

    return render_template('Dashboard.html', user_info=user_info)

@app.route('/faqs')
def faq():
    return render_template('faq.html')

@app.route('/notifs')
def noti():
    return render_template('noti.html')

if _name_ == '_main_':
    app.run(debug=True)