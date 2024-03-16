class student{
   protected Id:number
   static nextId = 10000
   private balance = 1000
   private courses:string[] = []
   constructor(private name:string) {
    this.Id = student.nextId++
   }
   addCourse(course:string){
    this.courses.push(course)
   }
   getBalance() : number {
     return this.balance;
   }
   payMethod(fee:number){
    if (this.balance >= fee){
      console.log(`${this.name} paid ${fee}.`)
      this.balance -= fee
    }else{
      throw new Error("Insufficient funds.")
    }
   }
   showStatus(){
    console.log("student name : "+this.name)
    console.log("student Id : "+this.Id)
    console.log("student balance : "+this.balance)
    console.log("student are taking following course : " + this.courses)
   }
}
let std1 = new  student('Muhammad Yousuf')
std1.addCourse('Math')
std1.addCourse('science')
std1.payMethod(500)
std1.showStatus()