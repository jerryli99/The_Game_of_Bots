# Sketch
this folder will be the starting point for trials and errors...so not the official simulation, just experiments of how to implement the simulation...so, assume this folder is the project root directory for now...
<br>


The Python version I use is 3.11.3

To run the app:
```
python app.py 
```

I used this cmd ```pip freeze > requirements.txt```to list the required packages, but all I did was just ```pip install flask``` to get all these packets.


if you want, do: 
```
pip install -r requirements.txt
```

<br>
<br>

For future project structure (tentative):
root_folder/
|----app/
|    |----__init__.py
|    |----routes.py
|    |----templates/
|    |----static/
|
|----config/
|    |----__init__.py
|    |----settings.py
|
|----models/
|    |----__init__.py
|    |----user.py
|
|----app.py
