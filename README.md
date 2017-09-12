# How to install
- git clone
- conda create -n env_web python=2.7
- source activate env_web
- (if on a mac without mySQL, install mysql)(MySQL-python==1.2.3 requires export PATH=$PATH:/usr/local/mysql/bin)
- pip install -r requirements.txt

# Running Example Experiment Locally

- source activate env_web
- python manage.py runserver
- go to: http://127.0.0.1:8000/?MID=1&tasks=experiment_example&cb=1&assign_id=00&hit_id=00 (you may have to change MID)

# Adding a task
1. Change settings.py to include your new files
	- add your new directory to STATICFILES_DIRS
	- add your html template to TEMPLATE_DIRS
	- add your models.py to INSTALLED_APPS.

2. Create a new view - create a new file like experiment_example_views.py
	- wrapper function for Django to create HTML page from template.
	- it can optionally pass data to javascript
	- it can optionally get data from javascript (parses a GET request with jspsych's json data)

3. Change the shared urls.py
	- add a line for the new view (tells django which url will call the new view)

4. Change the shared views.py
		- import your new view

5. Create your new model table - create a new file like experiment_example_models.py
	- include trial data that you'll store
	- include participant data to link it to the participant table

6. Create new html template - create a file like experiment_example.html
	- imports javascript and class
	- optionally allows for passing data to javascript

7. Create new javascript (jspsych) file - create a file like experiment_example.js
	- where the experiment is actually coded

8. Change the shared templates/index.html to create a thumbnail
	- add a new div with the title of your experiment. This will be the thumbnail on the home screen.
	- make sure the id in the div matches the url name.


# Testing New Task Locally
	- source activate env_web
	- If this is the first run, you'll need to tell Django to create the new model table:
		- python manage.py makemigrations (tells Django to add your new table to the database)
		- python manage.py migrate
	- Then (or otherwise):
		- python manage.py runserver
	- go to: http://127.0.0.1:8000/?MID=1&tasks=experiment_new&cb=1&assign_id=00&hit_id=00 (you may have to change MID)



# Debugging

Python: Terminal will print things from python from views.py or wherever
JS: Browser tools like Chrome's developer tools.
- Always use "shift" refresh so that new javascript is loaded into the browser. Otherwise, cached versions will be used.
- You can change the javascript and refresh without reloading the server!

# Adding a new Database
- Currently, the database is an RDS instance on AWS. You'll need to change the database location in the settings file in DATABASES.
- python manage.py makemigrations (tells Django to add your new table to the database)
- python manage.py migrate

# Viewing database
Use mySQL workbench or some other program to view remote sql database.
- "SELECT * FROM web_experiments_participant" to view participant Information
- "SELECT * FROM web_experiments_example_trial WHERE MID='1'" to view particular experiment

# Adding a new AWS Account for Elastic Beanstalk
- make a .ebextensions folder in top level.
- add django.conf to match 01-webexperimnts.config
- eb init to create a .elasticbeanstalk folder with config.yml
- "eb create" to create a new application environment
- "eb deploy" to push the app
- "eb init -i" to interactively setup environment (allows eb ssh option). You can do this after the initial eb init.

# Pushing to Elastic Beanstalk

- update git (git add --all , git commit -m "asdfa", git push origin master)
- eb deploy

URL (example): http://web-experiments-dev.us-west-1.elasticbeanstalk.com/?MID=0&tasks=experiment_example&cb=0&assign_id=00&hit_id=00



If there are permission errors for the images:
- eb ssh
- cd /opt/python/current/
- sudo chmod -R 777 *



# If using Jupyter
- I installed 'pip install jupyter' which will be in the conda environemnt and is a python 2 kernel to interface with MySQL-python.
- I installed matplotlib and seaborn for some data visualization

# Gitignore
- ignore .ebextensions and .elasticbeanstalk
