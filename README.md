# How to install
- git clone
- conda create -n env_web
- source activate env_web
- pip install -r requirements.txt

# Running Locally

- source activate env_web
- python manage.py runserver
- (if database does not yet have tables created):
		- python manage.py makemigrations (tells Django to add your new table to the database)
		- python manage.py migrate
- go to: http://127.0.0.1:8000/?MID=1&tasks=experiment_example&cb=1&assign_id=00&hit_id=00 (you may have to change MID)

# Adding a new Database
If you are using a different database, you'll need to change it in the settings file in DATABASES

# Viewing database
Use mySQL workbench or some other program to view remote sql database.
- "SELECT * FROM web_experiments_participant" to view participant Information
- "SELECT * FROM web_experiments_example_trial WHERE MID='1'" to view particular experiment

# Adding a new AWS Account for Elastic Beanstalk
Change credentials in .elasticbeanstalk/config.yml

There might be more to do here...

# Adding a task
1. Change settings.py to include your new files
	- add your new directory to STATICFILES_DIRS
	- add your html template to TEMPLATE_DIRS
	- add your models.py to INSTALLED_APPS.

2. Create a new view (e.g. experiment_example_views.py)
	- wrapper function for Django to create HTML page from template.
	- can deliver data to javascript
	- can received data from javascript (e.g. sending json via a GET request)
	- this will allow django to create the html page from your template
	- it can optionally pass data to javascript
	- it can optionally get data from javascript (parses a GET request with jspsych's json data)

3. Change urls.py
	- add a line for the new view (tells django which url is associated with the new view)

4. Specify new model table as a python class (e.g. experiment_example_models.py)
	- include trial data that you'll store
	- include participant data to link it to the participant table

5. Create the new model table (for the first time, or after changing it)
	- python manage.py makemigrations (tells Django to add your new table to the database)
	- python manage.py migrate

6. Create new html template
	- imports javascript and class
	- optionally allows for passing data to javascript

7. Create new javascript file (jspsych)
	- where the experiment is actually coded

8. (optionally) Add a new css file
	- if you want to use other css

9. Change index.html to create a thumbnail
	- add a new div with the title of your experiment. This will be the thumbnail on the home screen.


# Debugging

Python: Terminal will print things from python from views.py or wherever
JS: Browser tools like Chrome's developer tools.

# Pushing to Elastic Beanstalk

make sure to update git

eb deploy

URL (example): http://web-experiments-dev.us-west-1.elasticbeanstalk.com/?MID=0&tasks=experiment_example&cb=0&assign_id=00&hit_id=00

If there are permission errors for the images:
- eb ssh
- cd /opt/python/current/
- sudo chmod -R 777 *
