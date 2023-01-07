# I start by creating a normal express server that said hello world ! 

## Configuring the questBd with express and configure it within the docker to get the local instance 

### Converting Too large JSON file to CSV thanks to gigasheet 

#### importing the CSV following QuestDb rule
- by enabling the copy command 
- making a directory within the questDb docker instance that have a temporary file which is the CSV
- coying the file within the docker & and getting data already to my local instance 
- here I got stuck on INNER JOIN syntax ! 
- I can copy schema from keyboard ( questDb interface ) but I can't execute 3 SQL statement that are linked :
   -> Intances should be a table linked to the big table ( that have Instances ) 
   -> + the INNER JOIN third statement 
