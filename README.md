
# OlympicGamesStarter

To be able to run this project properly, **please follow the following steps** :


## npm / yarn installation :
Before running the projects you will need to install the differents depedencies of the project, to be able to download them you will just need to run in a terminal in your project folder the following command : 

*npm install* or if you want to use yarn just do *yarn*


## Launching the project
To lauch the project you can run the command line `ng serve` in your terminal inside the project, the project will normally open itself in your browser. If it doesn't open you can go to [http://localhost:4200] to view it in your browser.


## Mocked data
The mocked data, are located in the 'mock' directory (inside the 'assets' directory), mocked data are already imported in the 'Olympic.service.ts' file (in the 'services' folder who is inside the 'core' folder).



## Here is the complete list of each depedencies and how to install it if you have trouble with the npm / yarn installation

### ngx-charts
This project is using *ngx-charts* to display the pie chart and line chart of the application, if this depedencie didin't install itself during the *npm / yarn installation* you will need to install it by running this following command in the terminal inside your project :

*npm install @swimlane/ngx-charts --save*
Note: if you have trouble running this command add *--force* next to --save.

[Link](https://swimlane.gitbook.io/ngx-charts/installing)



### D3
This project is also using *D3* to display the differents charts of the application, if this depedencie didin't install itself during the *npm / yarn installation* you will need to install it by running this following command in the terminal inside your project :

*npm install d3*
Note: if you have trouble running this command add *--force*

[Link](https://www.npmjs.com/package/d3)