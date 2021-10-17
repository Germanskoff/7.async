class AlarmClock {

    constructor() {
      this.alarmCollection = [];
      this.timerId = null;
    }

    addClock (timeString, func, id) {
        if (id === undefined) {
          throw new Error('ID не найден, поэтому невозможно верифицировать будильник');
        }
        const searchFirstAlarm = this.alarmCollection.findIndex((item) => item.id === id);
        if (searchFirstAlarm == -1) {
         this.alarmCollection.push({time : timeString, callback : func, id : id});
        } 
        else {
          console.error("Такой будильник уже существует");
        }
      }

      removeClock(id) {
        let findAlarm = this.alarmCollection.filter((item) => item.id === id);
          if (findAlarm != -1) {
           this.alarmCollection.splice(this.alarmCollection.findIndex(i => i === findAlarm), 1);
           console.log('Будильник найден и удалён');
           return true;
          }
          else {
            return false;
          }
      }

      getCurrentFormattedTime() {
        const currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        if (hours < 10) { hours = "0" + hours;}
        if (minutes < 10) { minutes = "0" + minutes;}
        return `${hours}:${minutes}`;
      }
    
      start() {
    
        let checkClock = alarm => {
         let currentTime = this.getCurrentFormattedTime();
          if (alarm.time === currentTime) {
            alarm.callback();
          } 
        }
    
        if (this.timerId === null) {
          this.timerId = setInterval(this.alarmCollection.forEach((alarm) =>
            checkClock(alarm)), 3000);
          
        }
      }
    
      stop() {
        if (this.timerId !== null) {
          clearInterval(this.timerId);
        }
        this.timerId = null;
      }
    
      printAlarms() {
        this.alarmCollection.forEach((item, index, array) => 
          console.log(`Будильник заведен на ${item.time} id ${item.id}`));
      }
    
      clearAlarms() {
        this.alarmCollection = [];
      }
    }