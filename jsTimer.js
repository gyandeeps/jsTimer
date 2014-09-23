 /**
 *                                     TIMER FOR JavaScript
 * 
 *  To use this function, please place this function inside your code.
 * - Create an object of this function by passing in a component name and true or false depending upon if you want to see your timer value as alerts.
 *   by default alert would be false.
 * - By using that object you can create and start a timer by calling startTimer function and specify the timer name.
 * - By using the same Object, you can stop a timer by calling stopTimer function and specify the timer name.
 * - By using the same Object, you can kill a timer by calling killTimer function and specify the timer name to kill.
 * - By using the same Object, you can print all timers you have created so far by calling printAllTimer function.
 * - By using the same Object, you can check if the timer has started or not by calling hasStarted function with timer name.
 * - By using the same Object, you can check timer status by calling timerStatus function with timer name.
 *
 * Example:
 *          var timerObj = new timersForPerformance("Ambulatory Organizer", false);
 *          timerObj.startTimer("Retrieve data"); 
 *          
 *          timerObj.startTimer("Render data"); 
 * 
 *          timerObj.stopTimer("Retrieve data");
 *
 *          timerObj.stopTimer("Render data");
 *
 *          timerObj.printAllTimer(); //this would print the info for the top 2 timer.
 *
 *  * You can define as many timers as you want.
 * This is not a perfect timer function. Lot of enhancements would be made in the future.
 * Any kind of suggestions or feedbacks or contribution would be highly appreciated.
 * 
 * Version: 1.0.0
 * @version 1.0.0
 * @dependencies {file}: log4javascript.js
 */   
    var timerLogger = log4javascript.getLogger("GS");
    
    var popUpAppender = new log4javascript.PopUpAppender(true, false, true, 700, 700);
    popUpAppender.setNewestMessageAtTop(true);
    
    var popUpLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} TIMER: - %m%n");
    popUpAppender.setLayout(popUpLayout);
    
    timerLogger.addAppender(popUpAppender);
    
    function timersForPerformance(componentName, alertFlag){
        if(alertFlag === undefined){
            alertFlag = false;
        }
        
        this.timerArr = {};
        this.alertFlag = alertFlag;
        this.compName = componentName;
        this.printOnStop = true;
        
        //it starts the timer with timerName as the name of the timer and add that timer to timerArr
        this.startTimer = function(timerName){
            var startStopArr = [];
            startStopArr[0] = new Date().getTime();
            this.timerArr[timerName] = startStopArr; 
        };
        
        //it removes the timer with timerName as the name of the timer from timerArr
        this.killTimer = function(timerName){
            if(this.timerArr[timerName]){
                delete this.timerArr[timerName];
            }        
        };
        
        //it stops the timer with timerName as the name of the timer
        // it also prints the time value of this timer to the log
        this.stopTimer = function (timerName){
            if(!this.timerArr[timerName]){
                alert(timerName+" timer has not been started yet");
                return;
            }
            var stopTime = new Date().getTime();
            this.timerArr[timerName][1] = stopTime;
            var timeDiff = (stopTime - this.timerArr[timerName][0])/1000;
            this.timerArr[timerName][2] = timeDiff;
            
            if(this.printOnStop){
                printLog(this, timerName, timeDiff, 0);
            }
        };
        
        //it prints info regarding all the timers created so far.
        this.printAllTimer = function (){
            var html = [];
            var tempVar = 0;
            for(var timerName in this.timerArr){
                if(this.timerArr[timerName][2]){
                    tempVar = this.timerArr[timerName][2];
                    html.push([this.compName ," : ",timerName," : ",tempVar," sec"].join(""));
                }
                else{
                    html.push([this.compName ," : ",timerName," : has not been stopped yet"].join(""));
                }
            }
            if(this.alertFlag){
                alert(html.join("\n"));
            }
            else{
                if(timerLogger !== undefined){ 
                    timerLogger.info(html.join("\n"));
                }
            }
        };
        
        //it prints the status of timerName as the name of the timer
        this.timerStatus = function(timerName){
            var status;
            var timeVal = 0;
            
            if(this.timerArr[timerName]){
                switch(this.timerArr[timerName].length){
                    case 0:
                    status = -1;
                    break;
                    
                    case 1:
                    status = 2;
                    break;
                    
                    case 3:
                    status = 0;
                    timeVal = this.timerArr[timerName][2];
                    break;
                    
                    default:
                    status = -1;
                }
                printLog(this, timerName, timeVal, status);
            }
            else{
                status = -1;
                printLog(this, timerName, timeVal, status);
            }
        };
        
        //it return true/false based on if the timer with timerName has started or not
        this.hasStarted = function(timerName){  
            if(this.timerArr[timerName]){
                return true;
            }
            else{
                return false;
            }
        };
        
        //this function is consumed by different methods of this class to print values to the log4javascript api
        function printLog(self, timerName, timeValue, status){
            var stringVal;
            switch(status){
                case 0:
                stringVal = timeValue+" sec";
                break;
                
                case 1:
                stringVal = " Timer has not been started.";
                break;
                
                case 2:
                stringVal = " Timer has not been stopped.";
                break;
                
                default:
                stringVal = " Timer doesn't exists.";
            }
            if(self.alertFlag){
                alert(self.compName +" : \n"+timerName+" : "+stringVal);
            }
            else{
                if(timerLogger !== undefined){ 
                    timerLogger.info(self.compName +" : "+timerName+" : "+stringVal);
                }
            }        
        }
    }
