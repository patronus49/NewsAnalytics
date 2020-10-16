# NewsAnalytics
This project contains a command line tool for news analytics. It is implemented in NodeJS. It is targeted on node version > **v10.19.0**. 

### Project Structure

The project hierarchy is as follows:
 -  LimeLightPeople
    - has a class container to execute logic to get names of person in the news in recent times.
 - NewsAPI
    - has API client for news API
 - NewsAuthenticity
    - has a class container to execute logic for checking the authenticity of a news title
 - StringMatcher
    - contains logic to find similarity between given news title and recent news titles for categorisation. Uses a npm library(sentence-similarity) to find match scores
 - TextParser
    - contains logic to find names in a text blob, uses npm library (compromise) to acheive this.
    
 - **To start the App** -  change to app root folder as present working directory then issue following command
    ```
    npm run start
    ```
- **Install app dependencies** - change to app root folder as present working directory then issue the following command to install app dependecies as present in package.json
    ```
    npm install
    ```
- **Example Commands** - After starting the node application in terminal, you may try the commnads in following structure
    ```
   > 1: pixel 4a launch in india
   response -> News:" pixel 4a launch in india " seems to be: true
   > 2: america
   response -> Famous People for Category:  america
        Donald Trump,Jon Cohen,Ava Emhoff,Inari Williams,Ron House,John,Jackson
    ```