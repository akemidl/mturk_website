# Answers

1.
mypython=$(which python)   # set a variable with the path of your python

2.
newvar=$USER@$(hostname)  # making a variable with chris@chris'mac.local

3.
mkdir -p temp/proj{1..3}/{code,data} # makes a tree directory structure 

4.
cut -c1 file2.txt | wc -w  # counting the number of rows

5.
head -3 file2.txt  # printing the first 3 lines of a file to the screen
awk "FNR==3" file2.txt # printing the third line of a file

6.
awk "FNR==3" file2.txt > newfile.txt  # print that third line to a new file.

7.
awk "FNR==5" file2.txt >> newfile.txt  # print the fifth line to that file, but append.

8.
grep "Australia" cpds.csv > cpds_australia.csv # get's all the lines with Australia in it and makes a new file

9.
grep -v "[,]" file2.txt # -v prints lines that do not match

10.
for(( it=1; it<=3; it++ ))
do
  touch file${it}.txt
  echo 'blah' > file${it}.txt
done
