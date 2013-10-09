jsTimer
=======

API to put timers inside your JavaScript code.

TIMER FOR JavaScript
 
  To use this function, please place this function inside your code.
 - Create an object of this function by passing in a component name and true or false depending upon if you want to see your timer value as alerts.
   by default alert would be false.
 - By using that object you can create and start a timer by calling startTimer function and specify the timer name.
 - By using the same Object, you can stop a timer by calling stopTimer function and specify the timer name.
 - By using the same Object, you can kill a timer by calling killTimer function and specify the timer name to kill.
 - By using the same Object, you can print all timers you have created so far by calling printAllTimer function.
 - By using the same Object, you can check if the timer has started or not by calling hasStarted function with timer name.
 - By using the same Object, you can check timer status by calling timerStatus function with timer name.

 Example:
          
          var timerObj = new timersForPerformance("Ambulatory Organizer", false);
          
          timerObj.startTimer("Retrieve data"); 
          
          timerObj.startTimer("Render data"); 
 
          timerObj.stopTimer("Retrieve data");

          timerObj.stopTimer("Render data");

          timerObj.printAllTimer(); //this would print the info for the top 2 timer.

  * You can define as many timers as you want.
 

This is not a perfect timer function. Lot of enhancements would be made in the future.
Any kind of suggestions or feedbacks or contribution would be highly appreciated.
